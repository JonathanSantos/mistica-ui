/**
 * Validacoes e mocks compartilhados pelos fluxos de exemplo.
 * A MESMA logica alimenta a implementacao no nosso mistica-ui e no
 * Mistica original — so a camada de UI muda.
 */

export function limparDigitos(valor: string): string {
    return valor.replace(/\D/g, '');
}

export function validarEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/** Validacao real de CPF (digitos verificadores). */
export function validarCPF(cpf: string): boolean {
    const digitos = limparDigitos(cpf);
    if (digitos.length !== 11 || /^(\d)\1{10}$/.test(digitos)) {
        return false;
    }
    for (const posicao of [9, 10]) {
        let soma = 0;
        for (let i = 0; i < posicao; i++) {
            soma += Number(digitos[i]) * (posicao + 1 - i);
        }
        const resto = (soma * 10) % 11 % 10;
        if (resto !== Number(digitos[posicao])) {
            return false;
        }
    }
    return true;
}

export function formatarCPF(valor: string): string {
    const digitos = limparDigitos(valor).slice(0, 11);
    return digitos
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d{1,2})$/, '.$1-$2');
}

export function validarCelular(celular: string): boolean {
    return limparDigitos(celular).length === 11;
}

/** Algoritmo de Luhn para numero de cartao. */
export function luhnValido(numero: string): boolean {
    const digitos = limparDigitos(numero);
    if (digitos.length < 13 || digitos.length > 19) {
        return false;
    }
    let soma = 0;
    let dobra = false;
    for (let i = digitos.length - 1; i >= 0; i--) {
        let d = Number(digitos[i]);
        if (dobra) {
            d *= 2;
            if (d > 9) {
                d -= 9;
            }
        }
        soma += d;
        dobra = !dobra;
    }
    return soma % 10 === 0;
}

/** Validade MM/AA no futuro (mes atual ainda vale). */
export function validadeFutura(validade: string): boolean {
    const m = /^(\d{2})\/(\d{2})$/.exec(validade);
    if (!m) {
        return false;
    }
    const mes = Number(m[1]);
    const ano = 2000 + Number(m[2]);
    if (mes < 1 || mes > 12) {
        return false;
    }
    const agora = new Date();
    return ano > agora.getFullYear() || (ano === agora.getFullYear() && mes >= agora.getMonth() + 1);
}

export function validarCVV(cvv: string): boolean {
    return /^\d{3,4}$/.test(cvv);
}

export function validarSenha(senha: string): boolean {
    return senha.length >= 8;
}

// ---- Mocks de "servidor" ----

/** Senha que simula erro do servidor no login. */
export const SENHA_QUE_FALHA = 'errada123';

function esperar(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function autenticarMock(
    _email: string,
    senha: string
): Promise<{ok: true} | {ok: false; erro: string}> {
    await esperar(1200);
    if (senha === SENHA_QUE_FALHA) {
        return {ok: false, erro: 'E-mail ou senha incorretos. Confira os dados e tente de novo.'};
    }
    return {ok: true};
}

export async function contratarPlanoMock(): Promise<{ok: true}> {
    await esperar(1500);
    return {ok: true};
}

export type Plano = {
    id: string;
    nome: string;
    franquia: string;
    preco: string;
    destaque?: string;
};

export const PLANOS: Array<Plano> = [
    {id: 'easy', nome: 'Vivo Easy', franquia: '10 GB', preco: 'R$ 34,99/mês'},
    {id: 'controle', nome: 'Vivo Controle', franquia: '25 GB', preco: 'R$ 54,99/mês', destaque: 'Mais vendido'},
    {id: 'pos', nome: 'Vivo Pós', franquia: '50 GB', preco: 'R$ 99,99/mês'},
];
