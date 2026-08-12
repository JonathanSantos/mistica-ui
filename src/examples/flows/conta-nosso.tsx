import * as React from 'react';

import {Avatar} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Row, RowList} from '@/components/ui/row';
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from '@/components/ui/sheet';
import {showSnackbar} from '@/components/ui/snackbar';
import {Tag} from '@/components/ui/tag';
import {Text} from '@/components/ui/text';

/** Tela "Minha conta" com o NOSSO mistica-ui. */
export function ContaNosso() {
    const [prefs, setPrefs] = React.useState({roaming: true, cincoG: true, faturaDigital: false});
    const [assinaturaAtiva, setAssinaturaAtiva] = React.useState(true);
    const [sheetAberto, setSheetAberto] = React.useState(false);

    const alternar = (chave: keyof typeof prefs) => (checked: boolean) =>
        setPrefs((p) => ({...p, [chave]: checked}));

    const cancelar = () => {
        setSheetAberto(false);
        setAssinaturaAtiva(false);
        showSnackbar({
            message: 'Assinatura cancelada',
            type: 'critical',
            buttonText: 'Desfazer',
            onButtonClick: () => setAssinaturaAtiva(true),
        });
    };

    return (
        <div className="mx-auto grid w-full max-w-lg gap-6 py-6">
            <div className="flex items-center gap-4">
                <Avatar initials="AS" size={56} />
                <div>
                    <Text as="h1" preset="text4">
                        Ana Souza
                    </Text>
                    <div className="mt-1 flex items-center gap-2">
                        <Text preset="text2" color="secondary">
                            Vivo Pós 50 GB
                        </Text>
                        {assinaturaAtiva ? (
                            <Tag type="success">Ativa</Tag>
                        ) : (
                            <Tag type="inactive">Cancelada</Tag>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <Text preset="title1" color="secondary" className="mb-2">
                    Preferências da linha
                </Text>
                <RowList>
                    <Row
                        title="Roaming internacional"
                        subtitle="Use seu plano fora do Brasil"
                        toggle={{checked: prefs.roaming, onCheckedChange: alternar('roaming')}}
                    />
                    <Row
                        title="Rede 5G+"
                        subtitle="Prioridade de rede em áreas cobertas"
                        toggle={{checked: prefs.cincoG, onCheckedChange: alternar('cincoG')}}
                    />
                    <Row
                        title="Fatura digital"
                        subtitle="Receba por e-mail e ganhe R$ 5 de desconto"
                        toggle={{checked: prefs.faturaDigital, onCheckedChange: alternar('faturaDigital')}}
                    />
                </RowList>
            </div>

            <div>
                <Text preset="title1" color="secondary" className="mb-2">
                    Assinatura
                </Text>
                <RowList>
                    <Row
                        title="Alterar plano"
                        subtitle="Mude de plano sem custo"
                        onClick={() => showSnackbar({message: 'Fluxo de troca de plano em breve'})}
                    />
                    <Row
                        title="Cancelar assinatura"
                        subtitle="Cancela a renovação automática"
                        onClick={() => setSheetAberto(true)}
                    />
                </RowList>
            </div>

            <Sheet open={sheetAberto} onOpenChange={setSheetAberto}>
                <SheetTrigger className="hidden" />
                <SheetContent side="bottom">
                    <SheetTitle asChild>
                        <Text as="h2" preset="drawer-title" weight="medium" className="mb-2">
                            Cancelar assinatura?
                        </Text>
                    </SheetTitle>
                    <Text preset="text2" color="secondary" className="mb-6">
                        Você perde o desconto de fidelidade e o acesso aos apps inclusos ao final do
                        período já pago.
                    </Text>
                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                        <Button variant="link" onClick={() => setSheetAberto(false)}>
                            Manter assinatura
                        </Button>
                        <Button variant="danger" onClick={cancelar}>
                            Cancelar assinatura
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
