#!/usr/bin/env python3
"""Gera CSS custom properties a partir dos design tokens do Mistica.

Uso: python3 scripts/generate-tokens.py [tokens/vivo.json] [src/styles/mistica-vivo.css]

Alem do formato oficial do mistica-design, o JSON pode ter chaves extras:
- "extends": "vivo.json"        herda tudo de outro arquivo (deep merge)
- "scope": "[data-skin=\"x\"]"  escopa os seletores (overlay em vez de :root)
- "density": {...}              sobrescreve as vars de densidade (alturas/paddings)
- "useMobileTypeOnDesktop": true  nao escala a tipografia no desktop (telas densas)

Fonte dos tokens: https://github.com/Telefonica/mistica-design/tree/production/tokens
"""

import json
import os
import re
import sys

TOKENS_FILE = sys.argv[1] if len(sys.argv) > 1 else "tokens/vivo.json"
OUT_FILE = sys.argv[2] if len(sys.argv) > 2 else "src/styles/mistica-vivo.css"

DESKTOP_BREAKPOINT = 1024  # mistica-web: desktopOrBigger = min-width 1024px

FONT_WEIGHTS = {"light": "300", "regular": "400", "medium": "500", "bold": "700"}

# Vars de densidade consumidas pelos componentes. Nao existem no JSON oficial do
# Mistica (la as alturas sao fixas nos componentes); aqui viram tokens para que
# skins compactos (ex: vivo-new-system) possam reduzir tudo de uma vez.
DENSITY_DEFAULTS = {
    "height-button": 48,
    "height-button-small": 32,
    "height-field": 56,
    "height-row": 72,
    "height-tabs": 56,
    "height-chip": 32,
    "height-tag": 28,
    "size-icon-button": 48,
    "size-icon-button-small": 40,
    "row-padding-y": 12,
    "table-cell-padding-y": 16,
    "menu-item-padding-y": 12,
}


def deep_merge(base, override):
    if not isinstance(base, dict) or not isinstance(override, dict):
        return override
    merged = dict(base)
    for key, value in override.items():
        merged[key] = deep_merge(base.get(key), value) if key in base else value
    return merged


def load_tokens(path):
    with open(path) as f:
        data = json.load(f)
    if "extends" in data:
        base = load_tokens(os.path.join(os.path.dirname(path), data["extends"]))
        data = deep_merge(base, {k: v for k, v in data.items() if k != "extends"})
    return data


def kebab(name: str) -> str:
    return re.sub(r"(?<=[a-z0-9])(?=[A-Z])", "-", name).lower()


def hex_to_rgb(hex_color: str) -> tuple:
    h = hex_color.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


def resolve(value, palette):
    """Resolve um valor de token ({palette.x}, rgba({palette.x}, a), gradiente ou literal)."""
    if isinstance(value, dict):  # gradiente {angle, colors: [{value, stop}]}
        stops = ", ".join(
            f"{resolve(c['value'], palette)} {round(c['stop'] * 100)}%" for c in value["colors"]
        )
        return f"linear-gradient({value['angle']}deg, {stops})"
    m = re.fullmatch(r"rgba\(\{palette\.(\w+)\}, ([\d.]+)\)", value)
    if m:
        r, g, b = hex_to_rgb(palette[m.group(1)]["value"])
        return f"rgba({r}, {g}, {b}, {m.group(2)})"
    m = re.fullmatch(r"\{palette\.(\w+)\}", value)
    if m:
        return palette[m.group(1)]["value"]
    return value


def radius_value(v: str) -> str:
    if v == "circle":
        return "50%"
    return v if str(v).endswith("%") else f"{v}px"


def spacing_var(tokens, name, side=None):
    """Extrai {mobile, desktop} de um token de spacing (com ou sem lados)."""
    token = tokens["spacing"][name]["value"]
    if side:
        token = token[side]
    return token["mobile"], token["desktop"]


def main():
    tokens = load_tokens(TOKENS_FILE)
    palette = tokens["global"]["palette"]
    scope = tokens.get("scope")
    mobile_type_on_desktop = tokens.get("useMobileTypeOnDesktop", False)
    density = deep_merge(DENSITY_DEFAULTS, tokens.get("density", {}))

    root_sel = scope or ":root"
    dark_sel = f"{scope}.dark" if scope else ".dark"

    out = []
    w = out.append

    w("/*")
    w(f" * GERADO AUTOMATICAMENTE por scripts/generate-tokens.py a partir de {TOKENS_FILE}.")
    w(" * Nao edite manualmente - rode o script novamente para atualizar.")
    if scope:
        w(f" * Skin overlay: aplicado quando o <html> tem o atributo {scope}.")
    w(" */")
    w("")

    # ---- root (light) ----
    w(f"{root_sel} {{")
    w("  color-scheme: light;")
    w("")
    w("  /* Cores (modo claro) */")
    for name, token in tokens["light"].items():
        w(f"  --mistica-{kebab(name)}: {resolve(token['value'], palette)};")
    w("")
    w("  /* Paleta bruta */")
    for name, token in palette.items():
        w(f"  --mistica-palette-{kebab(name)}: {token['value']};")
    w("")
    w("  /* Border radius por componente */")
    for name, token in tokens["radius"].items():
        w(f"  --mistica-radius-{kebab(name)}: {radius_value(token['value'])};")
    w("")
    w("  /* Densidade (alturas e paddings dos componentes) */")
    for name, value in density.items():
        w(f"  --mistica-{name}: {value}px;")
    w("")
    w("  /* Espacamentos derivados dos tokens de spacing (mobile) */")
    card_pad = spacing_var(tokens, "cardDefaultPadding", "top")
    btn_pad = spacing_var(tokens, "buttonDefaultPadding", "left")
    layout_margin = spacing_var(tokens, "responsiveLayoutMargin")
    w(f"  --mistica-card-padding: {card_pad[0]}px;")
    w(f"  --mistica-padding-x-button: {btn_pad[0]}px;")
    w(f"  --mistica-responsive-layout-margin: {layout_margin[0]}px;")
    w("")
    w("  /* Pesos de fonte por preset */")
    for name, token in tokens["text"]["weight"].items():
        w(f"  --mistica-text-weight-{kebab(name)}: {FONT_WEIGHTS[token['value']]};")
    w("")
    w("  /* Tamanhos de fonte por preset (mobile) */")
    for name, token in tokens["text"]["size"].items():
        w(f"  --mistica-text-size-{kebab(name)}: {token['value']['mobile']}px;")
    w("")
    w("  /* Line heights por preset (mobile) */")
    for name, token in tokens["text"]["lineHeight"].items():
        w(f"  --mistica-text-line-height-{kebab(name)}: {token['value']['mobile']}px;")
    w("}")
    w("")

    # ---- desktop ----
    device = "mobile" if mobile_type_on_desktop else "desktop"
    w(f"@media (min-width: {DESKTOP_BREAKPOINT}px) {{")
    w(f"  {root_sel} {{")
    w(f"    --mistica-card-padding: {card_pad[1]}px;")
    w(f"    --mistica-padding-x-button: {btn_pad[1]}px;")
    w(f"    --mistica-responsive-layout-margin: {layout_margin[1]}px;")
    w("")
    for name, token in tokens["text"]["size"].items():
        w(f"    --mistica-text-size-{kebab(name)}: {token['value'][device]}px;")
    w("")
    for name, token in tokens["text"]["lineHeight"].items():
        w(f"    --mistica-text-line-height-{kebab(name)}: {token['value'][device]}px;")
    w("  }")
    w("}")
    w("")

    # ---- dark ----
    w(f"{dark_sel} {{")
    w("  color-scheme: dark;")
    w("")
    for name, token in tokens["dark"].items():
        w(f"  --mistica-{kebab(name)}: {resolve(token['value'], palette)};")
    w("}")
    w("")

    # ---- @theme (somente no skin base; overlays reutilizam o mapeamento) ----
    if not scope:
        w("@theme inline {")
        w("  /* Cores mistica como classes Tailwind (ex: bg-mistica-button-primary-background) */")
        for name in tokens["light"]:
            k = kebab(name)
            w(f"  --color-mistica-{k}: var(--mistica-{k});")
        w("")
        w("  /* Radius mistica (ex: rounded-mistica-button) */")
        for name in tokens["radius"]:
            k = kebab(name)
            w(f"  --radius-mistica-{k}: var(--mistica-radius-{k});")
        w("}")
        w("")

    with open(OUT_FILE, "w") as f:
        f.write("\n".join(out))

    n_colors = len(tokens["light"])
    kind = f"overlay {scope}" if scope else "skin base"
    print(f"OK: {OUT_FILE} gerado ({kind}; {n_colors} cores light/dark, "
          f"{len(density)} vars de densidade, {len(tokens['text']['size'])} presets de texto)")


if __name__ == "__main__":
    main()
