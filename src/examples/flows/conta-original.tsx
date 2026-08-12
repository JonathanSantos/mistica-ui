import * as React from 'react';
import {
    Avatar,
    Inline,
    Row,
    RowList,
    Stack,
    Tag,
    Text2,
    Text4,
    Title1,
    useSnackbar,
} from '@telefonica/mistica';

/** Tela "Minha conta" com o Mistica ORIGINAL. */
export function ContaOriginal() {
    const {openSnackbar} = useSnackbar();
    const [prefs, setPrefs] = React.useState({roaming: true, cincoG: true, faturaDigital: false});
    const [assinaturaAtiva, setAssinaturaAtiva] = React.useState(true);

    const alternar = (chave: keyof typeof prefs) => (checked: boolean) =>
        setPrefs((p) => ({...p, [chave]: checked}));

    const cancelar = () => {
        setAssinaturaAtiva(false);
        openSnackbar({
            message: 'Assinatura cancelada',
            type: 'CRITICAL',
            buttonText: 'Desfazer',
            onClose: (result) => {
                if (result.action === 'BUTTON') {
                    setAssinaturaAtiva(true);
                }
            },
        });
    };

    return (
        <div style={{maxWidth: 512, margin: '0 auto', padding: '24px 0'}}>
            <Stack space={24}>
                <Inline space={16} alignItems="center">
                    <Avatar size={56} initials="AS" />
                    <Stack space={4}>
                        <Text4 medium as="h1">
                            Ana Souza
                        </Text4>
                        <Inline space={8} alignItems="center">
                            <Text2 regular color="textSecondary">
                                Vivo Pós 50 GB
                            </Text2>
                            {assinaturaAtiva ? (
                                <Tag type="success">Ativa</Tag>
                            ) : (
                                <Tag type="inactive">Cancelada</Tag>
                            )}
                        </Inline>
                    </Stack>
                </Inline>

                <Stack space={8}>
                    <Title1>Preferências da linha</Title1>
                    <RowList>
                        <Row
                            title="Roaming internacional"
                            subtitle="Use seu plano fora do Brasil"
                            switch={{value: prefs.roaming, onChange: alternar('roaming')}}
                        />
                        <Row
                            title="Rede 5G+"
                            subtitle="Prioridade de rede em áreas cobertas"
                            switch={{value: prefs.cincoG, onChange: alternar('cincoG')}}
                        />
                        <Row
                            title="Fatura digital"
                            subtitle="Receba por e-mail e ganhe R$ 5 de desconto"
                            switch={{value: prefs.faturaDigital, onChange: alternar('faturaDigital')}}
                        />
                    </RowList>
                </Stack>

                <Stack space={8}>
                    <Title1>Assinatura</Title1>
                    <RowList>
                        <Row
                            title="Alterar plano"
                            subtitle="Mude de plano sem custo"
                            onPress={() => openSnackbar({message: 'Fluxo de troca de plano em breve'})}
                        />
                        <Row
                            title="Cancelar assinatura"
                            subtitle="Cancela a renovação automática"
                            onPress={cancelar}
                        />
                    </RowList>
                </Stack>
            </Stack>
        </div>
    );
}
