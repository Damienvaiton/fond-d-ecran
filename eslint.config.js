import js from "@eslint/js";
import globals from "globals";

export default [
	{ ignores: ["node_modules/", "dist/"] },
	js.configs.recommended,
	{
		files: ["src/**/*.js"],
		languageOptions: { globals: globals.browser },
	},
	{
		files: ["scripts/**/*.mjs", "tests/**/*.js", "eslint.config.js"],
		languageOptions: { globals: globals.node },
	},
	{
		rules: {
			"no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
			eqeqeq: "error",
			"prefer-const": "error",
		},
	},
];
