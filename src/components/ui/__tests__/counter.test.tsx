import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it, vi} from 'vitest';

import {Counter} from '@/components/ui/counter';

describe('Counter', () => {
    it('incrementa e decrementa', () => {
        const onValueChange = vi.fn();
        render(<Counter value={2} onValueChange={onValueChange} min={0} max={5} />);

        fireEvent.click(screen.getByLabelText('Aumentar'));
        expect(onValueChange).toHaveBeenCalledWith(3);

        fireEvent.click(screen.getByLabelText('Diminuir'));
        expect(onValueChange).toHaveBeenCalledWith(1);
    });

    it('nao passa do maximo (botao desabilitado)', () => {
        const onValueChange = vi.fn();
        render(<Counter value={5} onValueChange={onValueChange} min={0} max={5} />);
        expect(screen.getByLabelText('Aumentar')).toBeDisabled();
    });

    it('no minimo sem onRemove, diminuir fica desabilitado', () => {
        render(<Counter value={0} onValueChange={() => {}} min={0} />);
        expect(screen.getByLabelText('Diminuir')).toBeDisabled();
    });

    it('no minimo com onRemove, mostra lixeira e chama onRemove', () => {
        const onRemove = vi.fn();
        render(<Counter value={0} onValueChange={() => {}} min={0} onRemove={onRemove} />);

        const remover = screen.getByLabelText('Remover');
        expect(remover).toBeEnabled();
        fireEvent.click(remover);
        expect(onRemove).toHaveBeenCalledOnce();
    });
});
