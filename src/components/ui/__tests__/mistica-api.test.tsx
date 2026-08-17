import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {ButtonPrimary, ButtonSecondary} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {GridLayout} from '@/components/ui/grid-layout';
import {Row} from '@/components/ui/row';
import {Select} from '@/components/ui/select';
import {Text2} from '@/components/ui/text';
import {TextField} from '@/components/ui/text-field';

/**
 * Testes da API compativel com o Mistica original: quem migra do
 * @telefonica/mistica usa as mesmas props.
 */
describe('ButtonPrimary (API Mistica)', () => {
    it('dispara onPress', () => {
        const onPress = vi.fn();
        render(<ButtonPrimary onPress={onPress}>Continuar</ButtonPrimary>);
        fireEvent.click(screen.getByRole('button', {name: 'Continuar'}));
        expect(onPress).toHaveBeenCalledOnce();
    });

    it('showSpinner desabilita e mostra loadingText', () => {
        render(
            <ButtonPrimary onPress={() => {}} showSpinner loadingText="Enviando...">
                Enviar
            </ButtonPrimary>
        );
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(screen.getByText('Enviando...')).toBeInTheDocument();
    });

    it('href vira link', () => {
        render(<ButtonSecondary href="/planos">Ver planos</ButtonSecondary>);
        expect(screen.getByRole('link', {name: 'Ver planos'})).toHaveAttribute('href', '/planos');
    });
});

describe('TextField (API Mistica)', () => {
    it('onChangeValue recebe o valor direto', () => {
        const onChangeValue = vi.fn();
        render(<TextField label="Nome" onChangeValue={onChangeValue} />);
        fireEvent.change(screen.getByLabelText('Nome'), {target: {value: 'Ana'}});
        expect(onChangeValue).toHaveBeenCalledWith('Ana');
    });

    it('optional marca o label', () => {
        render(<TextField label="Apelido" optional />);
        expect(screen.getByLabelText('Apelido (opcional)')).toBeInTheDocument();
    });
});

describe('Checkbox (API Mistica)', () => {
    it('onChange recebe o booleano e children vira rotulo clicavel', () => {
        const onChange = vi.fn();
        render(<Checkbox name="termos" onChange={onChange}>Aceito os termos</Checkbox>);
        fireEvent.click(screen.getByText('Aceito os termos'));
        expect(onChange).toHaveBeenCalledWith(true);
    });
});

describe('Row (API Mistica)', () => {
    it('switch: linha toda alterna e onChange recebe o valor', () => {
        const onChange = vi.fn();
        render(<Row title="Roaming" switch={{defaultValue: false, onChange}} />);
        fireEvent.click(screen.getByText('Roaming'));
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it('onPress torna a linha um botao', () => {
        const onPress = vi.fn();
        render(<Row title="Alterar plano" onPress={onPress} />);
        fireEvent.click(screen.getByRole('button'));
        expect(onPress).toHaveBeenCalledOnce();
    });
});

describe('Select (API Mistica)', () => {
    it('renderiza label e options', () => {
        render(
            <Select
                label="Plano"
                options={[
                    {value: 'a', text: 'Vivo Easy'},
                    {value: 'b', text: 'Vivo Pós'},
                ]}
                defaultValue="b"
            />
        );
        expect(screen.getByText('Plano')).toBeInTheDocument();
        expect(screen.getByText('Vivo Pós')).toBeInTheDocument();
    });
});

describe('Text nomeado (API Mistica)', () => {
    it('Text2 medium aplica peso 500', () => {
        render(<Text2 medium>Corpo</Text2>);
        expect(screen.getByText('Corpo')).toHaveStyle({fontWeight: '500'});
    });
});

describe('GridLayout (API Mistica)', () => {
    it('template 8+4: left e right nos spans oficiais, com verticalSpace', () => {
        render(
            <GridLayout
                template="8+4"
                verticalSpace={16}
                left={<div>conteudo</div>}
                right={<div>resumo</div>}
            />
        );
        const grid = screen.getByTestId('GridLayout');
        expect(grid.children).toHaveLength(2);
        expect((grid.children[0] as HTMLElement).style.getPropertyValue('--mistica-grid-col-span')).toBe('8');
        expect((grid.children[1] as HTMLElement).style.getPropertyValue('--mistica-grid-col-span')).toBe('4');
        expect(grid.style.getPropertyValue('--mistica-grid-vertical-space')).toBe('16px');
    });

    it('dataAttributes ganha prefixo data-', () => {
        render(<GridLayout dataAttributes={{qsysid: 'grid'}}>conteudo</GridLayout>);
        expect(screen.getByTestId('GridLayout')).toHaveAttribute('data-qsysid', 'grid');
    });
});
