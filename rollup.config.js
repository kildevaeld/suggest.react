import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
    input: 'src/index.tsx',
    output: [{
        file: pkg.browser,
        format: 'umd',
        name: 'suggest',
        //dir: "./dist",
        globals: {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    }, {
        file: pkg.module,
        //dir: "./dist",
        format: 'es',
    }],
    external: [
        'react', 'react-dom',
    ],
    plugins: [
        //babel(),
        typescript({
            declaration: false,
            tsconfig: false,
            allowSyntheticDefaultImports: true,
            jsx: 'react',
        })
    ]
};