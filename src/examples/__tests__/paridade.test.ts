import * as Original from '@telefonica/mistica';
import {describe, expect, it} from 'vitest';

import * as Nosso from '@/components/mistica';
import {NOMES_ALTERNADOS} from '@/examples/lib/mistica';

/**
 * Garantia do drop-in: todo nome que os fluxos de exemplo usam atraves do
 * alternador precisa existir NAS DUAS libs com o mesmo nome. Se um export
 * nosso divergir do Mistica original, este teste quebra.
 */
describe('paridade de API com o Mistica original', () => {
    for (const nome of NOMES_ALTERNADOS) {
        it(`${nome} existe nas duas libs`, () => {
            expect(Nosso[nome as keyof typeof Nosso], `${nome} falta no nosso DS`).toBeDefined();
            expect(
                Original[nome as keyof typeof Original],
                `${nome} falta no @telefonica/mistica`
            ).toBeDefined();
        });
    }
});
