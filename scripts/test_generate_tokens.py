#!/usr/bin/env python3
"""Testes do generator de tokens. Rode: python3 scripts/test_generate_tokens.py"""

import importlib.util
import os
import unittest

spec = importlib.util.spec_from_file_location(
    "generate_tokens", os.path.join(os.path.dirname(__file__), "generate-tokens.py")
)
gt = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gt)

PALETTE = {
    "vivoPurple": {"value": "#660099"},
    "grey6": {"value": "#000000"},
}


class TestKebab(unittest.TestCase):
    def test_camel_case(self):
        self.assertEqual(gt.kebab("backgroundAlternative"), "background-alternative")

    def test_numbers_stay_attached(self):
        self.assertEqual(gt.kebab("text1"), "text1")

    def test_consecutive_capitals(self):
        self.assertEqual(gt.kebab("iosControlKnob"), "ios-control-knob")


class TestResolve(unittest.TestCase):
    def test_palette_reference(self):
        self.assertEqual(gt.resolve("{palette.vivoPurple}", PALETTE), "#660099")

    def test_rgba_reference(self):
        self.assertEqual(
            gt.resolve("rgba({palette.vivoPurple}, 0.12)", PALETTE),
            "rgba(102, 0, 153, 0.12)",
        )

    def test_gradient(self):
        value = {
            "angle": 180,
            "colors": [
                {"value": "rgba({palette.grey6}, 0)", "stop": 0},
                {"value": "rgba({palette.grey6}, 0.7)", "stop": 1},
            ],
        }
        self.assertEqual(
            gt.resolve(value, PALETTE),
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%)",
        )

    def test_literal_passthrough(self):
        self.assertEqual(gt.resolve("#FFFFFF", PALETTE), "#FFFFFF")


class TestRadius(unittest.TestCase):
    def test_circle_becomes_percent(self):
        self.assertEqual(gt.radius_value("circle"), "50%")

    def test_number_gains_px(self):
        self.assertEqual(gt.radius_value("32"), "32px")


class TestDeepMerge(unittest.TestCase):
    def test_override_wins(self):
        base = {"a": {"b": 1, "c": 2}, "d": 3}
        override = {"a": {"b": 9}}
        merged = gt.deep_merge(base, override)
        self.assertEqual(merged, {"a": {"b": 9, "c": 2}, "d": 3})
        # base nao e mutado
        self.assertEqual(base["a"]["b"], 1)

    def test_non_dict_replaces(self):
        self.assertEqual(gt.deep_merge({"a": 1}, {"a": [1, 2]}), {"a": [1, 2]})


class TestLoadTokens(unittest.TestCase):
    def test_extends_merges_base(self):
        path = os.path.join(os.path.dirname(__file__), "..", "tokens", "vivo-new-system.json")
        tokens = gt.load_tokens(path)
        # herda as cores do vivo.json
        self.assertIn("light", tokens)
        self.assertIn("buttonPrimaryBackground", tokens["light"])
        # mantem os overrides proprios
        self.assertEqual(tokens["scope"], '[data-skin="vivo-new-system"]')
        self.assertEqual(tokens["density"]["height-button"], 36)
        # spacing sobrescrito
        card = tokens["spacing"]["cardDefaultPadding"]["value"]["top"]
        self.assertEqual(card, {"mobile": 12, "desktop": 12})


if __name__ == "__main__":
    unittest.main()
