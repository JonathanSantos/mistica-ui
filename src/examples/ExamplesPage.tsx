import * as React from 'react';
import {ThemeContextProvider} from '@telefonica/mistica';
import {ArrowLeft, Moon, Sun} from 'lucide-react';
import '@telefonica/mistica/css/mistica.css';
import '@telefonica/mistica/css/vivo.css';

import {Chip} from '@/components/ui/chip';
import {SnackbarProvider} from '@/components/ui/snackbar';
import {Tabs} from '@/components/ui/tabs';
import {Text} from '@/components/ui/text';
import {aplicarCorNossa, aplicarCorOriginal, COR_PADRAO, skinMisticaComCor} from '@/examples/lib/color';
import {DsProvider, especificadorDoImport, type Ds} from '@/examples/lib/mistica';
import {criarEscopo, EscopoDeEstado, InstanciaDeEstado, type Escopo} from '@/examples/lib/estado-compartilhado';
import {Conta} from '@/examples/flows/conta';
import {Contratar} from '@/examples/flows/contratar';
import {Login} from '@/examples/flows/login';

/**
 * Laboratorio de exemplos: os mesmos fluxos (com a mesma logica de validacao)
 * implementados no NOSSO mistica-ui e no Mistica ORIGINAL, com controles de
 * design system, tema, skin (nosso) e cor de marca (ambos).
 */
type ModoDs = Ds | 'lado-a-lado';

const CORES_PRESET = [
    {nome: 'Vivo', valor: COR_PADRAO},
    {nome: 'Azul', valor: '#0B6EFD'},
    {nome: 'Verde', valor: '#1E7D46'},
    {nome: 'Rosa', valor: '#EB3D7D'},
];

function PainelFluxo({
    ds,
    fluxoId,
    elemento,
    rotulo,
    legenda,
}: {
    ds: Ds;
    fluxoId: string;
    elemento: React.ReactNode;
    rotulo?: string;
    legenda?: string;
}) {
    return (
        <div className="grid content-start gap-3">
            <div className="overflow-x-auto rounded-mistica-media-small bg-mistica-background-alternative px-4 py-2.5 font-mono text-xs whitespace-nowrap text-mistica-text-secondary">
                {rotulo ? (
                    <span className="mr-3 font-sans font-medium text-mistica-text-primary">{rotulo}</span>
                ) : null}
                {'import {…} from '}
                <span className="font-bold text-mistica-text-activated transition-colors">
                    {especificadorDoImport(ds)}
                </span>
                {';'}
                {legenda ? (
                    <span className="ml-3 font-sans text-mistica-text-secondary">{legenda}</span>
                ) : null}
            </div>
            <div className="rounded-mistica-container border border-mistica-border bg-mistica-background-container px-4">
                <DsProvider ds={ds}>
                    <InstanciaDeEstado key={fluxoId}>{elemento}</InstanciaDeEstado>
                </DsProvider>
            </div>
        </div>
    );
}

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
    const [ds, setDs] = React.useState<ModoDs>('nosso');
    const [escuro, setEscuro] = React.useState(false);
    const [skinCompacta, setSkinCompacta] = React.useState(false);
    const [cor, setCor] = React.useState<string | null>(null);
    const [fluxoAtivo, setFluxoAtivo] = React.useState(0);
    // um store de estado por fluxo: os dois paineis do lado a lado leem e
    // escrevem no mesmo, e o estado sobrevive a troca de DS e de modo
    const escoposRef = React.useRef(new Map<string, Escopo>());
    const obterEscopo = (id: string): Escopo => {
        if (!escoposRef.current.has(id)) {
            escoposRef.current.set(id, criarEscopo());
        }
        return escoposRef.current.get(id)!;
    };

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
        {id: 'login', titulo: 'Login', elemento: <Login />},
        {id: 'contratar', titulo: 'Contratar plano', elemento: <Contratar />},
        {id: 'conta', titulo: 'Minha conta', elemento: <Conta />},
    ];

    return (
        <div className="min-h-screen bg-mistica-background">
            <header className="bg-mistica-background-brand px-4 py-5 lg:px-12">
                <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
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

            <main className="mx-auto grid max-w-[1200px] gap-6 px-4 py-6 lg:px-6">
                <section className="rounded-mistica-container border border-mistica-border bg-mistica-background-container p-(--mistica-card-padding)">
                    <div className="grid gap-5 lg:grid-cols-4">
                        <ControleGrupo rotulo="Design system">
                            <Chip active={ds === 'nosso'} onPress={() => setDs('nosso')}>
                                Nosso
                            </Chip>
                            <Chip active={ds === 'original'} onPress={() => setDs('original')}>
                                Original
                            </Chip>
                            <Chip active={ds === 'lado-a-lado'} onPress={() => setDs('lado-a-lado')}>
                                Lado a lado
                            </Chip>
                        </ControleGrupo>
                        <ControleGrupo rotulo="Tema (ambos)">
                            <Chip Icon={Sun} active={!escuro} onPress={() => setEscuro(false)}>
                                Claro
                            </Chip>
                            <Chip Icon={Moon} active={escuro} onPress={() => setEscuro(true)}>
                                Escuro
                            </Chip>
                        </ControleGrupo>
                        <ControleGrupo rotulo="Skin (só o nosso)">
                            <Chip
                                active={!skinCompacta}
                                onPress={() => setSkinCompacta(false)}
                                disabled={ds === 'original'}
                            >
                                vivo
                            </Chip>
                            <Chip
                                active={skinCompacta}
                                onPress={() => setSkinCompacta(true)}
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

                <Tabs
                    tabs={fluxos.map((fluxo) => ({text: fluxo.titulo}))}
                    selectedIndex={fluxoAtivo}
                    onChange={setFluxoAtivo}
                    renderPanel={(index) => (
                        <ThemeContextProvider theme={misticaTheme}>
                            <EscopoDeEstado escopo={obterEscopo(fluxos[index].id)}>
                                {ds === 'lado-a-lado' ? (
                                    <div className="grid gap-4 lg:grid-cols-2">
                                        <PainelFluxo
                                            ds="nosso"
                                            rotulo="Nosso"
                                            fluxoId={fluxos[index].id}
                                            elemento={fluxos[index].elemento}
                                        />
                                        <PainelFluxo
                                            ds="original"
                                            rotulo="Original"
                                            fluxoId={fluxos[index].id}
                                            elemento={fluxos[index].elemento}
                                        />
                                    </div>
                                ) : (
                                    <PainelFluxo
                                        ds={ds}
                                        fluxoId={fluxos[index].id}
                                        elemento={fluxos[index].elemento}
                                        legenda="← mesmo arquivo de fluxo; o seletor troca só a lib"
                                    />
                                )}
                            </EscopoDeEstado>
                        </ThemeContextProvider>
                    )}
                />

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
