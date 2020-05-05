import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/index.tsx',
    output: [{
        file: pkg.browser,
        format: 'cjs',
        name: 'suggest',
        //dir: "./dist",
        // globals: {
        //     'react': 'React',
        //     'react-dom': 'ReactDOM',

        // }
    }, {
        file: pkg.module,
        //dir: "./dist",
        format: 'es',
    }],
    external: [
        'react', 'react-dom', 'use-scroll-lock'
    ],
    plugins: [
        babel({
            babelHelpers: 'bundled'
        }),
        typescript({
            declaration: false,
            tsconfig: false,
            allowSyntheticDefaultImports: true,
            jsx: 'react',
        })
        // resolve({
        //     mainFields:
        // }),
        // commonjs(),
    ]
};