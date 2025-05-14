import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    root: isDev ? "examples" : ".",
    plugins: [
      react(),
      !isDev &&
        dts({
          insertTypesEntry: true,
          outDir: "dist/types",
        }),
    ],
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: "dist",
      lib: {
        entry: path.resolve(__dirname, "src/AutoSizeInput.tsx"),
        name: "AutoSizeInputReact",
        fileName: (format) => `autosize-input-react.${format}.js`,
        formats: ["es", "cjs", "umd"],
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  };
});
