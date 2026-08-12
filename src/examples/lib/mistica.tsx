import * as React from 'react';
import * as Original from '@telefonica/mistica';

import * as Nosso from '@/components/mistica';

/**
 * Alternador de design system dos exemplos: os fluxos importam deste modulo
 * UMA vez, e o seletor do lab decide em runtime qual lib responde por tras
 * do import — o nosso mistica-ui ou o @telefonica/mistica original.
 *
 * So e possivel porque as APIs sao identicas: as mesmas props alimentam as
 * duas implementacoes.
 */
type Ds = 'nosso' | 'original';

const DsContext = React.createContext<Ds>('nosso');

function DsProvider({ds, children}: {ds: Ds; children: React.ReactNode}) {
    return <DsContext.Provider value={ds}>{children}</DsContext.Provider>;
}

/** Especificador exibido no lab conforme o DS ativo. */
function especificadorDoImport(ds: Ds): string {
    return ds === 'original' ? "'@telefonica/mistica'" : "'@/components/mistica'";
}

function alternar<P extends object>(
    nosso: React.ComponentType<P>,
    // a API e a mesma; o cast existe porque os tipos vem de pacotes distintos
    original: React.ComponentType<never>,
    nome: string
): React.ComponentType<P> {
    function Alternado(props: P) {
        const ds = React.useContext(DsContext);
        const Comp = (ds === 'nosso' ? nosso : original) as React.ComponentType<P>;
        return <Comp {...props} />;
    }
    Alternado.displayName = `Alternado(${nome})`;
    return Alternado;
}

const ButtonLink = alternar(Nosso.ButtonLink, Original.ButtonLink, 'ButtonLink');
const ButtonPrimary = alternar(Nosso.ButtonPrimary, Original.ButtonPrimary, 'ButtonPrimary');
const Callout = alternar(Nosso.Callout, Original.Callout, 'Callout');
const EmailField = alternar(Nosso.EmailField, Original.EmailField, 'EmailField');
const PasswordField = alternar(Nosso.PasswordField, Original.PasswordField, 'PasswordField');
const Stack = alternar(Nosso.Stack, Original.Stack, 'Stack');
const Text2 = alternar(Nosso.Text2, Original.Text2, 'Text2');
const Text3 = alternar(Nosso.Text3, Original.Text3, 'Text3');
const Text4 = alternar(Nosso.Text4, Original.Text4, 'Text4');
const Text5 = alternar(Nosso.Text5, Original.Text5, 'Text5');
const Title1 = alternar(Nosso.Title1, Original.Title1, 'Title1');
const Avatar = alternar(Nosso.Avatar, Original.Avatar, 'Avatar');
const Inline = alternar(Nosso.Inline, Original.Inline, 'Inline');
const Row = alternar(Nosso.Row, Original.Row, 'Row');
const RowList = alternar(Nosso.RowList, Original.RowList, 'RowList');
const Tag = alternar(Nosso.Tag, Original.Tag, 'Tag');
const Boxed = alternar(Nosso.Boxed, Original.Boxed, 'Boxed');
const CreditCardExpirationField = alternar(
    Nosso.CreditCardExpirationField,
    Original.CreditCardExpirationField,
    'CreditCardExpirationField'
);
const CreditCardNumberField = alternar(
    Nosso.CreditCardNumberField,
    Original.CreditCardNumberField,
    'CreditCardNumberField'
);
const CvvField = alternar(Nosso.CvvField, Original.CvvField, 'CvvField');
const PhoneNumberField = alternar(Nosso.PhoneNumberField, Original.PhoneNumberField, 'PhoneNumberField');
const RadioGroup = alternar(Nosso.RadioGroup, Original.RadioGroup, 'RadioGroup');
const Stepper = alternar(Nosso.Stepper, Original.Stepper, 'Stepper');
const SuccessFeedbackScreen = alternar(
    Nosso.SuccessFeedbackScreen,
    Original.SuccessFeedbackScreen,
    'SuccessFeedbackScreen'
);
const TextField = alternar(Nosso.TextField, Original.TextField, 'TextField');

/** Hook alternado: a mesma chamada abre o snackbar do DS ativo. */
function useSnackbar(): ReturnType<typeof Nosso.useSnackbar> {
    const ds = React.useContext(DsContext);
    const nosso = Nosso.useSnackbar();
    const original = Original.useSnackbar();
    return ds === 'nosso' ? nosso : (original as ReturnType<typeof Nosso.useSnackbar>);
}

/** Nomes alternados — usado pelo teste de paridade. */
const NOMES_ALTERNADOS = [
    'Avatar',
    'Boxed',
    'ButtonLink',
    'ButtonPrimary',
    'Callout',
    'CreditCardExpirationField',
    'CreditCardNumberField',
    'CvvField',
    'EmailField',
    'Inline',
    'PasswordField',
    'PhoneNumberField',
    'RadioGroup',
    'Row',
    'RowList',
    'Stack',
    'Stepper',
    'SuccessFeedbackScreen',
    'Tag',
    'Text2',
    'Text3',
    'Text4',
    'Text5',
    'TextField',
    'Title1',
    'useSnackbar',
] as const;

export {
    DsProvider,
    especificadorDoImport,
    NOMES_ALTERNADOS,
    type Ds,
    // API identica a do Mistica, com a lib decidida em runtime:
    Avatar,
    Boxed,
    ButtonLink,
    ButtonPrimary,
    Callout,
    CreditCardExpirationField,
    CreditCardNumberField,
    CvvField,
    EmailField,
    Inline,
    PasswordField,
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
    Text4,
    Text5,
    TextField,
    Title1,
    useSnackbar,
};
