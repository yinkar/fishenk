import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/Firework.js',
  output: {
    file: 'dist/fishenk.min.js',
    format: 'es',
    name: 'Firework',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    terser({
      format: {
        comments: false,
      }
    })
  ]
};