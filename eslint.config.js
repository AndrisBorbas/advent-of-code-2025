import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import {
	configs as tsConfigs,
	parser as tsParser,
	plugin as tsPlugin,
} from "typescript-eslint";

export default [
	{
		ignores: ["node_modules", "**/gen/**"],
	},
	eslint.configs.recommended,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	...tsConfigs.recommendedTypeChecked,
	...tsConfigs.stylisticTypeChecked,
	{
		name: "typescript-definitions",
		files: ["**/*.d.ts"],
		rules: {
			"@typescript-eslint/consistent-type-definitions": "off", // Allow interface definitions in .d.ts files
		},
	},
	{
		name: "test",
		files: [
			"**/*.test.{js,jsx,ts,tsx}",
			"**/*.spec.{js,jsx,ts,tsx}",
			"**/*test*/**/*.{js,jsx,ts,tsx}",
		],
		rules: {
			"@typescript-eslint/no-empty-function": "off", // Tests often use empty functions
			"@typescript-eslint/no-explicit-any": "off", // Tests often use `any` for flexibility
		},
	},
	eslintConfigPrettier,
];
