import {
    ButtonLink,
    ButtonPrimary,
    Callout,
    EmailField,
    PasswordField,
    Stack,
    Text5,
    useSnackbar,
    useState,
} from '@/examples/lib/mistica';

import {autenticarMock, validarEmail, validarSenha} from '@/examples/lib/validation';

/**
 * Este fluxo e UMA pagina so: o import abaixo aponta para o alternador,
 * e o seletor do lab decide em runtime qual lib o atende — o nosso
 * mistica-ui ou o @telefonica/mistica original. Mesmo codigo, dois DS.
 */
export function Login() {
    const {openSnackbar} = useSnackbar();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erros, setErros] = useState<{email?: string; senha?: string}>({});
    const [erroServidor, setErroServidor] = useState<string | null>(null);
    const [carregando, setCarregando] = useState(false);

    const entrar = async () => {
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
            openSnackbar({message: 'Bem-vindo de volta!', buttonText: 'Ok'});
        } else {
            setErroServidor(resposta.erro);
        }
    };

    return (
        <div style={{maxWidth: 384, margin: '0 auto', padding: '24px 0'}}>
            <Stack space={16}>
                <Text5 as="h1">Entrar na Minha Vivo</Text5>
                {erroServidor ? (
                    <Callout title="Não foi possível entrar" description={erroServidor} />
                ) : null}
                <EmailField
                    name="email"
                    label="E-mail"
                    value={email}
                    onChangeValue={setEmail}
                    error={Boolean(erros.email)}
                    helperText={erros.email}
                />
                <PasswordField
                    name="senha"
                    label="Senha"
                    value={senha}
                    onChangeValue={setSenha}
                    error={Boolean(erros.senha)}
                    helperText={
                        erros.senha ?? 'Qualquer senha com 8+ caracteres funciona; "errada123" simula erro'
                    }
                />
                <ButtonPrimary onPress={entrar} showSpinner={carregando} loadingText="Entrando...">
                    Entrar
                </ButtonPrimary>
                <ButtonLink onPress={() => {}}>Esqueci minha senha</ButtonLink>
            </Stack>
        </div>
    );
}
