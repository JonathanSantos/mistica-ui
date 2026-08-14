import * as React from 'react';

/**
 * Estado compartilhado entre os paineis do lado a lado.
 *
 * Pattern: store externo com CHAVE POSICIONAL de hook — o mesmo principio
 * do proprio React. Como os dois paineis renderizam o MESMO arquivo de
 * fluxo, as chamadas de useState acontecem na mesma ordem nas duas
 * instancias; a posicao da chamada (0, 1, 2...) identifica o valor no
 * store do fluxo. Digitar num painel atualiza o store, e o outro painel
 * re-renderiza via useSyncExternalStore.
 *
 * Sem providers por volta, o hook degrada para o React.useState comum —
 * o fluxo funciona identico fora do lab.
 */
type Escopo = {
    valores: Map<number, unknown>;
    ouvintes: Set<() => void>;
};

function criarEscopo(): Escopo {
    return {valores: new Map(), ouvintes: new Set()};
}

/** Um escopo por fluxo (compartilhado pelos dois paineis). */
const EscopoContext = React.createContext<Escopo | null>(null);

/** Um contador por instancia montada do fluxo (reinicia a cada montagem). */
const InstanciaContext = React.createContext<{contador: number} | null>(null);

function EscopoDeEstado({escopo, children}: {escopo: Escopo; children: React.ReactNode}) {
    return <EscopoContext.Provider value={escopo}>{children}</EscopoContext.Provider>;
}

function InstanciaDeEstado({children}: {children: React.ReactNode}) {
    const [instancia] = React.useState(() => ({contador: 0}));
    return <InstanciaContext.Provider value={instancia}>{children}</InstanciaContext.Provider>;
}

const assinarNada = () => () => {};

/**
 * Substituto do React.useState para os fluxos do lab: mesma assinatura,
 * mas com o valor num store compartilhado quando ha escopo por volta.
 */
function useState<T>(inicial: T | (() => T)): [T, React.Dispatch<React.SetStateAction<T>>] {
    const escopo = React.useContext(EscopoContext);
    const instancia = React.useContext(InstanciaContext);
    const compartilhado = Boolean(escopo && instancia);

    // fallback fora do lab (hooks sempre chamados, na mesma ordem)
    const local = React.useState(inicial);

    // Registro unico por call site (ref preguicosa, estavel no StrictMode):
    // a posicao da chamada dentro do componente vira a chave no store.
    const indiceRef = React.useRef<number | null>(null);
    if (indiceRef.current === null && escopo && instancia) {
        indiceRef.current = instancia.contador++;
        if (!escopo.valores.has(indiceRef.current)) {
            escopo.valores.set(indiceRef.current, inicial instanceof Function ? inicial() : inicial);
        }
    }
    const indice = indiceRef.current ?? -1;

    const valor = React.useSyncExternalStore(
        compartilhado
            ? (avisar) => {
                  escopo!.ouvintes.add(avisar);
                  return () => escopo!.ouvintes.delete(avisar);
              }
            : assinarNada,
        compartilhado ? () => escopo!.valores.get(indice) as T : () => undefined as T
    );

    const setValor = React.useCallback<React.Dispatch<React.SetStateAction<T>>>(
        (proximo) => {
            if (!escopo) {
                return;
            }
            const atual = escopo.valores.get(indice) as T;
            escopo.valores.set(indice, proximo instanceof Function ? proximo(atual) : proximo);
            for (const avisar of escopo.ouvintes) {
                avisar();
            }
        },
        [escopo, indice]
    );

    return compartilhado ? [valor, setValor] : local;
}

export {criarEscopo, EscopoDeEstado, InstanciaDeEstado, useState, type Escopo};
