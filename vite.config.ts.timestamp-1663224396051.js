// vite.config.ts
import * as path from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
import Unocss from "unocss/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

// utils/vite_build_single_file.js
var defaultConfig = {
  useRecommendedBuildConfig: true,
  removeViteModuleLoader: false
};
function viteSingleFile({
  useRecommendedBuildConfig = true,
  removeViteModuleLoader = false
} = defaultConfig) {
  return {
    name: "vite:singlefile",
    config: useRecommendedBuildConfig ? _useRecommendedBuildConfig : void 0,
    transformIndexHtml: {
      enforce: "post",
      transform(html, ctx) {
        if (!ctx || !ctx.bundle)
          return html;
        for (const [, value] of Object.entries(ctx.bundle)) {
          const o = value;
          const a = value;
          if (o.code) {
            const reScript = new RegExp(
              `<script type="module"[^>]*?src="[./]*${o.fileName}"[^>]*?><\/script>`
            );
            const code = '<script type="module">\nINSERT_JS\n<\/script>';
            const inlined = html.replace(reScript, (_) => code);
            html = removeViteModuleLoader ? _removeViteModuleLoader(inlined) : inlined;
          } else if (a.fileName.endsWith(".css")) {
            const reCSS = new RegExp(
              `<link rel="stylesheet"[^>]*?href="[./]*${a.fileName}"[^>]*?>`
            );
            const code = '<style type="text/css">\n INSERT_CSS \n</style>';
            html = html.replace(reCSS, (_) => code);
          } else {
          }
        }
        return html;
      }
    }
  };
}
var _removeViteModuleLoader = (html) => {
  const match = html.match(
    /(<script type="module">[\s\S]*)(const (\S)=function\(\)\{[\s\S]*\};\3\(\);)/
  );
  if (!match || match.length < 3)
    return html;
  return html.replace(match[1], '  <script type="module">').replace(match[2], "");
};
var _useRecommendedBuildConfig = (config2) => {
  if (!config2.build)
    config2.build = {};
  config2.build.assetsInlineLimit = 1e13;
  config2.build.chunkSizeWarningLimit = 1e8;
  config2.build.cssCodeSplit = false;
  config2.build.reportCompressedSize = false;
  if (!config2.build.rollupOptions)
    config2.build.rollupOptions = {};
  if (!config2.build.rollupOptions.output)
    config2.build.rollupOptions.output = {};
  const updateOutputOptions = (out) => {
    out.inlineDynamicImports = false;
  };
  if (!Array.isArray(config2.build.rollupOptions.output))
    updateOutputOptions(config2.build.rollupOptions.output);
  else
    config2.build.rollupOptions.output.forEach(updateOutputOptions);
};

// vite.config.ts
import svg from "rollup-plugin-svg";
var config = {
  ui: {
    input: {
      main: path.resolve("/Users/river/dev/vuePool/starter-figma-vue", "index.html")
    },
    output: {
      entryFileNames: "assets/[name].js"
    },
    plugins: [
      svg()
    ]
  },
  hook: {
    input: {
      figma: path.resolve("/Users/river/dev/vuePool/starter-figma-vue", "./figma/code.ts")
    },
    output: {
      dir: path.resolve("/Users/river/dev/vuePool/starter-figma-vue", "./.appscript"),
      entryFileNames: "code.js"
    }
  }
};
var LIB_NAME = process.env.LIB_NAME || "ui";
var currentConfig = config[LIB_NAME];
if (currentConfig === void 0) {
  throw new Error("LIB_NAME is not defined or is not valid");
}
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve("/Users/river/dev/vuePool/starter-figma-vue", "src")}/`
    }
  },
  define: {
    "import.meta.vitest": "false"
  },
  plugins: process.env.TEST ? [] : [
    Vue(
      {
        reactivityTransform: true
      }
    ),
    Unocss(),
    AutoImport({
      imports: [
        "vue",
        "@vueuse/core"
      ],
      dts: true
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: true
    }),
    viteSingleFile()
  ],
  build: {
    assetsInlineLimit: 1e15,
    rollupOptions: {
      ...currentConfig,
      emptyOutDir: false
    }
  },
  server: {
    host: "0.0.0.0"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvdml0ZV9idWlsZF9zaW5nbGVfZmlsZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgeyBOYWl2ZVVpUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgeyB2aXRlU2luZ2xlRmlsZSB9IGZyb20gJy4vdXRpbHMvdml0ZV9idWlsZF9zaW5nbGVfZmlsZSdcbmltcG9ydCBzdmcgZnJvbSAncm9sbHVwLXBsdWdpbi1zdmcnXG5cbmNvbnN0IGNvbmZpZyA9IHtcbiAgICB1aToge1xuICAgICAgICBpbnB1dDoge1xuICAgICAgICAgICAgbWFpbjogcGF0aC5yZXNvbHZlKFwiL1VzZXJzL3JpdmVyL2Rldi92dWVQb29sL3N0YXJ0ZXItZmlnbWEtdnVlXCIsICdpbmRleC5odG1sJyksXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLmpzJyxcbiAgICAgICAgfSxcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgc3ZnKClcbiAgICAgICAgXVxuICAgICAgICBcbiAgICB9LFxuICAgIGhvb2s6IHtcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgIGZpZ21hOiBwYXRoLnJlc29sdmUoXCIvVXNlcnMvcml2ZXIvZGV2L3Z1ZVBvb2wvc3RhcnRlci1maWdtYS12dWVcIiwgJy4vZmlnbWEvY29kZS50cycpLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgIGRpcjogcGF0aC5yZXNvbHZlKFwiL1VzZXJzL3JpdmVyL2Rldi92dWVQb29sL3N0YXJ0ZXItZmlnbWEtdnVlXCIsICcuLy5hcHBzY3JpcHQnKSxcbiAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnY29kZS5qcycsXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmNvbnN0IExJQl9OQU1FID0gcHJvY2Vzcy5lbnYuTElCX05BTUUgfHwgJ3VpJztcbmNvbnN0IGN1cnJlbnRDb25maWcgPSBjb25maWdbTElCX05BTUVdO1xuXG5pZiAoY3VycmVudENvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdMSUJfTkFNRSBpcyBub3QgZGVmaW5lZCBvciBpcyBub3QgdmFsaWQnKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ34vJzogYCR7cGF0aC5yZXNvbHZlKFwiL1VzZXJzL3JpdmVyL2Rldi92dWVQb29sL3N0YXJ0ZXItZmlnbWEtdnVlXCIsICdzcmMnKX0vYCxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgICAnaW1wb3J0Lm1ldGEudml0ZXN0JzogJ2ZhbHNlJyxcbiAgICB9LFxuICAgIHBsdWdpbnM6IHByb2Nlc3MuZW52LlRFU1RcbiAgICAgICAgPyBbXVxuICAgICAgICA6IFtcbiAgICAgICAgICAgIFZ1ZShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWN0aXZpdHlUcmFuc2Zvcm06IHRydWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFVub2NzcygpLFxuICAgICAgICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgICAgICAgICAgaW1wb3J0czogW1xuICAgICAgICAgICAgICAgICAgICAndnVlJyxcbiAgICAgICAgICAgICAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBkdHM6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICAgICAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXSxcbiAgICAgICAgICAgICAgICBkdHM6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZpdGVTaW5nbGVGaWxlKCksXG4gICAgICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgYXNzZXRzSW5saW5lTGltaXQ6IDEwMDAwMDAwMDAwMDAwMDAsXG4gICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgICAgIC4uLmN1cnJlbnRDb25maWcsXG4gICAgICAgICAgICBlbXB0eU91dERpcjogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgaG9zdDogJzAuMC4wLjAnLFxuICAgIH0sXG59KVxuIiwgIi8vIFRoaXMgZmlsZSB0ZWxscyB2aXRlIGNvbmZpZyB0aGF0IHdlIGRvbid0IHdhbnQgY29kZSBzcGxpdHRpbmdcbmNvbnN0IGRlZmF1bHRDb25maWcgPSB7XG4gIHVzZVJlY29tbWVuZGVkQnVpbGRDb25maWc6IHRydWUsXG4gIHJlbW92ZVZpdGVNb2R1bGVMb2FkZXI6IGZhbHNlLFxufVxuZXhwb3J0IGZ1bmN0aW9uIHZpdGVTaW5nbGVGaWxlKHtcbiAgdXNlUmVjb21tZW5kZWRCdWlsZENvbmZpZyA9IHRydWUsXG4gIHJlbW92ZVZpdGVNb2R1bGVMb2FkZXIgPSBmYWxzZSxcbn0gPSBkZWZhdWx0Q29uZmlnKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZpdGU6c2luZ2xlZmlsZScsXG4gICAgY29uZmlnOiB1c2VSZWNvbW1lbmRlZEJ1aWxkQ29uZmlnID8gX3VzZVJlY29tbWVuZGVkQnVpbGRDb25maWcgOiB1bmRlZmluZWQsXG4gICAgdHJhbnNmb3JtSW5kZXhIdG1sOiB7XG4gICAgICBlbmZvcmNlOiAncG9zdCcsXG4gICAgICB0cmFuc2Zvcm0oaHRtbCwgY3R4KSB7XG4gICAgICAgIC8vIE9ubHkgdXNlIHRoaXMgcGx1Z2luIGR1cmluZyBidWlsZFxuICAgICAgICBpZiAoIWN0eCB8fCAhY3R4LmJ1bmRsZSlcbiAgICAgICAgICByZXR1cm4gaHRtbFxuICAgICAgICAvLyBHZXQgdGhlIGJ1bmRsZVxuICAgICAgICBmb3IgKGNvbnN0IFssIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhjdHguYnVuZGxlKSkge1xuICAgICAgICAgIGNvbnN0IG8gPSB2YWx1ZVxuICAgICAgICAgIGNvbnN0IGEgPSB2YWx1ZVxuICAgICAgICAgIGlmIChvLmNvZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlU2NyaXB0ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgYDxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiW14+XSo/c3JjPVwiW1xcLi9dKiR7by5maWxlTmFtZX1cIltePl0qPz48L3NjcmlwdD5gLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgY29uc3QgY29kZSA9ICc8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIj5cXG5JTlNFUlRfSlNcXG48L3NjcmlwdD4nXG4gICAgICAgICAgICBjb25zdCBpbmxpbmVkID0gaHRtbC5yZXBsYWNlKHJlU2NyaXB0LCBfID0+IGNvZGUpXG4gICAgICAgICAgICBodG1sID0gcmVtb3ZlVml0ZU1vZHVsZUxvYWRlclxuICAgICAgICAgICAgICA/IF9yZW1vdmVWaXRlTW9kdWxlTG9hZGVyKGlubGluZWQpXG4gICAgICAgICAgICAgIDogaW5saW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChhLmZpbGVOYW1lLmVuZHNXaXRoKCcuY3NzJykpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlQ1NTID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgYDxsaW5rIHJlbD1cInN0eWxlc2hlZXRcIltePl0qP2hyZWY9XCJbXFwuL10qJHthLmZpbGVOYW1lfVwiW14+XSo/PmAsXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj5cXG4gSU5TRVJUX0NTUyBcXG48L3N0eWxlPidcbiAgICAgICAgICAgIGh0bWwgPSBodG1sLnJlcGxhY2UocmVDU1MsIF8gPT4gY29kZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oYCR7Y2hhbGsueWVsbG93KFwiV0FSTlwiKX0gYXNzZXQgbm90IGlubGluZWQ6ICR7Y2hhbGsuZ3JlZW4oYS5maWxlTmFtZSl9YCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodG1sXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn1cbi8vIE9wdGlvbmFsbHkgcmVtb3ZlIHRoZSBWaXRlIG1vZHVsZSBsb2FkZXIgc2luY2UgaXQncyBubyBsb25nZXIgbmVlZGVkIGJlY2F1c2UgdGhpcyBwbHVnaW4gaGFzIGlubGluZWQgYWxsIGNvZGUuXG5jb25zdCBfcmVtb3ZlVml0ZU1vZHVsZUxvYWRlciA9IChodG1sKSA9PiB7XG4gIGNvbnN0IG1hdGNoID0gaHRtbC5tYXRjaChcbiAgICAvKDxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiPltcXHNcXFNdKikoY29uc3QgKFxcUyk9ZnVuY3Rpb25cXChcXClcXHtbXFxzXFxTXSpcXH07XFwzXFwoXFwpOykvLFxuICApXG4gIC8vIEdyYWNlZnVsIGZhbGxiYWNrIGlmIFZpdGUgdXBkYXRlcyB0aGUgZm9ybWF0IG9mIHRoZWlyIG1vZHVsZSBsb2FkZXIgaW4gdGhlIGZ1dHVyZS5cbiAgaWYgKCFtYXRjaCB8fCBtYXRjaC5sZW5ndGggPCAzKVxuICAgIHJldHVybiBodG1sXG4gIHJldHVybiBodG1sXG4gICAgLnJlcGxhY2UobWF0Y2hbMV0sICcgIDxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiPicpXG4gICAgLnJlcGxhY2UobWF0Y2hbMl0sICcnKVxufVxuLy8gTW9kaWZpZXMgdGhlIFZpdGUgYnVpbGQgY29uZmlnIHRvIG1ha2UgdGhpcyBwbHVnaW4gd29yayB3ZWxsLlxuY29uc3QgX3VzZVJlY29tbWVuZGVkQnVpbGRDb25maWcgPSAoY29uZmlnKSA9PiB7XG4gIGlmICghY29uZmlnLmJ1aWxkKVxuICAgIGNvbmZpZy5idWlsZCA9IHt9XG4gIC8vIEVuc3VyZXMgdGhhdCBldmVuIHZlcnkgbGFyZ2UgYXNzZXRzIGFyZSBpbmxpbmVkIGluIHlvdXIgSmF2YVNjcmlwdC5cbiAgY29uZmlnLmJ1aWxkLmFzc2V0c0lubGluZUxpbWl0ID0gMTAwMDAwMDAwMDAwMDBcbiAgLy8gQXZvaWQgd2FybmluZ3MgYWJvdXQgbGFyZ2UgY2h1bmtzLlxuICBjb25maWcuYnVpbGQuY2h1bmtTaXplV2FybmluZ0xpbWl0ID0gMTAwMDAwMDAwXG4gIC8vIEVtaXQgYWxsIENTUyBhcyBhIHNpbmdsZSBmaWxlLCB3aGljaCBgdml0ZS1wbHVnaW4tc2luZ2xlZmlsZWAgY2FuIHRoZW4gaW5saW5lLlxuICBjb25maWcuYnVpbGQuY3NzQ29kZVNwbGl0ID0gZmFsc2VcbiAgLy8gQXZvaWRzIHRoZSBleHRyYSBzdGVwIG9mIHRlc3RpbmcgQnJvdGxpIGNvbXByZXNzaW9uLCB3aGljaCBpc24ndCByZWFsbHkgcGVydGluZW50IHRvIGEgZmlsZSBzZXJ2ZWQgbG9jYWxseS5cbiAgY29uZmlnLmJ1aWxkLnJlcG9ydENvbXByZXNzZWRTaXplID0gZmFsc2VcbiAgaWYgKCFjb25maWcuYnVpbGQucm9sbHVwT3B0aW9ucylcbiAgICBjb25maWcuYnVpbGQucm9sbHVwT3B0aW9ucyA9IHt9XG4gIGlmICghY29uZmlnLmJ1aWxkLnJvbGx1cE9wdGlvbnMub3V0cHV0KVxuICAgIGNvbmZpZy5idWlsZC5yb2xsdXBPcHRpb25zLm91dHB1dCA9IHt9XG4gIGNvbnN0IHVwZGF0ZU91dHB1dE9wdGlvbnMgPSAob3V0KSA9PiB7XG4gICAgLy8gRW5zdXJlIHRoYXQgYXMgbWFueSByZXNvdXJjZXMgYXMgcG9zc2libGUgYXJlIGlubGluZWQuXG4gICAgb3V0LmlubGluZUR5bmFtaWNJbXBvcnRzID0gZmFsc2VcbiAgfVxuICBpZiAoIUFycmF5LmlzQXJyYXkoY29uZmlnLmJ1aWxkLnJvbGx1cE9wdGlvbnMub3V0cHV0KSlcbiAgICB1cGRhdGVPdXRwdXRPcHRpb25zKGNvbmZpZy5idWlsZC5yb2xsdXBPcHRpb25zLm91dHB1dClcblxuICBlbHNlXG4gICAgY29uZmlnLmJ1aWxkLnJvbGx1cE9wdGlvbnMub3V0cHV0LmZvckVhY2godXBkYXRlT3V0cHV0T3B0aW9ucylcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxZQUFZLFVBQVU7QUFDdEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sWUFBWTtBQUNuQixTQUFTLHVCQUF1Qjs7O0FDUGhDLElBQU0sZ0JBQWdCO0FBQUEsRUFDcEIsMkJBQTJCO0FBQUEsRUFDM0Isd0JBQXdCO0FBQzFCO0FBQ08sU0FBUyxlQUFlO0FBQUEsRUFDN0IsNEJBQTRCO0FBQUEsRUFDNUIseUJBQXlCO0FBQzNCLElBQUksZUFBZTtBQUNqQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixRQUFRLDRCQUE0Qiw2QkFBNkI7QUFBQSxJQUNqRSxvQkFBb0I7QUFBQSxNQUNsQixTQUFTO0FBQUEsTUFDVCxVQUFVLE1BQU0sS0FBSztBQUVuQixZQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7QUFDZixpQkFBTztBQUVULG1CQUFXLENBQUMsRUFBRSxLQUFLLEtBQUssT0FBTyxRQUFRLElBQUksTUFBTSxHQUFHO0FB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
