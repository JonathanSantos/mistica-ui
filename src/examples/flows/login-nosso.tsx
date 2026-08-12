import * as React from 'react';
import {Info} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Callout} from '@/components/ui/callout';
import {PasswordField} from '@/components/ui/password-field';
import {showSnackbar} from '@/components/ui/snackbar';
import {Text} from '@/components/ui/text';
import {TextField} from '@/components/ui/text-field';
import {autenticarMock, validarEmail, validarSenha} from '@/examples/lib/validation';

/** Fluxo de login com o NOSSO mistica-ui. */
export function LoginNosso() {
    const [email, setEmail] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [erros, setErros] = React.useState<{email?: string; senha?: string}>({});
    const [erroServidor, setErroServidor] = React.useState<string | null>(null);
    const [carregando, setCarregando] = React.useState(false);

    const entrar = async (event: React.FormEvent) => {
        event.preventDefault();
        const novosErros: typeof erros = {};
        if (!validarEmail(email)) {
            novosErros.email = 'Digite um e-mail válido';
        }
        if (!validarSenha(senha)) {
            novosErros.senha = 'A senha precisa ter pelo menos 8 caracteres';
        }
        setErros(novosErros);
        setErroServidor(null);
        if (Object.keys(novosErros).length > 0) {
            return;
        }

        setCarregando(true);
        const resposta = await autenticarMock(email, senha);
        setCarregando(false);
        if (resposta.ok) {
            showSnackbar({message: 'Bem-vindo de volta!', buttonText: 'Ok'});
        } else {
            setErroServidor(resposta.erro);
        }
    };

    return (
        <form onSubmit={entrar} noValidate className="mx-auto grid w-full max-w-sm gap-4 py-6">
            <Text as="h1" preset="text5">
                Entrar na Minha Vivo
            </Text>
            {erroServidor ? (
                <Callout Icon={Info} title="Não foi possível entrar" description={erroServidor} />
            ) : null}
            <TextField
                label="E-mail"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(erros.email)}
                helperText={erros.email}
            />
            <PasswordField
                label="Senha"
                autoComplete="current-password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                error={Boolean(erros.senha)}
                helperText={erros.senha ?? 'Qualquer senha com 8+ caracteres funciona; "errada123" simula erro'}
            />
            <Button type="submit" loading={carregando} loadingText="Entrando...">
                Entrar
            </Button>
            <Button variant="link" type="button">
                Esqueci minha senha
            </Button>
        </form>
    );
}
