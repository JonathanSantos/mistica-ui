import {describe, expect, it} from 'vitest';

import {formatCardNumber, formatExpiration} from '@/components/ui/credit-card-fields';
import {formatBrPhone} from '@/components/ui/phone-number-field';

describe('formatBrPhone', () => {
    it('formata celular com 11 digitos', () => {
        expect(formatBrPhone('11987654321')).toBe('(11) 98765-4321');
    });

    it('formata fixo com 10 digitos', () => {
        expect(formatBrPhone('1133334444')).toBe('(11) 3333-4444');
    });

    it('formata progressivamente enquanto digita', () => {
        expect(formatBrPhone('1')).toBe('(1');
        expect(formatBrPhone('11')).toBe('(11');
        expect(formatBrPhone('119')).toBe('(11) 9');
        expect(formatBrPhone('119876')).toBe('(11) 9876');
    });

    it('ignora nao-digitos e limita a 11 digitos', () => {
        expect(formatBrPhone('(11) 98765-4321 999')).toBe('(11) 98765-4321');
        expect(formatBrPhone('abc')).toBe('');
    });

    it('vazio permanece vazio', () => {
        expect(formatBrPhone('')).toBe('');
    });
});

describe('formatCardNumber', () => {
    it('agrupa em blocos de 4', () => {
        expect(formatCardNumber('4111111111111111')).toBe('4111 1111 1111 1111');
    });

    it('formata parciais sem espaco sobrando', () => {
        expect(formatCardNumber('41111')).toBe('4111 1');
        expect(formatCardNumber('4111')).toBe('4111');
    });

    it('limita a 19 digitos e remove nao-digitos', () => {
        expect(formatCardNumber('4111-1111-1111-1111-9999')).toBe('4111 1111 1111 1111 999');
    });
});

describe('formatExpiration', () => {
    it('insere a barra apos o mes', () => {
        expect(formatExpiration('1227')).toBe('12/27');
    });

    it('prefixa zero para mes que nao comeca com 0 ou 1', () => {
        expect(formatExpiration('827')).toBe('08/27');
        expect(formatExpiration('9')).toBe('09');
    });

    it('mes parcial nao ganha barra', () => {
        expect(formatExpiration('1')).toBe('1');
        expect(formatExpiration('12')).toBe('12');
    });

    it('remove nao-digitos', () => {
        expect(formatExpiration('12/27')).toBe('12/27');
    });
});
