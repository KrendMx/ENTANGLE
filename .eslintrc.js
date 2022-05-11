module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    globals: {
        JSX: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'next/core-web-vitals'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'no-param-reassign': ['error', { props: false }],
        'max-len': ['error', { code: 120 }],
        indent: ['error', 4],
        'no-unused-vars': 'warn',
        'react/no-unused-prop-types': ['off'],
        'react/function-component-definition': [
            2,
            {
                namedComponents: 'arrow-function',
                unnamedComponents: 'arrow-function',
            },
        ],
        quotes: ['error', 'single'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': 'off',
        'import/prefer-default-export': 'off',
        'react/destructuring-assignment': ['error', 'always'],
        'react/state-in-constructor': 'off',
        'react/forbid-prop-types': 'off',
        'react/no-danger': 'off',
        'react/require-default-props': 'off',
        'react/prop-types': 'off',
        'react/button-has-type': 'off',
        'no-async-promise-executor': 'off',
        'react/jsx-key': ['error', { checkFragmentShorthand: false }],
        'jsx-a11y/anchor-has-content': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        'no-return-assign': 'off',
        'react/no-array-index-key': 'off',
        'import/no-cycle': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'no-restricted-syntax': [
            'error',
            'ForInStatement',
            'LabeledStatement',
            'WithStatement',
        ],
        'global-require': 'off',
        'class-methods-use-this': 'off',
        'quote-props': 'off',
        'no-underscore-dangle': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
        'react/react-in-jsx-scope': 'off',
        'import/extensions': 'off',
        'no-shadow': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/consistent-type-imports': ['error'],
        '@typescript-eslint/no-explicit-any': 'off',
        'no-plusplus': 'off',
        'implicit-arrow-linebreak': 'off',
        'consistent-return': 'off',
        'no-nested-ternary': 'off',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
