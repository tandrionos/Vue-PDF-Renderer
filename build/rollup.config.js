import commonjs from 'rollup-plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from 'rollup-plugin-buble'; // Transpile/polyfill with reasonable browser support
import { terser } from 'rollup-plugin-terser';
import webWorkerLoader from 'rollup-plugin-web-worker-loader';

export default {
    input: 'src/plugin.js', // Path relative to package.json
    output: {
        name: 'PdfRenderer',
        exports: 'named',
        globals: {
            'bowser': 'Bowser'
        },
    },
    external: [
        'bowser'
    ],
    plugins: [
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        buble(), // Transpile to ES5
        terser(),
        webWorkerLoader(),
    ],
};