import * as React from 'react';
import {
    Bell,
    CreditCard,
    Flame,
    Gift,
    Heart,
    Inbox,
    Info,
    LogOut,
    Moon,
    MoreVertical,
    Rocket,
    Settings,
    ShoppingCart,
    Smartphone,
    Star,
    Sun,
    Tv,
    User,
    Wifi,
} from 'lucide-react';

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion';
import {Autocomplete} from '@/components/ui/autocomplete';
import {Avatar} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';
import {Boxed} from '@/components/ui/boxed';
import {Breadcrumbs} from '@/components/ui/breadcrumbs';
import {Circle, Square} from '@/components/ui/circle';
import {DoubleField} from '@/components/ui/double-field';
import {FileItem, FileUpload} from '@/components/ui/file-upload';
import {Header, HeaderLayout, MainSectionHeader} from '@/components/ui/header';
import {HorizontalScroll} from '@/components/ui/horizontal-scroll';
import {OrderedList, UnorderedList} from '@/components/ui/lists';
import {MasterDetailLayout} from '@/components/ui/master-detail-layout';
import {Pagination} from '@/components/ui/pagination';
import {Placeholder} from '@/components/ui/placeholder';
import {ProgressBarStepped} from '@/components/ui/progress-bar';
import {StackingGroup} from '@/components/ui/stacking-group';
import {TextLink} from '@/components/ui/text-link';
import {TimeField} from '@/components/ui/date-field';
import {Timeline, TimelineItem} from '@/components/ui/timeline';
import {ToggleIconButton} from '@/components/ui/toggle-icon-button';
import {ButtonDanger, ButtonLink, ButtonPrimary, ButtonSecondary} from '@/components/ui/button';
import {ButtonFixedFooterLayout} from '@/components/ui/button-fixed-footer-layout';
import {Callout} from '@/components/ui/callout';
import {
    DataCard,
    DisplayDataCard,
    DisplayMediaCard,
    MediaCard,
    NakedCard,
    PosterCard,
    SnapCard,
} from '@/components/ui/card';
import {Carousel} from '@/components/ui/carousel';
import {CoverHero} from '@/components/ui/cover-hero';
import {CreditCardFields} from '@/components/ui/credit-card-fields';
import {FeedbackScreen} from '@/components/ui/feedback-screen';
import {LoadingBar} from '@/components/ui/loading-bar';
import {Rating} from '@/components/ui/rating';
import {Timer, TextTimer} from '@/components/ui/timer';
import {Counter} from '@/components/ui/counter';
import {DateField} from '@/components/ui/date-field';
import {DecimalField} from '@/components/ui/decimal-field';
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerTitle,
} from '@/components/ui/drawer';
import {EmptyState} from '@/components/ui/empty-state';
import {Hero} from '@/components/ui/hero';
import {
    Menu,
    MenuContent,
    MenuItem,
    MenuSeparator,
    MenuTrigger,
} from '@/components/ui/menu';
import {Meter} from '@/components/ui/meter';
import {MainNavigationBar, NavigationBar} from '@/components/ui/navigation-bar';
import {PhoneNumberField} from '@/components/ui/phone-number-field';
import {PinField} from '@/components/ui/pin-field';
import {Stepper} from '@/components/ui/stepper';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Checkbox} from '@/components/ui/checkbox';
import {Chip} from '@/components/ui/chip';
import {alert, confirm, DialogRoot} from '@/components/ui/dialogs';
import {IconButton} from '@/components/ui/icon-button';
import {Label} from '@/components/ui/label';
import {Box, Grid, Inline, Stack} from '@/components/ui/layout';
import {PasswordField} from '@/components/ui/password-field';
import {ProgressBar} from '@/components/ui/progress-bar';
import {RadioButton, RadioGroup} from '@/components/ui/radio-group';
import {Row, RowList} from '@/components/ui/row';
import {SearchField} from '@/components/ui/search-field';
import {Select} from '@/components/ui/select';
import {Sheet, SheetContent, SheetTitle} from '@/components/ui/sheet';
import {Skeleton, SkeletonText} from '@/components/ui/skeleton';
import {Slider} from '@/components/ui/slider';
import {SnackbarProvider, useSnackbar} from '@/components/ui/snackbar';
import {Spinner} from '@/components/ui/spinner';
import {Switch} from '@/components/ui/switch';
import {Tabs} from '@/components/ui/tabs';
import {Tag} from '@/components/ui/tag';
import {Text} from '@/components/ui/text';
import {TextArea} from '@/components/ui/text-area';
import {TextField} from '@/components/ui/text-field';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {ThemeVariant} from '@/components/ui/theme-variant';

function Section({title, children}: {title: string; children: React.ReactNode}) {
    return (
        <section className="rounded-mistica-container border border-mistica-border bg-mistica-background-container p-(--mistica-card-padding)">
            <Text as="h2" preset="title1" color="secondary" className="mb-4">
                {title}
            </Text>
            {children}
        </section>
    );
}

function BasicosTab() {
    const [chips, setChips] = React.useState<Array<string>>(['5G']);
    const [loading, setLoading] = React.useState(false);
    const toggleChip = (chip: string) =>
        setChips((c) => (c.includes(chip) ? c.filter((x) => x !== chip) : [...c, chip]));

    const simulateLoading = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2500);
    };

    return (
        <div className="grid gap-6">
            <Section title="Botões">
                <div className="flex flex-wrap items-center gap-3">
                    <ButtonPrimary onPress={() => {}}>Primary</ButtonPrimary>
                    <ButtonSecondary onPress={() => {}}>Secondary</ButtonSecondary>
                    <ButtonDanger onPress={() => {}}>Danger</ButtonDanger>
                    <ButtonLink onPress={() => {}}>Link</ButtonLink>
                    <ButtonPrimary small onPress={() => {}}>
                        <ShoppingCart /> Small
                    </ButtonPrimary>
                    <ButtonPrimary disabled onPress={() => {}}>
                        Disabled
                    </ButtonPrimary>
                    <ButtonPrimary showSpinner={loading} loadingText="Enviando..." onPress={simulateLoading}>
                        Enviar pedido
                    </ButtonPrimary>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <IconButton Icon={Bell} aria-label="Notificações" />
                    <IconButton Icon={Gift} aria-label="Presente" backgroundType="soft" />
                    <IconButton Icon={ShoppingCart} aria-label="Carrinho" backgroundType="solid" />
                    <IconButton Icon={Wifi} aria-label="Wifi" backgroundType="soft" small />
                    <FavoritoDemo />
                </div>
            </Section>

            <Section title="Tags">
                <div className="flex flex-wrap gap-2">
                    <Tag type="promo" Icon={Star}>
                        Promoção
                    </Tag>
                    <Tag type="active">Ativo</Tag>
                    <Tag type="inactive">Inativo</Tag>
                    <Tag type="success">Sucesso</Tag>
                    <Tag type="warning">Atenção</Tag>
                    <Tag type="error">Erro</Tag>
                    <Tag type="info">Informação</Tag>
                </div>
            </Section>

            <Section title="Badges e Avatares">
                <div className="flex items-center gap-8">
                    <Badge value={2}>
                        <Bell className="size-6 text-mistica-neutral-high" />
                    </Badge>
                    <Badge>
                        <Wifi className="size-6 text-mistica-neutral-high" />
                    </Badge>
                    <Avatar initials="AB" />
                    <Avatar initials="CD" badge={3} />
                    <Avatar src="/placeholder.svg" alt="Avatar de exemplo" size={48} />
                    <StackingGroup maxItems={3}>
                        <Avatar initials="AB" />
                        <Avatar initials="CD" />
                        <Avatar src="/placeholder.svg" alt="" />
                        <Avatar initials="EF" />
                        <Avatar initials="GH" />
                    </StackingGroup>
                </div>
            </Section>

            <Section title="Chips">
                <div className="flex flex-wrap gap-2">
                    {['5G', 'Fibra', 'TV', 'Streaming'].map((chip) => (
                        <Chip key={chip} active={chips.includes(chip)} onPress={() => toggleChip(chip)}>
                            {chip}
                        </Chip>
                    ))}
                    <Chip Icon={Flame} active={chips.includes('Ofertas')} onPress={() => toggleChip('Ofertas')}>
                        Ofertas
                    </Chip>
                </div>
            </Section>

            <Section title="Primitivos e utilitários">
                <div className="grid gap-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <Circle size={48}>
                            <Wifi className="size-6" />
                        </Circle>
                        <Circle size={48} backgroundColor="var(--mistica-background-brand)">
                            <Star className="size-6 text-mistica-text-primary-inverse" />
                        </Circle>
                        <Square size={48}>
                            <Tv className="size-6" />
                        </Square>
                        <Placeholder height={48} width={120} />
                        <TextLink href="#" onPress={() => {}}>
                            TextLink inline
                        </TextLink>
                    </div>
                    <Boxed>
                        <div className="p-4">
                            <Text preset="text2">
                                Um <Text as="span" preset="text2" weight="medium">Boxed</Text>: container
                                padrão sem o consumidor conhecer classes utilitárias.
                            </Text>
                        </div>
                    </Boxed>
                    <HorizontalScroll space={12}>
                        {Array.from({length: 10}, (_, i) => (
                            <Square key={i} size={64}>
                                <Text preset="text2" weight="medium">
                                    {i + 1}
                                </Text>
                            </Square>
                        ))}
                    </HorizontalScroll>
                    <div className="grid gap-4 lg:grid-cols-2">
                        <UnorderedList>
                            <li>Ligações ilimitadas</li>
                            <li>50 GB de internet</li>
                            <li>Apps de streaming inclusos</li>
                        </UnorderedList>
                        <OrderedList>
                            <li>Escolha o plano</li>
                            <li>Preencha seus dados</li>
                            <li>Confirme o pagamento</li>
                        </OrderedList>
                    </div>
                </div>
            </Section>

            <Section title="Layout (Stack, Inline, Grid, Box)">
                <Grid columns={3} gap={16}>
                    <Stack space={8}>
                        <Text preset="text1" color="secondary">
                            Stack space=8
                        </Text>
                        {[1, 2, 3].map((n) => (
                            <Box key={n} padding={8} className="rounded-mistica-media-small bg-mistica-brand-low">
                                <Text preset="text2">Item {n}</Text>
                            </Box>
                        ))}
                    </Stack>
                    <Stack space={8}>
                        <Text preset="text1" color="secondary">
                            Inline space=8 (quebra)
                        </Text>
                        <Inline space={8}>
                            {['A', 'B', 'C', 'D', 'E'].map((letter) => (
                                <Box
                                    key={letter}
                                    padding={12}
                                    className="rounded-mistica-media-small bg-mistica-background-alternative"
                                >
                                    <Text preset="text2">{letter}</Text>
                                </Box>
                            ))}
                        </Inline>
                    </Stack>
                    <Stack space={8}>
                        <Text preset="text1" color="secondary">
                            Grid minColumnWidth=64
                        </Text>
                        <Grid minColumnWidth={64} gap={8}>
                            {[1, 2, 3, 4].map((n) => (
                                <Box key={n} paddingY={12} className="rounded-mistica-media-small bg-mistica-brand-low text-center">
                                    <Text preset="text2">{n}</Text>
                                </Box>
                            ))}
                        </Grid>
                    </Stack>
                </Grid>
            </Section>

            <Section title="Timer e Rating">
                <div className="grid gap-6 lg:grid-cols-2">
                    <div className="grid gap-3">
                        <Text preset="text1" color="secondary">
                            Oferta termina em (Timer)
                        </Text>
                        <TimerDemo />
                    </div>
                    <div className="grid gap-3">
                        <Text preset="text1" color="secondary">
                            Avalie o atendimento (Rating)
                        </Text>
                        <RatingDemo />
                    </div>
                </div>
            </Section>

            <Section title="Tipografia (text presets)">
                <div className="grid gap-2">
                    <Text preset="text8">Text 8 — Headline</Text>
                    <Text preset="text6">Text 6 — Título de página</Text>
                    <Text preset="text4">Text 4 — Subtítulo</Text>
                    <Text preset="text2">Text 2 — Corpo padrão do Mistica</Text>
                    <Text preset="text1" color="secondary">
                        Text 1 — Caption / auxiliar
                    </Text>
                    <Text preset="text2" color="link" weight="medium">
                        Link de texto com textLink
                    </Text>
                </div>
            </Section>
        </div>
    );
}

function FormulariosTab() {
    const [slider, setSlider] = React.useState([40]);

    return (
        <div className="grid gap-6">
            <Section title="Campos de texto">
                <div className="grid gap-4 lg:grid-cols-2">
                    <TextField label="Nome" helperText="Como aparece na fatura" />
                    <TextField label="CPF" error defaultValue="123" helperText="CPF inválido" />
                    <PasswordField label="Senha" helperText="Mínimo de 8 caracteres" />
                    <SearchField label="Buscar planos" />
                    <Select
                        label="Plano"
                        options={[
                            {value: 'vivo-easy', text: 'Vivo Easy'},
                            {value: 'vivo-controle', text: 'Vivo Controle'},
                            {value: 'vivo-pos', text: 'Vivo Pós'},
                            {value: 'vivo-fibra', text: 'Vivo Fibra'},
                        ]}
                    />
                    <TextArea label="Mensagem" helperText="Conte pra gente o que aconteceu" />
                </div>
            </Section>

            <Section title="Cartão de crédito">
                <div className="max-w-md">
                    <CreditCardFields />
                </div>
            </Section>

            <Section title="Autocomplete e composição">
                <div className="grid gap-4 lg:grid-cols-2">
                    <AutocompleteDemo />
                    <DoubleField>
                        <DateField label="Início" />
                        <TimeField label="Horário" />
                    </DoubleField>
                </div>
            </Section>

            <Section title="Upload de arquivos">
                <FileUploadDemo />
            </Section>

            <Section title="Campos especializados">
                <div className="grid gap-4 lg:grid-cols-2">
                    <PhoneNumberField label="Celular" helperText="Com DDD" />
                    <DecimalField label="Valor (R$)" />
                    <DateField label="Data de nascimento" />
                    <div className="grid gap-2">
                        <Text preset="text1" color="secondary">
                            Código de verificação (PinField)
                        </Text>
                        <PinField length={6} />
                    </div>
                </div>
            </Section>

            <Section title="Controles">
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="grid gap-3">
                        <div className="flex items-center gap-3">
                            <Checkbox id="terms" defaultChecked />
                            <Label htmlFor="terms">Aceito os termos</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox id="news" />
                            <Label htmlFor="news">Quero receber novidades</Label>
                        </div>
                    </div>
                    <RadioGroup name="linha-form" defaultValue="fibra">
                        <RadioButton value="fibra">Vivo Fibra</RadioButton>
                        <RadioButton value="movel">Vivo Móvel</RadioButton>
                    </RadioGroup>
                    <div className="grid gap-3">
                        <div className="flex items-center gap-3">
                            <Switch id="roaming" defaultChecked />
                            <Label htmlFor="roaming">Roaming internacional</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Switch id="5g" />
                            <Label htmlFor="5g">Rede 5G</Label>
                        </div>
                    </div>
                </div>
            </Section>

            <Section title="Slider">
                <div className="grid max-w-md gap-2">
                    <Slider value={slider} onValueChange={setSlider} max={100} step={1} />
                    <Text preset="text1" color="secondary">
                        {slider[0]} GB de franquia
                    </Text>
                </div>
            </Section>
        </div>
    );
}

function FeedbackTab() {
    const {openSnackbar} = useSnackbar();
    const [progress, setProgress] = React.useState(30);
    const [showCallout, setShowCallout] = React.useState(true);
    const [sheetAberto, setSheetAberto] = React.useState(false);

    return (
        <div className="grid gap-6">
            <Section title="Dialog e Sheet">
                <div className="flex flex-wrap gap-3">
                    <ButtonSecondary
                        onPress={() =>
                            confirm({
                                title: 'Cancelar assinatura?',
                                message:
                                    'Você perderá o acesso aos canais inclusos no plano ao final do período já pago.',
                                acceptText: 'Cancelar assinatura',
                                cancelText: 'Voltar',
                                destructiveAction: true,
                            })
                        }
                    >
                        Abrir confirm()
                    </ButtonSecondary>
                    <ButtonSecondary
                        onPress={() =>
                            alert({
                                title: 'Sem conexão',
                                message: 'Verifique sua internet e tente de novo.',
                                acceptText: 'Entendi',
                            })
                        }
                    >
                        Abrir alert()
                    </ButtonSecondary>

                    <ButtonSecondary onPress={() => setSheetAberto(true)}>Abrir sheet</ButtonSecondary>
                    <Sheet open={sheetAberto} onOpenChange={setSheetAberto}>
                        <SheetContent side="bottom">
                            <SheetTitle asChild>
                                <Text as="h2" preset="drawer-title" weight="medium" className="mb-4">
                                    Escolha um plano
                                </Text>
                            </SheetTitle>
                            <RowList>
                                <Row title="Vivo Easy" subtitle="10 GB + apps ilimitados" onPress={() => setSheetAberto(false)} />
                                <Row title="Vivo Controle" subtitle="25 GB + WhatsApp grátis" onPress={() => setSheetAberto(false)} />
                                <Row title="Vivo Pós" subtitle="50 GB para usar como quiser" onPress={() => setSheetAberto(false)} />
                            </RowList>
                        </SheetContent>
                    </Sheet>
                </div>
            </Section>

            <Section title="Snackbar">
                <div className="flex flex-wrap gap-3">
                    <ButtonSecondary
                        onPress={() =>
                            openSnackbar({message: 'Plano atualizado com sucesso', buttonText: 'Desfazer'})
                        }
                    >
                        Snackbar informativo
                    </ButtonSecondary>
                    <ButtonSecondary
                        onPress={() => openSnackbar({message: 'Não foi possível salvar', type: 'CRITICAL'})}
                    >
                        Snackbar crítico
                    </ButtonSecondary>
                </div>
            </Section>

            <Section title="Tooltip e Popover">
                <div className="flex flex-wrap items-center gap-6">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger
                                aria-label="Mais informações"
                                className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-mistica-brand-low text-mistica-control-activated outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-mistica-control-activated"
                            >
                                <Info className="size-6" />
                            </TooltipTrigger>
                            <TooltipContent>Franquia renovada todo dia 10</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </Section>

            {showCallout ? (
                <Callout
                    asset={<Info className="mt-0.5 size-6 text-mistica-neutral-high" />}
                    title="Fatura digital ativada"
                    description="Sua próxima fatura chegará por e-mail. Você pode voltar para o boleto quando quiser."
                    button={
                        <ButtonSecondary small onPress={() => {}}>
                            Configurar
                        </ButtonSecondary>
                    }
                    onClose={() => setShowCallout(false)}
                />
            ) : null}

            <Section title="FeedbackScreen">
                <FeedbackScreenDemo />
            </Section>

            <Section title="LoadingBar">
                <LoadingBarDemo />
            </Section>

            <Section title="Progresso e loading">
                <div className="grid max-w-md gap-6">
                    <div className="grid gap-2">
                        <ProgressBar value={progress} />
                        <div className="flex items-center gap-3">
                            <ButtonSecondary small onPress={() => setProgress((p) => Math.min(100, p + 10))}>
                                +10%
                            </ButtonSecondary>
                            <Text preset="text1" color="secondary">
                                {progress}%
                            </Text>
                        </div>
                    </div>
                    <ProgressBar value={80} error />
                    <div className="grid gap-2">
                        <ProgressBarStepped steps={5} currentStep={3} />
                        <Text preset="text1" color="secondary">
                            ProgressBarStepped — 3 de 5
                        </Text>
                    </div>
                    <div className="flex items-center gap-4">
                        <Spinner />
                        <Spinner size={32} />
                    </div>
                    <div className="flex items-center gap-4">
                        <Skeleton variant="circle" />
                        <div className="flex-1">
                            <SkeletonText lines={3} />
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}

function ConteudoTab() {
    return (
        <div className="grid gap-6">
            <Section title="Cards">
                <div className="grid gap-4 lg:grid-cols-2">
                    <DataCard
                        icon={<Smartphone />}
                        headline={<Tag type="promo">Novidade</Tag>}
                        pretitle="Planos"
                        title="Vivo Pós 50 GB"
                        description="Ligações ilimitadas, 50 GB de internet e apps de streaming inclusos."
                        button={
                            <ButtonPrimary small onPress={() => {}}>
                                Contratar
                            </ButtonPrimary>
                        }
                        buttonLink={<ButtonLink onPress={() => {}}>Saiba mais</ButtonLink>}
                    />
                    <MediaCard
                        src="/placeholder.svg"
                        headline={<Tag type="success">Disponível</Tag>}
                        title="Vivo Fibra 700 Mega"
                        description="Wi-Fi 6 grátis na instalação para novos clientes."
                        button={
                            <ButtonSecondary small onPress={() => {}}>
                                Verificar cobertura
                            </ButtonSecondary>
                        }
                    />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <SnapCard icon={<Wifi />} title="Wi-Fi" subtitle="Gerenciar rede" onPress={() => {}} />
                    <SnapCard icon={<CreditCard />} title="Fatura" subtitle="Vence dia 10" onPress={() => {}} />
                    <SnapCard icon={<Tv />} title="Vivo Play" subtitle="Canais e filmes" onPress={() => {}} />
                    <SnapCard icon={<Rocket />} title="Turbo" subtitle="Pacotes extras" onPress={() => {}} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
                    <PosterCard
                        src="/placeholder.svg"
                        headline={<Tag type="promo">Oferta</Tag>}
                        pretitle="Só no app"
                        title="Dobro de internet"
                        onPress={() => {}}
                    />
                    <DisplayDataCard
                        icon={<Rocket />}
                        pretitle="Internet"
                        title="Turbine seu plano"
                        description="Pacotes extras a partir de R$ 9,90."
                        button={
                            <ButtonSecondary small onPress={() => {}}>
                                Ver pacotes
                            </ButtonSecondary>
                        }
                        className="col-span-2"
                    />
                </div>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <DisplayMediaCard
                        src="/placeholder.svg"
                        headline={<Tag type="info">Vivo Play</Tag>}
                        title="Cinema em casa"
                        description="Filmes e séries inclusos no seu plano."
                        aspectRatio="16/10"
                        button={
                            <ThemeVariant variant="inverse">
                                <ButtonPrimary small onPress={() => {}}>
                                    Assistir agora
                                </ButtonPrimary>
                            </ThemeVariant>
                        }
                    />
                    <NakedCard
                        src="/placeholder.svg"
                        pretitle="Blog Vivo"
                        title="5 dicas para melhorar seu Wi-Fi"
                        description="Pequenos ajustes que fazem diferença na cobertura da sua casa."
                        onPress={() => {}}
                    />
                </div>
            </Section>

            <Section title="Carousel">
                <Carousel itemsPerPage={3}>
                    {['Streaming', 'Música', 'Games', 'Educação', 'Saúde', 'Viagens'].map((titulo) => (
                        <MediaCard
                            key={titulo}
                            src="/placeholder.svg"
                            title={titulo}
                            description="Apps inclusos no seu plano."
                            buttonLink={<ButtonLink onPress={() => {}}>Ver apps</ButtonLink>}
                        />
                    ))}
                </Carousel>
            </Section>

            <Section title="Table">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Plano</TableHead>
                            <TableHead>Franquia</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Vivo Easy</TableCell>
                            <TableCell>10 GB</TableCell>
                            <TableCell>R$ 34,99</TableCell>
                            <TableCell>
                                <Tag type="success">Ativo</Tag>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Vivo Controle</TableCell>
                            <TableCell>25 GB</TableCell>
                            <TableCell>R$ 54,99</TableCell>
                            <TableCell>
                                <Tag type="warning">Pendente</Tag>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Vivo Pós</TableCell>
                            <TableCell>50 GB</TableCell>
                            <TableCell>R$ 99,99</TableCell>
                            <TableCell>
                                <Tag type="inactive">Cancelado</Tag>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Section>

            <Section title="Counter e Meter">
                <div className="grid max-w-md gap-6">
                    <CounterDemo />
                    <div className="grid gap-2">
                        <Meter values={[0.35, 0.2, 0.1]} aria-label="Uso da franquia" />
                        <Text preset="text1" color="secondary">
                            65% da franquia usada (35% dados, 20% streaming, 10% apps)
                        </Text>
                    </div>
                </div>
            </Section>

            <Section title="EmptyState">
                <EmptyState
                    asset={
                        <Circle size={64}>
                            <Inbox className="size-8" />
                        </Circle>
                    }
                    title="Nenhuma fatura por aqui"
                    description="Quando a próxima fatura fechar, ela aparece nesta lista."
                    button={
                        <ButtonSecondary small onPress={() => {}}>
                            Ver faturas antigas
                        </ButtonSecondary>
                    }
                />
            </Section>

            <Section title="Listas (Row)">
                <RowList>
                    <Row
                        asset={<Avatar initials="VF" />}
                        title="Vivo Fibra"
                        subtitle="700 Mega — instalado"
                        right={<Tag type="success">Ativo</Tag>}
                    />
                    <Row
                        asset={
                            <div className="flex size-10 items-center justify-center rounded-full bg-mistica-brand-low">
                                <Smartphone className="size-5 text-mistica-control-activated" aria-hidden />
                            </div>
                        }
                        title="Vivo Pós"
                        subtitle="(11) 99999-0000"
                        onPress={() => {}}
                    />
                    <RoamingRow />
                </RowList>
            </Section>

            <div className="overflow-hidden rounded-mistica-container">
                <CoverHero
                    src="/placeholder.svg"
                    headline={<Tag type="promo">CoverHero</Tag>}
                    pretitle="Vivo Valoriza"
                    title="Vantagens para quem é cliente"
                    description="Descontos em cinema, música e muito mais — todo mês."
                    minHeight={320}
                    actions={
                        <ThemeVariant variant="inverse">
                            <ButtonPrimary onPress={() => {}}>Conhecer benefícios</ButtonPrimary>
                        </ThemeVariant>
                    }
                />
            </div>

            <Section title="ButtonFixedFooterLayout">
                <div className="h-72 overflow-y-auto rounded-mistica-media-small border border-mistica-border">
                    <ButtonFixedFooterLayout
                        button={
                            <ButtonPrimary onPress={() => {}} className="w-full sm:w-auto">
                                Confirmar mudança
                            </ButtonPrimary>
                        }
                        secondaryButton={
                            <ButtonLink onPress={() => {}} className="w-full sm:w-auto">
                                Cancelar
                            </ButtonLink>
                        }
                    >
                        <div className="grid gap-3 p-4">
                            <Text preset="text3" weight="medium">
                                Resumo da mudança de plano
                            </Text>
                            {['Vivo Pós 50 GB — R$ 99,99/mês', 'Fidelidade de 12 meses', 'Apps de streaming inclusos', 'Wi-Fi 6 grátis', '5G liberado', 'Suporte prioritário'].map((linha) => (
                                <Text key={linha} preset="text2" color="secondary">
                                    • {linha}
                                </Text>
                            ))}
                        </div>
                    </ButtonFixedFooterLayout>
                </div>
            </Section>

            <div className="overflow-hidden rounded-mistica-container border border-mistica-border">
                <Hero
                    background="brand"
                    pretitle="Vivo Fibra"
                    title="Internet que acompanha o seu ritmo"
                    description="Até 1 Giga de velocidade com Wi-Fi 6 incluso e instalação grátis."
                    actions={
                        <ThemeVariant variant="inverse" className="flex flex-wrap gap-3">
                            <ButtonPrimary onPress={() => {}}>Contratar agora</ButtonPrimary>
                            <ButtonSecondary onPress={() => {}}>Ver planos</ButtonSecondary>
                        </ThemeVariant>
                    }
                    media={<img src="/placeholder.svg" alt="" className="w-full rounded-mistica-media-small object-cover" style={{aspectRatio: '4/3'}} />}
                />
            </div>

            <Section title="Pagination e Timeline">
                <div className="grid gap-8 lg:grid-cols-2">
                    <PaginationDemo />
                    <Timeline>
                        <TimelineItem
                            state="completed"
                            title="Pedido recebido"
                            description="Pagamento aprovado"
                            right="10:32"
                        />
                        <TimelineItem
                            state="completed"
                            title="Em separação"
                            description="Chip sendo preparado"
                            right="11:15"
                        />
                        <TimelineItem state="active" title="Em transporte" description="Previsão: amanhã" />
                        <TimelineItem state="default" title="Entregue" />
                    </Timeline>
                </div>
            </Section>

            <Section title="MasterDetailLayout">
                <MasterDetailDemo />
            </Section>

            <Section title="Headers">
                <div className="grid gap-4">
                    <div className="overflow-hidden rounded-mistica-container">
                        <HeaderLayout
                            breadcrumbs={
                                <Breadcrumbs
                                    items={[{title: 'Início', href: '#'}, {title: 'Faturas'}]}
                                />
                            }
                            header={
                                <Header
                                    pretitle="Conta 1234-5"
                                    title="Suas faturas"
                                    description="Acompanhe cobranças, baixe segundas vias e negocie débitos."
                                />
                            }
                        />
                    </div>
                    <MainSectionHeader
                        title="Faturas em aberto"
                        description="2 faturas aguardando pagamento"
                        action={
                            <ButtonPrimary small onPress={() => {}}>
                                Pagar todas
                            </ButtonPrimary>
                        }
                    />
                </div>
            </Section>

            <Section title="Accordion">
                <Accordion type="single" collapsible>
                    <AccordionItem value="a">
                        <AccordionTrigger>Como funciona a fidelidade?</AccordionTrigger>
                        <AccordionContent>
                            O plano tem fidelidade de 12 meses. Cancelamentos antes do prazo têm
                            multa proporcional ao tempo restante.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="b">
                        <AccordionTrigger>Posso mudar de plano quando quiser?</AccordionTrigger>
                        <AccordionContent>
                            Sim, a mudança é aplicada no próximo ciclo de faturamento sem custo
                            adicional.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Section>
        </div>
    );
}

function LoadingBarDemo() {
    const [loading, setLoading] = React.useState(false);

    return (
        <div className="grid gap-4">
            <div className="overflow-hidden rounded-mistica-media-small border border-mistica-border">
                <LoadingBar fixed={false} visible />
            </div>
            <div className="flex items-center gap-3">
                <ButtonSecondary small onPress={() => setLoading((v) => !v)}>
                    {loading ? 'Parar barra fixa no topo' : 'Mostrar barra fixa no topo'}
                </ButtonSecondary>
            </div>
            <LoadingBar visible={loading} />
        </div>
    );
}

function TimerDemo() {
    const [end] = React.useState(() => Date.now() + 26 * 3600 * 1000 + 42 * 60 * 1000 + 17 * 1000);
    return (
        <div className="grid gap-3">
            <Timer endTimestamp={end} />
            <Text preset="text2" color="secondary">
                Em texto: <TextTimer endTimestamp={end} className="font-medium" />
            </Text>
        </div>
    );
}

function RatingDemo() {
    const [rating, setRating] = React.useState(4);
    return (
        <div className="grid gap-2">
            <Rating value={rating} onValueChange={setRating} />
            <Text preset="text1" color="secondary">
                {rating} de 5 estrelas
            </Text>
        </div>
    );
}

function FavoritoDemo() {
    const [favorito, setFavorito] = React.useState(false);
    return (
        <ToggleIconButton
            checked={favorito}
            onChange={setFavorito}
            checkedProps={{Icon: Heart, type: 'brand', backgroundType: 'soft', 'aria-label': 'Desfavoritar'}}
            uncheckedProps={{Icon: Heart, 'aria-label': 'Favoritar'}}
        />
    );
}

function AutocompleteDemo() {
    const [cidade, setCidade] = React.useState('');
    return (
        <Autocomplete
            label="Cidade"
            value={cidade}
            onChangeValue={setCidade}
            options={[
                'São Paulo',
                'Rio de Janeiro',
                'Belo Horizonte',
                'Salvador',
                'Curitiba',
                'Porto Alegre',
                'Recife',
                'Fortaleza',
                'Brasília',
                'Manaus',
            ]}
            helperText="Digite para filtrar (com navegação por teclado)"
        />
    );
}

type ArquivoDemo = {nome: string; tamanho: number; status: 'uploading' | 'done' | 'error'};

function FileUploadDemo() {
    const [arquivos, setArquivos] = React.useState<Array<ArquivoDemo>>([
        {nome: 'comprovante-endereco.pdf', tamanho: 245_000, status: 'done'},
    ]);

    const receber = (files: Array<File>) => {
        for (const file of files) {
            setArquivos((a) => [...a, {nome: file.name, tamanho: file.size, status: 'uploading'}]);
            setTimeout(() => {
                setArquivos((a) =>
                    a.map((item) =>
                        item.nome === file.name && item.status === 'uploading'
                            ? {...item, status: file.size > 2_000_000 ? 'error' : 'done'}
                            : item
                    )
                );
            }, 1500);
        }
    };

    return (
        <div className="grid max-w-lg gap-3">
            <FileUpload
                multiple
                helperText="PDF ou imagem até 2 MB (maiores simulam erro)"
                onFilesSelected={receber}
            />
            {arquivos.map((arquivo) => (
                <FileItem
                    key={arquivo.nome}
                    name={arquivo.nome}
                    size={arquivo.tamanho}
                    status={arquivo.status}
                    errorText="Arquivo acima de 2 MB"
                    onRemove={() => setArquivos((a) => a.filter((x) => x.nome !== arquivo.nome))}
                />
            ))}
        </div>
    );
}

function PaginationDemo() {
    const [pagina, setPagina] = React.useState(1);
    return (
        <div className="grid gap-2">
            <Pagination page={pagina} totalPages={12} onPageChange={setPagina} />
            <Text preset="text1" color="secondary">
                Página {pagina} de 12
            </Text>
        </div>
    );
}

const LINHAS_DEMO = [
    {id: 'movel', nome: 'Vivo Pós', detalhe: '(11) 99999-0000 — 50 GB'},
    {id: 'fibra', nome: 'Vivo Fibra', detalhe: 'Av. Paulista, 1000 — 700 Mega'},
    {id: 'tv', nome: 'Vivo Play', detalhe: '120 canais + apps'},
];

function MasterDetailDemo() {
    const [selecionada, setSelecionada] = React.useState<string | null>('movel');
    const linha = LINHAS_DEMO.find((l) => l.id === selecionada);

    return (
        <div className="overflow-hidden rounded-mistica-media-small border border-mistica-border">
            <MasterDetailLayout
                isDetailOpen={selecionada !== null}
                onGoBack={() => setSelecionada(null)}
                masterWidth={280}
                master={
                    <RowList noDividers>
                        {LINHAS_DEMO.map((l) => (
                            <Row
                                key={l.id}
                                title={l.nome}
                                subtitle={l.detalhe}
                                onPress={() => setSelecionada(l.id)}
                                className={selecionada === l.id ? 'bg-mistica-background-selected' : undefined}
                            />
                        ))}
                    </RowList>
                }
            >
                <div className="grid gap-3 p-4 lg:p-6">
                    <Text preset="text4">{linha?.nome ?? 'Selecione uma linha'}</Text>
                    <Text preset="text2" color="secondary">
                        {linha?.detalhe ?? 'Escolha um serviço na lista para ver os detalhes.'}
                    </Text>
                    {linha ? (
                        <div className="flex gap-3">
                            <ButtonPrimary small onPress={() => {}}>
                                Gerenciar
                            </ButtonPrimary>
                            <ButtonLink onPress={() => {}}>Ver fatura</ButtonLink>
                        </div>
                    ) : null}
                </div>
            </MasterDetailLayout>
        </div>
    );
}

function FilterRows() {
    const [filters, setFilters] = React.useState<Record<string, boolean>>({'Apenas 5G': true});
    const toggleFilter = (name: string) => (checked: boolean) =>
        setFilters((f) => ({...f, [name]: checked}));

    return (
        <RowList>
            {['Apenas 5G', 'Com streaming incluso', 'Sem fidelidade'].map((name) => (
                <Row
                    key={name}
                    title={name}
                    switch={{value: filters[name] ?? false, onChange: toggleFilter(name)}}
                />
            ))}
        </RowList>
    );
}

function RoamingRow() {
    const [roaming, setRoaming] = React.useState(true);
    return <Row title="Roaming internacional" switch={{value: roaming, onChange: setRoaming}} />;
}

function StepperDemo() {
    const steps = ['Dados', 'Endereço', 'Pagamento', 'Confirmação'];
    const [step, setStep] = React.useState(2);
    return (
        <div className="grid gap-6">
            <Stepper steps={steps} currentIndex={step} />
            <div className="flex gap-3">
                <ButtonSecondary small disabled={step === 0} onPress={() => setStep((s) => Math.max(0, s - 1))}>
                    Voltar
                </ButtonSecondary>
                <ButtonPrimary
                    small
                    disabled={step === steps.length}
                    onPress={() => setStep((s) => Math.min(steps.length, s + 1))}
                >
                    Avançar
                </ButtonPrimary>
            </div>
        </div>
    );
}

function FeedbackScreenDemo() {
    const [playKey, setPlayKey] = React.useState(0);
    return (
        <div className="grid gap-4">
            <div className="grid gap-4 lg:grid-cols-2" key={playKey}>
                <div className="overflow-hidden rounded-mistica-container border border-mistica-border">
                    <FeedbackScreen
                        type="success"
                        title="Tudo certo!"
                        description="Seu novo plano já está ativo. A cobrança aparece na próxima fatura."
                        primaryButton={<ButtonPrimary onPress={() => {}}>Continuar</ButtonPrimary>}
                    />
                </div>
                <div className="overflow-hidden rounded-mistica-container border border-mistica-border">
                    <FeedbackScreen
                        type="error"
                        title="Algo deu errado"
                        description="Não conseguimos processar o pagamento. Tente novamente."
                        primaryButton={<ButtonPrimary onPress={() => {}}>Tentar de novo</ButtonPrimary>}
                        secondaryButton={<ButtonSecondary onPress={() => {}}>Voltar</ButtonSecondary>}
                    />
                </div>
            </div>
            <div>
                <ButtonSecondary small onPress={() => setPlayKey((k) => k + 1)}>
                    Reproduzir animação dos ícones
                </ButtonSecondary>
            </div>
        </div>
    );
}

function CounterDemo() {
    const [qty, setQty] = React.useState(1);
    return (
        <div className="flex items-center gap-4">
            <Counter value={qty} onValueChange={setQty} min={0} max={10} onRemove={() => setQty(0)} />
            <Text preset="text2" color="secondary">
                {qty} {qty === 1 ? 'chip adicional' : 'chips adicionais'}
            </Text>
        </div>
    );
}

function NavegacaoTab() {
    const [section, setSection] = React.useState(0);
    const [drawerAberto, setDrawerAberto] = React.useState(false);

    return (
        <div className="grid gap-6">
            <Section title="MainNavigationBar">
                <Text preset="text1" color="secondary" className="mb-3">
                    No skin vivo a barra é roxa por design (token navigationBarBackground), como no
                    app da Vivo.
                </Text>
                <div className="overflow-hidden rounded-mistica-media-small">
                    <MainNavigationBar
                        logo={
                            <Text preset="text3" weight="medium">
                                vivo
                            </Text>
                        }
                        sections={['Início', 'Produtos', 'Faturas', 'Ajuda'].map((title, index) => ({
                            title,
                            onPress: () => setSection(index),
                        }))}
                        selectedIndex={section}
                        actions={
                            <>
                                <IconButton
                                    Icon={Bell}
                                    aria-label="Notificações"
                                    small
                                    className="text-current hover:bg-white/15 active:bg-white/25 focus-visible:ring-current"
                                />
                                <Avatar initials="AB" size={32} />
                            </>
                        }
                    />
                </div>
            </Section>

            <Section title="NavigationBar">
                <div className="overflow-hidden rounded-mistica-media-small">
                    <NavigationBar
                        title="Detalhes da fatura"
                        onBack={() => {}}
                        actions={
                            <Menu>
                                <MenuTrigger
                                    aria-label="Mais opções"
                                    className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-current outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-current"
                                >
                                    <MoreVertical className="size-5" />
                                </MenuTrigger>
                                <MenuContent align="end">
                                    <MenuItem Icon={User}>Minha conta</MenuItem>
                                    <MenuItem Icon={Settings}>Configurações</MenuItem>
                                    <MenuSeparator />
                                    <MenuItem Icon={LogOut} destructive>
                                        Sair
                                    </MenuItem>
                                </MenuContent>
                            </Menu>
                        }
                    />
                </div>
            </Section>

            <Section title="Breadcrumbs">
                <Breadcrumbs
                    items={[
                        {title: 'Início', href: '#'},
                        {title: 'Produtos', href: '#'},
                        {title: 'Vivo Fibra'},
                    ]}
                />
            </Section>

            <Section title="Stepper">
                <StepperDemo />
            </Section>

            <Section title="Drawer">
                <ButtonSecondary onPress={() => setDrawerAberto(true)}>Abrir drawer</ButtonSecondary>
                <Drawer open={drawerAberto} onOpenChange={setDrawerAberto}>
                    <DrawerContent>
                        <DrawerTitle>Filtrar planos</DrawerTitle>
                        <DrawerDescription>
                            Ajuste os filtros para encontrar o plano ideal.
                        </DrawerDescription>
                        <DrawerBody>
                            <FilterRows />
                        </DrawerBody>
                        <DrawerFooter>
                            <ButtonLink onPress={() => setDrawerAberto(false)}>Limpar</ButtonLink>
                            <ButtonPrimary onPress={() => setDrawerAberto(false)}>Aplicar filtros</ButtonPrimary>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Section>
        </div>
    );
}

const ExamplesPage = React.lazy(() => import('@/examples/ExamplesPage'));

export default function App() {
    const [dark, setDark] = React.useState(false);
    const [compact, setCompact] = React.useState(false);
    const [view, setView] = React.useState<'showcase' | 'exemplos'>('showcase');
    const [abaAtiva, setAbaAtiva] = React.useState(0);

    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

    React.useEffect(() => {
        if (compact) {
            document.documentElement.dataset.skin = 'vivo-new-system';
        } else {
            delete document.documentElement.dataset.skin;
        }
    }, [compact]);

    if (view === 'exemplos') {
        return (
            <React.Suspense
                fallback={
                    <div className="flex min-h-screen items-center justify-center bg-mistica-background">
                        <Spinner size={32} />
                    </div>
                }
            >
                <ExamplesPage onVoltar={() => setView('showcase')} />
            </React.Suspense>
        );
    }

    return (
        <div className="min-h-screen bg-mistica-background">
            <header className="bg-mistica-background-brand px-4 py-6 lg:px-12">
                <div className="mx-auto flex max-w-4xl items-center justify-between">
                    <div>
                        <Text as="h1" preset="text6" color="inverse">
                            Mistica UI
                        </Text>
                        <Text preset="text2" className="text-mistica-text-secondary-inverse">
                            Tokens do Mistica (skin new-vivo) + comportamento shadcn/ui
                        </Text>
                    </div>
                    <ThemeVariant variant="inverse" className="flex items-center gap-2">
                        <ButtonSecondary small onPress={() => setView('exemplos')}>
                            Exemplos
                        </ButtonSecondary>
                        <ButtonSecondary small onPress={() => setCompact((c) => !c)}>
                            {compact ? 'Skin: new-system' : 'Skin: vivo'}
                        </ButtonSecondary>
                        <ButtonSecondary
                            small
                            aria-label={dark ? 'Modo claro' : 'Modo escuro'}
                            onPress={() => setDark((d) => !d)}
                        >
                            {dark ? <Sun /> : <Moon />}
                            {dark ? 'Claro' : 'Escuro'}
                        </ButtonSecondary>
                    </ThemeVariant>
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-4 py-6 lg:px-0">
                <Tabs
                    tabs={[
                        {text: 'Básicos'},
                        {text: 'Formulários'},
                        {text: 'Feedback'},
                        {text: 'Conteúdo'},
                        {text: 'Navegação'},
                    ]}
                    selectedIndex={abaAtiva}
                    onChange={setAbaAtiva}
                    renderPanel={(index) =>
                        [<BasicosTab key="b" />, <FormulariosTab key="f" />, <FeedbackTab key="fb" />, <ConteudoTab key="c" />, <NavegacaoTab key="n" />][index]
                    }
                />
            </main>

            <SnackbarProvider />
            <DialogRoot />
        </div>
    );
}
