import {getVivoSkin} from '@telefonica/mistica';

/**
 * Customizacao de cor de marca em runtime, para os dois sistemas:
 * - nosso: sobrescreve as CSS vars --mistica-* derivadas da cor no <html>
 * - original: monta um Skin do Mistica com as cores sobrescritas
 */

export const COR_PADRAO = '#660099';

function hexParaRgb(hex: string): [number, number, number] {
    const h = hex.replace('#', '');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbParaHex(r: number, g: number, b: number): string {
    const c = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
    return `#${c(r)}${c(g)}${c(b)}`;
}

/** Mistura a cor com preto (fator negativo) ou branco (positivo). */
function misturar(hex: string, fator: number): string {
    const [r, g, b] = hexParaRgb(hex);
    const alvo = fator < 0 ? 0 : 255;
    const f = Math.abs(fator);
    return rgbParaHex(r + (alvo - r) * f, g + (alvo - g) * f, b + (alvo - b) * f);
}

function comAlpha(hex: string, alpha: number): string {
    const [r, g, b] = hexParaRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function derivadas(cor: string) {
    return {
        hover: misturar(cor, -0.12),
        pressed: misturar(cor, -0.3),
        clara: misturar(cor, 0.88),
        selecionada: comAlpha(cor, 0.08),
        darkAccent: misturar(cor, 0.2),
    };
}

const VARS_NOSSAS = (cor: string): Record<string, string> => {
    const d = derivadas(cor);
    return {
        'button-primary-background': cor,
        'button-primary-background-hover': d.hover,
        'button-primary-background-pressed': d.pressed,
        'control-activated': cor,
        'text-link': cor,
        'text-activated': cor,
        brand: cor,
        'background-brand': cor,
        'brand-low': d.clara,
        'background-selected': d.selecionada,
        'button-secondary-border': cor,
        'text-button-secondary': cor,
        'button-secondary-border-pressed': d.pressed,
        'text-button-secondary-pressed': d.pressed,
        'button-secondary-background-hover': d.selecionada,
        'button-secondary-background-pressed': d.clara,
        'button-link-background-pressed': d.clara,
        'loading-bar': cor,
        'toggle-android-background-active': d.clara,
    };
};

/** Aplica (ou remove, com null) a cor customizada no NOSSO sistema. */
export function aplicarCorNossa(cor: string | null): void {
    const style = document.documentElement.style;
    const vars = VARS_NOSSAS(cor ?? COR_PADRAO);
    for (const nome of Object.keys(vars)) {
        if (cor) {
            style.setProperty(`--mistica-${nome}`, vars[nome]);
        } else {
            style.removeProperty(`--mistica-${nome}`);
        }
    }
}

/**
 * Aplica a cor no Mistica ORIGINAL (build por CSS vars): sobrescreve a
 * paleta --mistica-vivo-* de que todos os tokens semanticos derivam.
 */
export function aplicarCorOriginal(cor: string | null): void {
    const style = document.documentElement.style;
    const mapa: Record<string, string | null> = cor
        ? {
              vivoPurple: cor,
              vivoPurpleDark: misturar(cor, -0.35),
              vivoPurpleLight90: misturar(cor, 0.1),
              vivoPurpleLight80: misturar(cor, 0.2),
              vivoPurpleLight50: misturar(cor, 0.5),
              vivoPurpleLight20: misturar(cor, 0.8),
              vivoPurpleLight10: misturar(cor, 0.88),
          }
        : {
              vivoPurple: null,
              vivoPurpleDark: null,
              vivoPurpleLight90: null,
              vivoPurpleLight80: null,
              vivoPurpleLight50: null,
              vivoPurpleLight20: null,
              vivoPurpleLight10: null,
          };
    for (const nome of Object.keys(mapa)) {
        const valor = mapa[nome];
        if (valor) {
            style.setProperty(`--mistica-vivo-${nome}`, valor);
        } else {
            style.removeProperty(`--mistica-vivo-${nome}`);
        }
    }
}

/** Monta o skin do Mistica ORIGINAL com a cor customizada (ou o vivo puro). */
export function skinMisticaComCor(cor: string | null) {
    const vivo = getVivoSkin();
    if (!cor) {
        return vivo;
    }
    const d = derivadas(cor);
    const overrides = {
        buttonPrimaryBackground: cor,
        buttonPrimaryBackgroundHover: d.hover,
        buttonPrimaryBackgroundPressed: d.pressed,
        controlActivated: cor,
        textLink: cor,
        textActivated: cor,
        brand: cor,
        backgroundBrand: cor,
        backgroundBrandTop: cor,
        backgroundBrandBottom: cor,
        brandLow: d.clara,
        backgroundSelected: d.selecionada,
        buttonSecondaryBorder: cor,
        textButtonSecondary: cor,
        buttonSecondaryBorderPressed: d.pressed,
        textButtonSecondaryPressed: d.pressed,
        buttonSecondaryBackgroundHover: d.selecionada,
        buttonSecondaryBackgroundPressed: d.clara,
        buttonLinkBackgroundPressed: d.clara,
        loadingBar: cor,
        toggleAndroidBackgroundActive: d.clara,
    };
    const darkOverrides = {
        buttonPrimaryBackground: d.darkAccent,
        controlActivated: d.darkAccent,
        textLink: misturar(cor, 0.35),
        textActivated: d.darkAccent,
        brand: d.darkAccent,
    };
    // O Mistica valida os overrides por caminho: so podemos passar chaves que
    // existem no skin (a recoloracao principal vem das CSS vars da paleta).
    const soChavesExistentes = <T extends Record<string, unknown>>(
        base: T,
        extra: Record<string, string>
    ): Record<string, string> =>
        Object.fromEntries(Object.entries(extra).filter(([chave]) => chave in base));

    const darkBase = vivo.darkModeColors ?? {};
    return {
        ...vivo,
        colors: {...vivo.colors, ...soChavesExistentes(vivo.colors, overrides)},
        darkModeColors: {...darkBase, ...soChavesExistentes(darkBase, darkOverrides)},
    };
}
