import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import autoPreprocess from "svelte-preprocess";
// import copyTo from "rollup-plugin-copy-assets-to";
import replace from "@rollup/plugin-replace";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import babel from "rollup-plugin-babel";
import rmdir from "rimraf";
import json from "@rollup/plugin-json";
import postcss from 'rollup-plugin-postcss';

rmdir("public/assets", function (error) {});

const production = !process.env.ROLLUP_WATCH;

const input = ["src/main.js"];

const watch = {
  clearScreen: false,
};

const plugins = [
  json(),

  // copyTo({
  //   assets: ["./src/assets"],
  //   outputDir: "public",
  // }),

  babel({
    runtimeHelpers: true,
  }),

  svelte({
    // enable run-time checks when not in production
    dev: !production,

    preprocess: autoPreprocess({
      postcss: true,
    }),

    // we'll extract any component CSS out into
    // a separate file - better for performance
    css: (css) => {
      css.write("public/assets/css/bundle.css");
    },
  }),
  postcss({
    extract: 'public/utils.css',
  }),

  // If you have external dependencies installed from
  // npm, you'll most likely need these plugins. In
  // some cases you'll need additional configuration -
  // consult the documentation for details:
  // https://github.com/rollup/plugins/tree/master/packages/commonjs
  resolve({
    browser: true,
    dedupe: ["svelte"],
  }),

  commonjs(),

  replace({
    "process.env.NODE_ENV": JSON.stringify(
      production ? "production" : "development"
    ),
  }),

  // In dev mode, call `npm run start` once
  // the bundle has been generated
  !production && serve(),

  // Watch the `public` directory and refresh the
  // browser on changes when not in production
  !production && livereload("public"),

  // If we're building for production (npm run build
  // instead of npm run dev), minify
  production && terser(),
];

const esExport = {
  input: input,
  output: [
    {
      sourcemap: true,
      format: "es",
      name: "app",
      dir: "public/assets/js/es/",
    },
  ],
  plugins: plugins,
  watch: watch,
};

const systemExport = {
  input: input,
  output: [
    {
      sourcemap: true,
      format: "system",
      name: "app",
      dir: "public/assets/js/system/",
    },
  ],
  plugins: plugins,
  watch: watch,
};

const listExports = [esExport];

if (production) listExports.push(systemExport);

export default listExports;

function serve() {
  let started = false;

  return {
    writeBundle() {
      if (!started) {
        started = true;

        require("child_process").spawn("npm", ["run", "start", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        });
      }
    },
  };
}
