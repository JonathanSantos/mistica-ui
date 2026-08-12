import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {Button} from '@/components/ui/button';

describe('Button', () => {
    it('renderiza o conteudo', () => {
        render(<Button>Contratar</Button>);
        expect(screen.getByRole('button', {name: 'Contratar'})).toBeInTheDocument();
    });

    it('loading desabilita e marca aria-busy', () => {
        render(<Button loading>Enviar</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('loading mostra o loadingText no lugar do conteudo', () => {
        render(
            <Button loading loadingText="Enviando...">
                Enviar
            </Button>
        );
        expect(screen.getByText('Enviando...')).toBeInTheDocument();
        expect(screen.queryByText('Enviar')).not.toBeInTheDocument();
    });

    it('loading sem loadingText mantem o conteudo original', () => {
        render(<Button loading>Enviar</Button>);
        expect(screen.getByText('Enviar')).toBeInTheDocument();
    });

    it('asChild renderiza o elemento filho (ex: link)', () => {
        render(
            <Button asChild>
                <a href="/planos">Ver planos</a>
            </Button>
        );
        const link = screen.getByRole('link', {name: 'Ver planos'});
        expect(link).toHaveAttribute('href', '/planos');
    });
});
