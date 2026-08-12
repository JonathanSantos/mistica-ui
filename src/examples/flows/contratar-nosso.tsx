import * as React from 'react';

import {Button} from '@/components/ui/button';
import {
    CreditCardCvvField,
    CreditCardExpirationField,
    CreditCardNumberField,
} from '@/components/ui/credit-card-fields';
import {FeedbackScreen} from '@/components/ui/feedback-screen';
import {PhoneNumberField} from '@/components/ui/phone-number-field';
import {Row, RowList} from '@/components/ui/row';
import {Stepper} from '@/components/ui/stepper';
import {Tag} from '@/components/ui/tag';
import {Text} from '@/components/ui/text';
import {TextField} from '@/components/ui/text-field';
import {
    contratarPlanoMock,
    formatarCPF,
    luhnValido,
    PLANOS,
    validadeFutura,
    validarCelular,
    validarCPF,
    validarCVV,
} from '@/examples/lib/validation';

const PASSOS = ['Plano', 'Dados', 'Pagamento'];

/** Fluxo de contratacao de plano (wizard) com o NOSSO mistica-ui. */
export function ContratarNosso() {
    const [passo, setPasso] = React.useState(0);
    const [plano, setPlano] = React.useState(PLANOS[1].id);
    const [nome, setNome] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [celular, setCelular] = React.useState('');
    const [cartao, setCartao] = React.useState({numero: '', validade: '', cvv: ''});
    const [erros, setErros] = React.useState<Record<string, string>>({});
    const [carregando, setCarregando] = React.useState(false);
    const [concluido, setConcluido] = React.useState(false);

    const planoEscolhido = PLANOS.find((p) => p.id === plano)!;

    const validarPasso = (): boolean => {
        const novos: Record<string, string> = {};
        if (passo === 1) {
            if (nome.trim().split(/\s+/).length < 2) {
                novos.nome = 'Digite seu nome completo';
            }
            if (!validarCPF(cpf)) {
                novos.cpf = 'CPF inválido';
            }
            if (!validarCelular(celular)) {
                novos.celular = 'Digite um celular com DDD';
            }
        }
        if (passo === 2) {
            if (!luhnValido(cartao.numero)) {
                novos.numero = 'Número de cartão inválido';
            }
            if (!validadeFutura(cartao.validade)) {
                novos.validade = 'Validade inválida ou vencida';
            }
            if (!validarCVV(cartao.cvv)) {
                novos.cvv = 'CVV inválido';
            }
        }
        setErros(novos);
        return Object.keys(novos).length === 0;
    };

    const avancar = async () => {
        if (!validarPasso()) {
            return;
        }
        if (passo < 2) {
            setPasso(passo + 1);
            return;
        }
        setCarregando(true);
        await contratarPlanoMock();
        setCarregando(false);
        setConcluido(true);
    };

    if (concluido) {
        return (
            <FeedbackScreen
                type="success"
                title={`${planoEscolhido.nome} contratado!`}
                description="Seu novo plano fica ativo em até 24 horas. A primeira cobrança sai na próxima fatura."
                primaryAction={{
                    text: 'Contratar outro plano',
                    onPress: () => {
                        setConcluido(false);
                        setPasso(0);
                    },
                }}
                className="min-h-[420px] rounded-mistica-container"
            />
        );
    }

    return (
        <div className="mx-auto grid w-full max-w-lg gap-6 py-6">
            <Stepper steps={PASSOS} currentIndex={passo} />

            {passo === 0 ? (
                <RowList>
                    {PLANOS.map((p) => (
                        <Row
                            key={p.id}
                            title={p.nome}
                            subtitle={`${p.franquia} — ${p.preco}`}
                            right={
                                <span className="flex items-center gap-2">
                                    {p.destaque ? <Tag type="promo">{p.destaque}</Tag> : null}
                                    <span
                                        aria-hidden
                                        className={
                                            plano === p.id
                                                ? 'flex size-5 items-center justify-center rounded-full border-[6px] border-mistica-control-activated'
                                                : 'size-5 rounded-full border-[1.5px] border-mistica-control'
                                        }
                                    />
                                </span>
                            }
                            onClick={() => setPlano(p.id)}
                            chevron={false}
                        />
                    ))}
                </RowList>
            ) : null}

            {passo === 1 ? (
                <div className="grid gap-4">
                    <TextField
                        label="Nome completo"
                        autoComplete="name"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        error={Boolean(erros.nome)}
                        helperText={erros.nome}
                    />
                    <TextField
                        label="CPF"
                        inputMode="numeric"
                        value={cpf}
                        onChange={(e) => setCpf(formatarCPF(e.target.value))}
                        error={Boolean(erros.cpf)}
                        helperText={erros.cpf ?? 'Validação real dos dígitos verificadores'}
                    />
                    <PhoneNumberField
                        label="Celular"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                        error={Boolean(erros.celular)}
                        helperText={erros.celular}
                    />
                </div>
            ) : null}

            {passo === 2 ? (
                <div className="grid gap-4">
                    <div className="rounded-mistica-container bg-mistica-background-alternative p-4">
                        <Text preset="text2" color="secondary">
                            Você está contratando
                        </Text>
                        <Text preset="text3" weight="medium">
                            {planoEscolhido.nome} — {planoEscolhido.franquia} por {planoEscolhido.preco}
                        </Text>
                    </div>
                    <CreditCardNumberField
                        label="Número do cartão"
                        value={cartao.numero}
                        onChange={(e) => setCartao((c) => ({...c, numero: e.target.value}))}
                        error={Boolean(erros.numero)}
                        helperText={erros.numero ?? 'Teste com 4111 1111 1111 1111'}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <CreditCardExpirationField
                            label="Validade"
                            value={cartao.validade}
                            onChange={(e) => setCartao((c) => ({...c, validade: e.target.value}))}
                            error={Boolean(erros.validade)}
                            helperText={erros.validade ?? 'MM/AA'}
                        />
                        <CreditCardCvvField
                            label="CVV"
                            value={cartao.cvv}
                            onChange={(e) => setCartao((c) => ({...c, cvv: e.target.value}))}
                            error={Boolean(erros.cvv)}
                            helperText={erros.cvv}
                        />
                    </div>
                </div>
            ) : null}

            <div className="flex justify-between gap-3">
                <Button variant="link" disabled={passo === 0 || carregando} onClick={() => setPasso(passo - 1)}>
                    Voltar
                </Button>
                <Button loading={carregando} loadingText="Contratando..." onClick={avancar}>
                    {passo === 2 ? 'Confirmar contratação' : 'Continuar'}
                </Button>
            </div>
        </div>
    );
}
