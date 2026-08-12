import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {Badge} from '@/components/ui/badge';

describe('Badge', () => {
    it('mostra o valor numerico', () => {
        render(<Badge value={5} />);
        expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('limita a +9 acima de 9 (como no Mistica)', () => {
        render(<Badge value={22} />);
        expect(screen.getByText('+9')).toBeInTheDocument();
        expect(screen.queryByText('22')).not.toBeInTheDocument();
    });

    it('9 ainda aparece literal', () => {
        render(<Badge value={9} />);
        expect(screen.getByText('9')).toBeInTheDocument();
    });

    it('sem valor renderiza apenas o ponto', () => {
        const {container} = render(<Badge />);
        const indicator = container.querySelector('[data-slot="badge-indicator"]');
        expect(indicator).toBeInTheDocument();
        expect(indicator).toHaveTextContent('');
    });

    it('com children posiciona o indicador sobre o conteudo', () => {
        const {container} = render(
            <Badge value={3}>
                <span>icone</span>
            </Badge>
        );
        expect(screen.getByText('icone')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="badge-indicator"]')).toHaveClass('absolute');
    });
});
