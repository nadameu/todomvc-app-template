import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';

export default {
	input: 'src/index.ts',
	output: {
		format: 'es',
		file: 'dist/index.js'
	},
	plugins: [
		// replace({
		// 	'process.env.NODE_ENV': 'production'
		// }),
		typescript(),
		true &&
			terser({
				ecma: 8,
				compress: {
					global_defs: { process: { env: { NODE_ENV: 'production' } } },
					passes: 5,
					unsafe_arrows: true
				}

				// ,
				// output: { beautify: true }
			})
	]
};
