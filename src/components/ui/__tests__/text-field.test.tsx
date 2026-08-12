import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {DecimalField, IntegerField} from '@/components/ui/decimal-field';
import {TextField} from '@/components/ui/text-field';

describe('TextField', () => {
    it('associa o label ao input', () => {
        render(<TextField label="Nome" />);
        expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    });

    it('erro marca aria-invalid e pinta o helper', () => {
        render(<TextField label="CPF" error helperText="CPF inválido" />);
        const input = screen.getByLabelText('CPF');
        expect(input).toHaveAttribute('aria-invalid', 'true');
        expect(input).toHaveAccessibleDescription('CPF inválido');
    });

    it('sem erro nao tem aria-invalid', () => {
        render(<TextField label="Nome" helperText="Como aparece na fatura" />);
        expect(screen.getByLabelText('Nome')).not.toHaveAttribute('aria-invalid');
    });
});

describe('DecimalField', () => {
    it('remove caracteres nao numericos e mantem um separador', () => {
        render(<DecimalField label="Valor" />);
        const input = screen.getByLabelText('Valor') as HTMLInputElement;

        fireEvent.change(input, {target: {value: '12,3a4'}});
        expect(input.value).toBe('12,34');

        fireEvent.change(input, {target: {value: '12,34,5'}});
        expect(input.value).toBe('12,345');
    });
});

describe('IntegerField', () => {
    it('permite apenas digitos', () => {
        render(<IntegerField label="Quantidade" />);
        const input = screen.getByLabelText('Quantidade') as HTMLInputElement;

        fireEvent.change(input, {target: {value: '1a2,3'}});
        expect(input.value).toBe('123');
    });
});
