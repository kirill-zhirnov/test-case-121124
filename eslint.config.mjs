import tsParser from '@typescript-eslint/parser';
import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			globals: {
				...globals.node
			}
		},
		rules: {
			semi: 'error',
			'@typescript-eslint/no-require-imports': 'off',
			quotes: ['error', 'single', { allowTemplateLiterals: true }],
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-explicit-any': 'off'
		}
	}
];