# Mistica UI

Recriação do [Mistica](https://github.com/Telefonica/mistica-web) (design system da Telefónica)
usando a arquitetura do [shadcn/ui](https://ui.shadcn.com): **design tokens e visual do Mistica,
comportamento e composição do shadcn** (Radix primitives + Tailwind + cva).

Skin padrão: **new-vivo** — no Mistica atual o skin "Vivo-new" foi renomeado para `vivo`
(o Vivo antigo foi descontinuado), então os tokens vêm de `tokens/vivo.json`.

## Stack

- webpack 5 (swc-loader + webpack-dev-server) + React 19 + TypeScript
- Tailwind CSS v4 via PostCSS (`@tailwindcss/postcss`, `@theme inline`)
- Vitest para os testes (pipeline próprio, independente do build)
- Radix UI primitives (checkbox, switch, radio, select, label, slot)
- class-variance-authority + tailwind-merge (padrão shadcn)

## Como rodar

```bash
npm install
npm run dev        # showcase + laboratório de exemplos
npm run storybook  # catálogo de componentes (http://localhost:6006)
```

## Storybook

Catálogo interativo em `npm run storybook`, seguindo como base a organização do
[Storybook público do Mistica](https://mistica-web.vercel.app) (Componentes, Padrões,
Layout, Utilitários), mas com as práticas atuais do Storybook:

- **CSF3 + autodocs**: toda story tem página de docs com tabela de props e controls.
- **Exemplos de código habilitados** (o do Mistica original não tem): botão *Show code*
  em cada exemplo e painel *Code* com o fonte completo da story.
- **Toolbar global**: skin (`vivo` padrão / `vivo-new-system` compacta), tema
  claro/escuro e cor de marca aplicada em runtime nos tokens.
- **Addon de acessibilidade** (axe) em todas as stories.
- As stories importam do barrel `@/components/mistica` — o código exibido é exatamente
  o que um app escreveria usando a API do Mistica.

Arquivos em `src/stories/`, config em `.storybook/`. Build estático:
`npm run build-storybook` (sai em `storybook-static/`).

## Arquitetura dos tokens

```
tokens/vivo.json                  # fonte da verdade (copiado de Telefonica/mistica-design)
        │  python3 scripts/generate-tokens.py
        ▼
src/styles/mistica-vivo.css       # gerado: CSS custom properties + @theme do Tailwind
        ▼
src/index.css                     # mapeia tokens Mistica -> nomes semânticos shadcn
```

- Todos os 305 tokens de cor (light e dark) viram `--mistica-*` e classes Tailwind
  `bg-mistica-*` / `text-mistica-*` / `border-mistica-*` (ex.:
  `bg-mistica-button-primary-background`).
- Dark mode é a classe `dark` no `<html>` (padrão shadcn), com os valores dark do skin.
- Radius por componente do skin: `rounded-mistica-button` (32px), `rounded-mistica-input`
  (16px), `rounded-mistica-chip` (24px), etc.
- Text presets responsivos (mobile → desktop em 1024px) via
  `--mistica-text-size-*` / `--mistica-text-line-height-*` / `--mistica-text-weight-*`,
  consumidos pelo componente `Text`.
- Nomes semânticos do shadcn (`--color-primary`, `--color-border`, ...) apontam para os
  tokens Mistica em `src/index.css`, então componentes shadcn "de prateleira" também
  funcionam com o tema.
- **Densidade**: alturas e paddings dos componentes são vars
  (`--mistica-height-button`, `--mistica-height-field`, `--mistica-card-padding`, ...),
  o que permite skins compactos sem tocar nos componentes.

### Testando mudanças de tokens

O dev server observa `tokens/*.json`: **salve o JSON e o browser atualiza na hora**
(o plugin `scripts/mistica-tokens-webpack-plugin.mjs` roda o generator no início do
build e a cada mudança no watch, e o HMR aplica o CSS regenerado — o app e o
Storybook usam o mesmo plugin). Para regenerar manualmente: `npm run tokens`.

### Skin vivo-new-system (denso, para sistemas internos)

O Mistica é mobile-first e pensado para pouca informação na tela; para sistemas
internos em monitores HD existe o **vivo-new-system**: mesmas cores do vivo, mas
compacto. Definido em `tokens/vivo-new-system.json` como um *overlay* que herda do
vivo (`"extends": "vivo.json"`) e muda só o que precisa:

- alturas: botão 48→36, campo 56→48, row 72→48, tabs 56→40, etc. (chave `density`)
- paddings: card 16/24→12, botão 16→12, margens de layout 48→24 (chave `spacing`)
- tipografia **não escala no desktop** (`useMobileTypeOnDesktop`): corpo fica em
  14px em vez de 16px — mais informação por tela

Por ser escopado em `[data-skin="vivo-new-system"]`, é importado junto com o skin
base e **trocável em runtime**:

```ts
document.documentElement.dataset.skin = 'vivo-new-system'; // ativa
delete document.documentElement.dataset.skin;              // volta ao padrão
```

O showcase tem um botão "Skin" no header para alternar (combina com dark mode).

Para atualizar os tokens ou trocar de skin:

```bash
curl -o tokens/vivo.json https://raw.githubusercontent.com/Telefonica/mistica-design/production/tokens/vivo.json
python3 scripts/generate-tokens.py tokens/vivo.json src/styles/mistica-vivo.css
```

O CSS do skin **vivo-evolution** já está gerado em `src/styles/mistica-vivo-evolution.css`
(rebrand 2025, paleta de 80 cores). Para usá-lo, troque o import em `src/index.css`:

```css
/* @import './styles/mistica-vivo.css'; */
@import './styles/mistica-vivo-evolution.css';
```

Importe apenas UM skin por vez — ambos definem as mesmas variáveis em `:root`.
Todos os componentes funcionam sem alteração, pois os dois skins têm o mesmo
contrato de 305 tokens.

## Componentes (src/components/ui)

**Básicos**

| Componente | Equivalente Mistica | Notas |
| --- | --- | --- |
| `Button` | ButtonPrimary/Secondary/Danger/Link | variantes `primary` `secondary` `danger` `link`, tamanhos `default` (48px) e `small` (32px) |
| `IconButton` | IconButton | variantes `transparent` `soft` `solid`, circular |
| `Tag` | Tag | tipos `promo` `active` `inactive` `success` `warning` `error` `info` |
| `Badge` | Badge | numérico (`+9` acima de 9) ou ponto; standalone ou sobre um filho |
| `Chip` | Chip | selecionável (`active`), ícone opcional, `onClose` |
| `Avatar` | Avatar | imagem ou iniciais (brandLow/textBrand), badge opcional |
| `Text` | Text/Title | presets `text1..10`, `title1..4`, presets de card/tabs/input |
| `Divider` | Divider | token `divider` |

**Formulários**

| Componente | Equivalente Mistica | Notas |
| --- | --- | --- |
| `TextField` | TextField | label flutuante, `helperText`, `error`, `endAdornment`, 56px |
| `PasswordField` | PasswordField | olho de mostrar/ocultar |
| `SearchField` | SearchField | lupa + botão de limpar |
| `PhoneNumberField` | PhoneNumberField | máscara BR `(11) 91234-5678` |
| `DecimalField` / `IntegerField` | DecimalField/IntegerField | filtro numérico, `inputMode` correto |
| `DateField` | DateField | input de data nativo com frame do skin |
| `PinField` | PinField | caixas OTP com avanço automático (input-otp) |
| `CreditCardFields` (+ campos individuais) | CreditCardFields | número em grupos de 4, validade MM/AA (zero automático), CVV |
| `TextArea` | TextField multiline | mesmo frame, multilinha |
| `Rating` / `InfoRating` | Rating / InfoRating | estrelas controlActivated; InfoRating exibe com meia estrela |
| `Autocomplete` | Autocomplete | sugestões filtradas (sem acento), teclado, combobox acessível |
| `TimeField` / `DateTimeField` / `MonthField` | idem | wrappers do DateField |
| `DoubleField` | DoubleField | dois campos lado a lado (empilha no mobile) |
| `FileUpload` / `FileItem` | FileUpload | drag-and-drop (tokens backgroundDropZone*) + itens com status |
| `Select` | Select | trigger com frame de campo + label flutuante, menu com radius de popup |
| `Checkbox` | Checkbox | Radix, radius 4px, `controlActivated` |
| `Switch` | Switch | estilo Android (trilho 34×14 + knob 20px), tokens `toggleAndroid*` |
| `RadioGroup` | RadioButton | Radix radio group |
| `Slider` | Slider | trilho `barTrack` + knob `controlActivated`, `values` discretos e `tooltip` |

**Feedback**

| Componente | Equivalente Mistica | Notas |
| --- | --- | --- |
| `Dialog` | Dialog/Alert/Confirm | Radix, radius popup, overlay `backgroundOverlay` |
| `Sheet` | Sheet | bottom sheet com alça, radius sheet; lados `bottom`/`right`/`left` |
| `showSnackbar` / `SnackbarProvider` | Snackbar | sonner; tipos `informative`/`critical`, ação `textLinkSnackbar` |
| `Tooltip` | Tooltip | Radix, container claro com seta |
| `Popover` | Popover | Radix, radius popup |
| `Callout` | Callout | `backgroundAlternative`, ícone, ações, fechar |
| `Spinner` | Spinner | SVG `controlActivated` |
| `Skeleton` / `SkeletonText` | Skeleton* | variantes `line`/`circle`/`rectangle` + bloco de texto |
| `ProgressBar` | ProgressBar | Radix Progress, 4px, `error` opcional |
| `FeedbackScreen` | FeedbackScreen | sucesso "inverse" no vivo (themeVariant), erro/info em fundo claro |
| `LoadingBar` | LoadingBar | barra indeterminada fixa no topo (`loadingBar` tokens) |

**Layout**

| Componente | Equivalente Mistica | Notas |
| --- | --- | --- |
| `Box` | Box | paddings em px, polimórfico (`as`), `className` livre |
| `Stack` | Stack | pilha vertical com `space` (gap em px) |
| `Inline` | Inline | linha horizontal com `space`, quebra por padrão |
| `Grid` | GridLayout | `columns` (1 col no mobile) ou `minColumnWidth` (auto-fill) |
| `ResponsiveLayout` | ResponsiveLayout | container central 1224px + margens do token `responsiveLayoutMargin` |

**Conteúdo e navegação**

| Componente | Equivalente Mistica | Notas |
| --- | --- | --- |
| `Tabs` | Tabs | Radix, preset tabsLabel, indicador `controlActivated` |
| `Accordion` | Accordion | Radix, dividers e chevron |
| `Row` / `RowList` | Row/RowList/BoxedRowList | asset, título/subtítulo, controle ou chevron; `boxed` |
| `DataCard` | DataCard | ícone + conteúdo + ações |
| `MediaCard` | MediaCard | imagem + conteúdo + ações |
| `SnapCard` | SnapCard | compacto, clicável |
| `PosterCard` | PosterCard | imagem de fundo + gradiente `cardContentOverlay` + texto inverso |
| `DisplayDataCard` | DisplayDataCard | destaque com título text6 e padding generoso |
| `NavigationBar` | NavigationBar | no vivo a barra é roxa por design (`navigationBarBackground`) |
| `MainNavigationBar` | MainNavigationBar | logo + seções (indicador `currentColor`) + ações |
| `Menu` | Menu | Radix dropdown, itens com ícone e variante destrutiva |
| `Drawer` | Drawer | painel lateral direito, paddings de drawer e preset drawerTitle |
| `Breadcrumbs` | NavigationBreadcrumbs | links `textLink` + separador `/` |
| `Stepper` | Stepper | passos concluído/atual/futuro com preset stepperStepLabel |
| `Carousel` | Carousel | scroll-snap, setas no desktop, bullets (ativo alongado) |
| `Table` | Table | boxed por padrão, header `textSecondary`, dividers |
| `EmptyState` | EmptyState | ícone/imagem + título + descrição + ações |
| `Counter` | Counter | [- n +] com lixeira opcional no mínimo |
| `Meter` | Meter (linear) | barra segmentada sobre `barTrack` |
| `Hero` | Hero | fundos default/alternative/brand, heroPadding |
| `CoverHero` | CoverHero | imagem de fundo + `backgroundOverlay` + conteúdo inverso |
| `DisplayMediaCard` | DisplayMediaCard | PosterCard com descrição e ações |
| `NakedCard` | NakedCard | mídia + conteúdo sem caixa |
| `Timer` / `TextTimer` | Timer/TextTimer | contagem regressiva em caixas ou texto |
| `Image` / `Video` | Image/Video | aspect ratio + radius do skin, fundo skeleton |
| `ButtonFixedFooterLayout` | ButtonFixedFooterLayout | rodapé de botões sticky |
| `Pagination` | Pagination | números com reticências, `surroundingPageCount`, modo `iconOnly` |
| `Timeline` / `TimelineItem` | Timeline | estados completed/active/default, linha conectora |
| `MasterDetailLayout` | MasterDetailLayout | lista + detalhe no desktop; um por vez no mobile |
| `Header` / `HeaderLayout` / `MainSectionHeader` | idem | cabeçalhos de página (brand) e de seção |
| `FunnelNavigationBar` | FunnelNavigationBar | navbar de funil (logo + ações) |
| `ToggleIconButton` | ToggleIconButton | ícone com estado on/off (favoritar) |
| `StackingGroup` | StackingGroup | avatares sobrepostos com "+N" |
| `ProgressBarStepped` | ProgressBarStepped | barra segmentada por passos |
| `TextLink` | TextLink | link inline acessível |
| `CoverCard` / `EmptyStateCard` | idem | variações prontas de card |

**Utilitários** (paridade de API — o consumidor não precisa conhecer Tailwind)

| Componente | Equivalente Mistica | Notas |
| --- | --- | --- |
| `Circle` / `Square` | Circle/Square | contornos para ícones/mídia, cor e imagem de fundo |
| `Boxed` / `NegativeBox` | Boxed/NegativeBox | container padrão e margens negativas full-bleed |
| `Align` | Align | alinhamento horizontal/vertical do filho |
| `FadeIn` | FadeIn | entrada suave com delay/duração |
| `HorizontalScroll` | HorizontalScroll | rolagem horizontal sem scrollbar, snap opcional |
| `ScreenReaderOnly` / `SkipLink` | idem | acessibilidade sem classes utilitárias |
| `UnorderedList` / `OrderedList` | idem | listas tipográficas com marcadores da marca |
| `Placeholder` | Placeholder | bloco tracejado para protótipos |

## Fonte

O stack de fontes é `'Vivo Type', 'Roboto', ...`. A Vivo Type é proprietária — se você
tiver os arquivos, adicione os `@font-face` em `src/index.css` (ou em um CSS próprio) que
o resto se ajusta sozinho. Sem ela, cai no fallback do sistema.

## API idêntica ao Mistica original (única, sem legado)

Os componentes expõem **somente as props que o Mistica define** — o TypeScript
mostra uma API só, sem estilos alternativos para confundir. Quem vem do
`@telefonica/mistica` usa as mesmas props; a migração é trocar o import. Prova: o
corpo do fluxo de login em `src/examples/flows/` é idêntico nas duas
implementações; só os imports mudam.

Não existem mais: `Button` genérico (`variant`/`size`/`loading`/`onClick`),
`onCheckedChange`/`onValueChange` (Radix) nos controles, `Icon`/`actions` nos
cards e callouts, `showSnackbar`, `endAdornment` (agora `endIcon`), composições
Radix de Select/Tabs (internas). Modais programáticos usam `alert`/`confirm`
(monte `<DialogRoot/>` na raiz) ou os componentes controlados (`open`/`onOpenChange`).

### Drop-in: trocar o import (ou nem isso)

Ponto de entrada único em `@/components/mistica` (barrel com todos os
componentes). A migração de um arquivo é trocar **uma linha**:

```tsx
// antes
import {ButtonPrimary, EmailField, useSnackbar} from '@telefonica/mistica';
// depois
import {ButtonPrimary, EmailField, useSnackbar} from '@/components/mistica';
```

Ou **zero linhas**, com um alias no bundler do app consumidor apontando
`@telefonica/mistica` para o nosso pacote. Para o nível do app existe o
`ThemeContextProvider` de compatibilidade (aplica `colorScheme` e monta
Snackbar/DialogRoot — não carrega contexto, o tema é CSS) e um stub de
`getVivoSkin()`.

**A garantia é demonstrada ao vivo**: cada fluxo de exemplo é **um único
arquivo** (`src/examples/flows/login.tsx` etc.) que importa do alternador
`src/examples/lib/mistica.tsx` — o seletor do lab decide **em runtime** qual
lib atende o import (o nosso barrel ou o `@telefonica/mistica` real), e o lab
exibe a linha de import trocando. Mesmo código, mesmas props, dois design
systems. O alternador só compila porque as APIs coincidem, e o
`paridade.test.ts` garante que todo nome usado existe nas duas libs. Limites
conhecidos: ícones `Icon*`, `Form` e `Community*` (ver seção "O que ficou de
fora").

- **Botões**: `ButtonPrimary` / `ButtonSecondary` / `ButtonDanger` / `ButtonLink` /
  `ButtonLinkDanger` com `onPress`, `small`, `showSpinner`, `loadingText`,
  `submit`, `href`
- **Campos**: todos aceitam `onChangeValue(value)`, `name`, `optional`;
  `EmailField` incluído; `Select` por `options: [{value, text}]`
- **Controles**: `Checkbox`/`Switch` com `onChange(checked)` e children como
  rótulo; `RadioGroup onChange` + `RadioButton`; `Row` com
  `switch/checkbox={{value, defaultValue, onChange}}` (linha toda alterna),
  `onPress`, `badge`, `headline`
- **Tipografia**: `Text1..Text10`, `Title1..Title4` com pesos booleanos
  (`<Text2 medium>`)
- **Feedback**: `useSnackbar().openSnackbar({message, type: 'INFORMATIVE'|'CRITICAL',
  buttonText, onClose})`; `alert`/`confirm`/`dialog` imperativos (monte
  `<DialogRoot/>` na raiz); `SuccessFeedbackScreen`/`ErrorFeedbackScreen` com
  `primaryButton`/`secondaryButton`
- **Conteúdo**: `Callout`/`EmptyState`/cards com `asset`, `button`,
  `secondaryButton`, `buttonLink`; `Tabs` por `{tabs, selectedIndex, onChange}`
  (a composição Radix segue como `TabsRoot`); `IconButton` com `Icon`, `onPress`,
  `backgroundType`, `small`
- **`ThemeVariant variant="inverse"`**: dentro de fundos brand, botões/links/textos
  trocam para os tokens inversos automaticamente (via CSS vars)

## Exemplos — laboratório comparativo

Botão **"Exemplos"** no header do showcase (código em `src/examples/`). Três fluxos
reais, mockados mas funcionais, implementados **duas vezes** — no nosso mistica-ui e
no Mistica original (`@telefonica/mistica`) — com a MESMA lógica de validação
compartilhada (`src/examples/lib/validation.ts`):

- **Login**: validação de e-mail/senha, loading, erro de servidor mockado
  (senha `errada123`), snackbar de sucesso
- **Contratar plano**: wizard com stepper — escolha do plano → dados (CPF com
  validação real de dígitos verificadores, celular com máscara) → pagamento
  (cartão validado por Luhn — teste com `4111 1111 1111 1111`, validade futura,
  CVV) → tela de sucesso
- **Minha conta**: preferências com rows de toggle, cancelamento com confirmação
  (sheet no nosso; snackbar com desfazer no original)

Controles no topo:

- **Design system**: alterna entre o nosso e o original com 1 clique — ou
  **"Lado a lado"**, que renderiza o MESMO arquivo de fluxo nos dois DS
  simultaneamente (painel esquerdo nosso, direito original, cada um com sua
  linha de import); tema e cor recolorem os dois painéis juntos, e a skin
  compacta afeta só o lado nosso. **O estado é espelhado**: digitar num
  painel atualiza o outro em tempo real — pattern de store externo com
  chave posicional de hook (`src/examples/lib/estado-compartilhado.tsx`):
  como os dois painéis rodam o mesmo arquivo, a posição de cada `useState`
  identifica o valor num store compartilhado por fluxo. A única mudança nos
  fluxos é importar `useState` do alternador em vez do React (fora do lab,
  degrada para o `useState` comum). O estado também sobrevive à troca de
  DS, de modo e de aba de fluxo.
- **Tema**: claro/escuro nos dois (classe `dark` no nosso; `colorScheme` +
  `data-mistica-color-scheme` no original)
- **Skin**: vivo ↔ vivo-new-system (só o nosso)
- **Cor de marca**: presets + seletor livre, aplicada nos DOIS sistemas em runtime
  (no nosso, sobrescrevendo as vars `--mistica-*` derivadas da cor; no original,
  sobrescrevendo a paleta `--mistica-vivo-*` de que os tokens deles derivam)

Notas de integração com o Mistica original (v17, build por CSS vars): importe
`css/mistica.css` + `css/vivo.css` e aplique `data-mistica-skin="vivo"` e
`data-mistica-color-scheme` no `<html>` — o ThemeContextProvider sozinho não estila.
Overrides de cor via objeto skin são validados por caminho (só chaves existentes).

## Testes

```bash
npm test                                  # vitest (componentes e máscaras)
python3 scripts/test_generate_tokens.py   # pipeline de tokens
```

O que tem teste (o critério foi: lógica com regras de negócio ou fácil de quebrar
sem perceber — não estilo):

- **Máscaras**: telefone BR, número de cartão, validade MM/AA (zero automático)
- **Campos numéricos**: DecimalField/IntegerField (filtro de caracteres)
- **Badge**: regra do `+9`
- **Counter**: limites min/max e lixeira no mínimo
- **Button**: estado `loading` (disabled + aria-busy + loadingText) e `asChild`
- **TextField**: associação de label e acessibilidade de erro (`aria-invalid`,
  `aria-describedby`)
- **TextTimer**: contagem regressiva com fake timers, unidades ocultas, `onFinish`
- **Generator python**: kebab-case, resolução de paleta/rgba/gradiente, deep-merge
  do `extends` e o carregamento do vivo-new-system

Estilo/visual não tem teste unitário de propósito — isso é verificado no showcase.

## O que ficou de fora (por decisão)

- **Logo e ícones proprietários**: logos das marcas e a biblioteca de ícones do
  Mistica (milhares de `Icon*`) — usamos lucide-react; adicione os SVGs oficiais
  se a fidelidade de ícones virar requisito.
- **Form** (validação orquestrada do Mistica): em apps shadcn o padrão é
  react-hook-form + zod; os campos deste projeto são compatíveis (props nativas
  `value`/`onChange`/`error`). Os exemplos mostram o padrão controlado.
- **BrandLoadingScreen/LoadingScreen** (animações de marca proprietárias),
  **IbanField** (mercado europeu), **Community\*** (experimentais — avaliar sob
  demanda; `ValueBlock`/`HighlightedValueBlock` são bons candidatos para
  dashboards), variações de carousel (`Slideshow`, `CenteredCarousel`) e mosaicos
  (`HorizontalMosaic`/`VerticalMosaic`).
- Troca de skin de **marca** em runtime (vivo ↔ vivo-evolution é por import de CSS,
  pois ambos definem `:root`). Overlays escopados como o vivo-new-system já trocam
  em runtime via `data-skin`; se precisarem de multi-marca dinâmico, é só gerar as
  marcas também com `"scope"`.
