import Inspector from "vite-plugin-inspect";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { sync } from "glob";

const noAttr = () => {
  return {
    transformIndexHtml(html) {
      return html.replaceAll(" crossorigin", "");
    }
  };
};

export default defineConfig({
  plugins: [
    tailwindcss(),
    noAttr(),
    Inspector()
  ],
  server: {
    open: "/index.html"
  },
  build: {
    rollupOptions: {
      input: sync("src/**/*.html".replace(/\\/g, "/")),
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name;
          if (/css/.test(extType)) {
            extType = "assets/css";
          }
          return assetInfo.originalFileName ?? `${extType}/[name][extname]`;
        },
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js"
      }
    },
    assetsInlineLimit: 0,
    emptyOutDir: true,
    outDir: "../dist"
  },
  root: "src",
  base: ""
});


