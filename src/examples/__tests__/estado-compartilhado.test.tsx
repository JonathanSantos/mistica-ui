import {fireEvent, render, screen} from '@testing-library/react';
import {describe, expect, it} from 'vitest';

import {
    criarEscopo,
    EscopoDeEstado,
    InstanciaDeEstado,
    useState,
} from '@/examples/lib/estado-compartilhado';

/** Componente de teste que usa o useState do lab (mesma forma dos fluxos). */
function Contador({rotulo}: {rotulo: string}) {
    const [n, setN] = useState(0);
    return (
        <button type="button" onClick={() => setN((v) => v + 1)}>
            {rotulo}: {n}
        </button>
    );
}

describe('estado compartilhado (chave posicional)', () => {
    it('duas instancias no mesmo escopo espelham o estado', () => {
        const escopo = criarEscopo();
        render(
            <EscopoDeEstado escopo={escopo}>
                <InstanciaDeEstado>
                    <Contador rotulo="esquerda" />
                </InstanciaDeEstado>
                <InstanciaDeEstado>
                    <Contador rotulo="direita" />
                </InstanciaDeEstado>
            </EscopoDeEstado>
        );

        fireEvent.click(screen.getByText('esquerda: 0'));
        expect(screen.getByText('esquerda: 1')).toBeInTheDocument();
        expect(screen.getByText('direita: 1')).toBeInTheDocument();

        fireEvent.click(screen.getByText('direita: 1'));
        expect(screen.getByText('esquerda: 2')).toBeInTheDocument();
    });

    it('varias chamadas no mesmo componente mantem chaves independentes', () => {
        function Duplo() {
            const [a, setA] = useState('a');
            const [b, setB] = useState('b');
            return (
                <div>
                    <button type="button" onClick={() => setA('A')}>
                        primeiro: {a}
                    </button>
                    <button type="button" onClick={() => setB('B')}>
                        segundo: {b}
                    </button>
                </div>
            );
        }
        const escopo = criarEscopo();
        render(
            <EscopoDeEstado escopo={escopo}>
                <InstanciaDeEstado>
                    <Duplo />
                </InstanciaDeEstado>
            </EscopoDeEstado>
        );

        fireEvent.click(screen.getByText('primeiro: a'));
        expect(screen.getByText('primeiro: A')).toBeInTheDocument();
        expect(screen.getByText('segundo: b')).toBeInTheDocument();
    });

    it('sem providers degrada para useState local', () => {
        render(<Contador rotulo="solo" />);
        fireEvent.click(screen.getByText('solo: 0'));
        expect(screen.getByText('solo: 1')).toBeInTheDocument();
    });
});
