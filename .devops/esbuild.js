// eslint-disable-next-line import/no-extraneous-dependencies
import esbuild from 'esbuild';

await esbuild.build({
  external: ['react'],
  entryPoints: ['index.js'],
  outfile: 'bundle.js',
  format: 'esm',
  bundle: true,
  minify: true,
});
