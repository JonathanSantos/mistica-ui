import {render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {ButtonDanger, ButtonLink, ButtonPrimary} from '@/components/ui/button';

describe('Botoes nomeados (API Mistica)', () => {
    it('renderiza o conteudo', () => {
        render(<ButtonPrimary onPress={() => {}}>Contratar</ButtonPrimary>);
        expect(screen.getByRole('button', {name: 'Contratar'})).toBeInTheDocument();
    });

    it('showSpinner desabilita e marca aria-busy', () => {
        render(
            <ButtonPrimary onPress={() => {}} showSpinner>
                Enviar
            </ButtonPrimary>
        );
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('showSpinner com loadingText troca o conteudo', () => {
        render(
            <ButtonPrimary onPress={() => {}} showSpinner loadingText="Enviando...">
                Enviar
            </ButtonPrimary>
        );
        expect(screen.getByText('Enviando...')).toBeInTheDocument();
        expect(screen.queryByText('Enviar')).not.toBeInTheDocument();
    });

    it('showSpinner sem loadingText mantem o conteudo original', () => {
        render(
            <ButtonDanger onPress={() => {}} showSpinner>
                Excluir
            </ButtonDanger>
        );
        expect(screen.getByText('Excluir')).toBeInTheDocument();
    });

    it('submit gera botao de submit', () => {
        render(<ButtonPrimary submit>Salvar</ButtonPrimary>);
        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('ButtonLink com href vira ancora', () => {
        render(<ButtonLink href="/ajuda">Ajuda</ButtonLink>);
        expect(screen.getByRole('link', {name: 'Ajuda'})).toHaveAttribute('href', '/ajuda');
    });
});
