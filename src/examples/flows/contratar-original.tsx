import * as React from 'react';
import {
    Boxed,
    ButtonLink,
    ButtonPrimary,
    CreditCardExpirationField,
    CreditCardNumberField,
    CvvField,
    Inline,
    PhoneNumberField,
    RadioGroup,
    Row,
    RowList,
    Stack,
    Stepper,
    SuccessFeedbackScreen,
    Tag,
    Text2,
    Text3,
    TextField,
} from '@telefonica/mistica';

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

/** Fluxo de contratacao de plano (wizard) com o Mistica ORIGINAL. */
export function ContratarOriginal() {
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
            <SuccessFeedbackScreen
                title={`${planoEscolhido.nome} contratado!`}
                description="Seu novo plano fica ativo em até 24 horas. A primeira cobrança sai na próxima fatura."
                primaryButton={
                    <ButtonPrimary
                        onPress={() => {
                            setConcluido(false);
                            setPasso(0);
                        }}
                    >
                        Contratar outro plano
                    </ButtonPrimary>
                }
            />
        );
    }

    return (
        <div style={{maxWidth: 512, margin: '0 auto', padding: '24px 0'}}>
            <Stack space={24}>
                <Stepper steps={PASSOS} currentIndex={passo} aria-label="Passos da contratação" />

                {passo === 0 ? (
                    <RadioGroup name="plano" value={plano} onChange={setPlano} aria-label="Escolha o plano">
                        <RowList>
                            {PLANOS.map((p) => (
                                <Row
                                    key={p.id}
                                    title={p.nome}
                                    subtitle={`${p.franquia} — ${p.preco}`}
                                    headline={p.destaque ? <Tag type="promo">{p.destaque}</Tag> : undefined}
                                    radioValue={p.id}
                                />
                            ))}
                        </RowList>
                    </RadioGroup>
                ) : null}

                {passo === 1 ? (
                    <Stack space={16}>
                        <TextField
                            name="nome"
                            label="Nome completo"
                            value={nome}
                            onChangeValue={setNome}
                            error={Boolean(erros.nome)}
                            helperText={erros.nome}
                        />
                        <TextField
                            name="cpf"
                            label="CPF"
                            value={cpf}
                            onChangeValue={(v) => setCpf(formatarCPF(v))}
                            error={Boolean(erros.cpf)}
                            helperText={erros.cpf ?? 'Validação real dos dígitos verificadores'}
                        />
                        <PhoneNumberField
                            name="celular"
                            label="Celular"
                            value={celular}
                            onChangeValue={setCelular}
                            error={Boolean(erros.celular)}
                            helperText={erros.celular}
                        />
                    </Stack>
                ) : null}

                {passo === 2 ? (
                    <Stack space={16}>
                        <Boxed>
                            <div style={{padding: 16}}>
                                <Text2 regular color="textSecondary">
                                    Você está contratando
                                </Text2>
                                <Text3 medium>
                                    {planoEscolhido.nome} — {planoEscolhido.franquia} por {planoEscolhido.preco}
                                </Text3>
                            </div>
                        </Boxed>
                        <CreditCardNumberField
                            name="numero"
                            label="Número do cartão"
                            value={cartao.numero}
                            onChangeValue={(v) => setCartao((c) => ({...c, numero: v}))}
                            error={Boolean(erros.numero)}
                            helperText={erros.numero ?? 'Teste com 4111 1111 1111 1111'}
                        />
                        <Inline space={16} fullWidth>
                            <CreditCardExpirationField
                                name="validade"
                                label="Validade"
                                value={cartao.validade}
                                onChangeValue={(v) => setCartao((c) => ({...c, validade: v.raw}))}
                                error={Boolean(erros.validade)}
                                helperText={erros.validade ?? 'MM/AA'}
                            />
                            <CvvField
                                name="cvv"
                                label="CVV"
                                value={cartao.cvv}
                                onChangeValue={(v) => setCartao((c) => ({...c, cvv: v}))}
                                error={Boolean(erros.cvv)}
                                helperText={erros.cvv}
                            />
                        </Inline>
                    </Stack>
                ) : null}

                <Inline space="between">
                    <ButtonLink onPress={() => setPasso(passo - 1)} disabled={passo === 0 || carregando}>
                        Voltar
                    </ButtonLink>
                    <ButtonPrimary onPress={avancar} showSpinner={carregando} loadingText="Contratando...">
                        {passo === 2 ? 'Confirmar contratação' : 'Continuar'}
                    </ButtonPrimary>
                </Inline>
            </Stack>
        </div>
    );
}
