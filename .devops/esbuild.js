// eslint-disable-next-line import/no-extraneous-dependencies
import esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['index.js'],
  outfile: 'bundle.js',
  external: ['react'],
  jsx: 'automatic',
  format: 'esm',
  bundle: true,
  minify: true,
});
