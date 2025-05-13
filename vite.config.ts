import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    root: isDev ? "examples" : ".", // <--- Use examples as root only for dev
    plugins: [react()],
    resolve: {
      alias: {
        "@src": path.resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: "dist",
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "AutoSizeInputReact",
        fileName: (format) => `autosize-input-react.${format}.js`,
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
