import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import external from 'rollup-plugin-peer-deps-external';
import del from 'rollup-plugin-delete';
import pkg from './package.json';
import url from "rollup-plugin-url";
const svgr = require('@svgr/rollup').default

/**
 * This is what each configuration field stands for:
 *    -> input:
 *             The entry point to the component(s) we want to bundle.
 *             We are pointing directly to index.js which we have used to export the component.
 *    -> output:
 *             This specifies the directory where you want to save the bundled library.
 *             We are importing the output paths from package.json, which we will specify as the ./dist folder.
 *    -> plugins:
 *             This specifies all the plugins you wish to use and their respective configurations.
 *             For instance, external is asking rollup to exclude peerDependencies as part of the bundle
 *             as they will be imported separately by the app calling this package.
 *             We will also configure peerDependencies in the next step.
 */
export default {
    input: pkg.buildSource,
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'esm' }
    ],
    plugins: [
        external(),
        babel({
            exclude: 'node_modules/**'
        }),
        json(),
        del({ targets: ['dist/*'] }),
        url(),
        svgr()
    ],
    external: Object.keys(pkg.peerDependencies || {}),
};
