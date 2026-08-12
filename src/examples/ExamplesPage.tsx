import * as React from 'react';
import {ThemeContextProvider} from '@telefonica/mistica';
import {ArrowLeft, Moon, Sun} from 'lucide-react';
import '@telefonica/mistica/css/mistica.css';
import '@telefonica/mistica/css/vivo.css';

import {Chip} from '@/components/ui/chip';
import {SnackbarProvider} from '@/components/ui/snackbar';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Text} from '@/components/ui/text';
import {aplicarCorNossa, aplicarCorOriginal, COR_PADRAO, skinMisticaComCor} from '@/examples/lib/color';
import {ContaNosso} from '@/examples/flows/conta-nosso';
import {ContaOriginal} from '@/examples/flows/conta-original';
import {ContratarNosso} from '@/examples/flows/contratar-nosso';
import {ContratarOriginal} from '@/examples/flows/contratar-original';
import {LoginNosso} from '@/examples/flows/login-nosso';
import {LoginOriginal} from '@/examples/flows/login-original';

/**
 * Laboratorio de exemplos: os mesmos fluxos (com a mesma logica de validacao)
 * implementados no NOSSO mistica-ui e no Mistica ORIGINAL, com controles de
 * design system, tema, skin (nosso) e cor de marca (ambos).
 */
type Ds = 'nosso' | 'original';

const CORES_PRESET = [
    {nome: 'Vivo', valor: COR_PADRAO},
    {nome: 'Azul', valor: '#0B6EFD'},
    {nome: 'Verde', valor: '#1E7D46'},
    {nome: 'Rosa', valor: '#EB3D7D'},
];

function ControleGrupo({rotulo, children}: {rotulo: string; children: React.ReactNode}) {
    return (
        <div className="flex flex-col gap-2">
            <Text preset="text1" color="secondary">
                {rotulo}
            </Text>
            <div className="flex flex-wrap items-center gap-2">{children}</div>
        </div>
    );
}

export default function ExamplesPage({onVoltar}: {onVoltar: () => void}) {
    const [ds, setDs] = React.useState<Ds>('nosso');
    const [escuro, setEscuro] = React.useState(false);
    const [skinCompacta, setSkinCompacta] = React.useState(false);
    const [cor, setCor] = React.useState<string | null>(null);

    // Tema escuro do NOSSO (classe .dark); o do original vai via colorScheme
    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', escuro);
        return () => document.documentElement.classList.remove('dark');
    }, [escuro]);

    // Skin compacta so afeta o nosso
    React.useEffect(() => {
        if (skinCompacta) {
            document.documentElement.dataset.skin = 'vivo-new-system';
        } else {
            delete document.documentElement.dataset.skin;
        }
        return () => {
            delete document.documentElement.dataset.skin;
        };
    }, [skinCompacta]);

    // O CSS do Mistica original e ativado por atributos no <html>
    React.useEffect(() => {
        document.documentElement.dataset.misticaSkin = 'vivo';
        document.documentElement.dataset.misticaColorScheme = escuro ? 'dark' : 'light';
        return () => {
            delete document.documentElement.dataset.misticaSkin;
            delete document.documentElement.dataset.misticaColorScheme;
        };
    }, [escuro]);

    // Cor customizada nos dois sistemas (CSS vars); limpa ao sair
    React.useEffect(() => {
        aplicarCorNossa(cor);
        aplicarCorOriginal(cor);
        return () => {
            aplicarCorNossa(null);
            aplicarCorOriginal(null);
        };
    }, [cor]);

    const misticaSkin = React.useMemo(() => skinMisticaComCor(cor), [cor]);
    const misticaTheme = React.useMemo(
        () => ({
            skin: misticaSkin,
            colorScheme: (escuro ? 'dark' : 'light') as 'dark' | 'light',
            i18n: {locale: 'pt-BR' as const, phoneNumberFormattingRegionCode: 'BR' as const},
        }),
        [misticaSkin, escuro]
    );

    const fluxos = [
        {id: 'login', titulo: 'Login', nosso: <LoginNosso />, original: <LoginOriginal />},
        {id: 'contratar', titulo: 'Contratar plano', nosso: <ContratarNosso />, original: <ContratarOriginal />},
        {id: 'conta', titulo: 'Minha conta', nosso: <ContaNosso />, original: <ContaOriginal />},
    ];

    return (
        <div className="min-h-screen bg-mistica-background">
            <header className="bg-mistica-background-brand px-4 py-5 lg:px-12">
                <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            aria-label="Voltar ao showcase"
                            onClick={onVoltar}
                            className="cursor-pointer rounded-full p-2 text-mistica-text-primary-inverse outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-current"
                        >
                            <ArrowLeft className="size-5" />
                        </button>
                        <div>
                            <Text as="h1" preset="text5" color="inverse">
                                Exemplos — fluxos reais
                            </Text>
                            <Text preset="text1" className="text-mistica-text-secondary-inverse">
                                Mesma lógica e validação, dois design systems
                            </Text>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto grid max-w-4xl gap-6 px-4 py-6 lg:px-0">
                <section className="rounded-mistica-container border border-mistica-border bg-mistica-background-container p-(--mistica-card-padding)">
                    <div className="grid gap-5 lg:grid-cols-4">
                        <ControleGrupo rotulo="Design system">
                            <Chip active={ds === 'nosso'} onClick={() => setDs('nosso')}>
                                Nosso
                            </Chip>
                            <Chip active={ds === 'original'} onClick={() => setDs('original')}>
                                Original
                            </Chip>
                        </ControleGrupo>
                        <ControleGrupo rotulo="Tema (ambos)">
                            <Chip Icon={Sun} active={!escuro} onClick={() => setEscuro(false)}>
                                Claro
                            </Chip>
                            <Chip Icon={Moon} active={escuro} onClick={() => setEscuro(true)}>
                                Escuro
                            </Chip>
                        </ControleGrupo>
                        <ControleGrupo rotulo="Skin (só o nosso)">
                            <Chip
                                active={!skinCompacta}
                                onClick={() => setSkinCompacta(false)}
                                disabled={ds === 'original'}
                            >
                                vivo
                            </Chip>
                            <Chip
                                active={skinCompacta}
                                onClick={() => setSkinCompacta(true)}
                                disabled={ds === 'original'}
                            >
                                new-system
                            </Chip>
                        </ControleGrupo>
                        <ControleGrupo rotulo="Cor de marca (ambos)">
                            {CORES_PRESET.map((preset) => (
                                <button
                                    key={preset.valor}
                                    type="button"
                                    title={preset.nome}
                                    aria-label={`Cor ${preset.nome}`}
                                    aria-pressed={(cor ?? COR_PADRAO) === preset.valor}
                                    onClick={() => setCor(preset.valor === COR_PADRAO ? null : preset.valor)}
                                    className="size-7 cursor-pointer rounded-full border-2 border-mistica-border outline-none focus-visible:ring-2 focus-visible:ring-mistica-control-activated aria-pressed:border-mistica-control-activated"
                                    style={{background: preset.valor}}
                                />
                            ))}
                            <input
                                type="color"
                                aria-label="Cor personalizada"
                                value={cor ?? COR_PADRAO}
                                onChange={(e) => setCor(e.target.value)}
                                className="size-7 cursor-pointer rounded-full border-2 border-mistica-border bg-transparent"
                            />
                        </ControleGrupo>
                    </div>
                </section>

                <Tabs defaultValue="login">
                    <TabsList>
                        {fluxos.map((fluxo) => (
                            <TabsTrigger key={fluxo.id} value={fluxo.id}>
                                {fluxo.titulo}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {fluxos.map((fluxo) => (
                        <TabsContent key={fluxo.id} value={fluxo.id}>
                            <div className="rounded-mistica-container border border-mistica-border bg-mistica-background-container px-4">
                                {ds === 'nosso' ? (
                                    fluxo.nosso
                                ) : (
                                    <ThemeContextProvider theme={misticaTheme}>
                                        {fluxo.original}
                                    </ThemeContextProvider>
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>

                <Text preset="text1" color="secondary">
                    Mocks: login aceita qualquer senha com 8+ caracteres ("errada123" simula erro do
                    servidor); o CPF é validado de verdade (dígitos verificadores); o cartão passa por
                    Luhn — use 4111 1111 1111 1111.
                </Text>
            </main>

            <SnackbarProvider />
        </div>
    );
}
