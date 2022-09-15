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
  config2.build.assetsInlineLimit = 1e8;
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
var config = {
  ui: {
    input: {
      main: path.resolve("/Users/river/dev/vuePool/starter-figma-vue", "index.html")
    },
    output: {
      entryFileNames: "assets/[name].js"
    }
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
var currentConfig = config[process.env.LIB_NAME];
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMvdml0ZV9idWlsZF9zaW5nbGVfZmlsZS5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnXG5pbXBvcnQgeyBOYWl2ZVVpUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgeyB2aXRlU2luZ2xlRmlsZSB9IGZyb20gJy4vdXRpbHMvdml0ZV9idWlsZF9zaW5nbGVfZmlsZSdcblxuY29uc3QgY29uZmlnID0ge1xuICAgIHVpOiB7XG4gICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICBtYWluOiBwYXRoLnJlc29sdmUoXCIvVXNlcnMvcml2ZXIvZGV2L3Z1ZVBvb2wvc3RhcnRlci1maWdtYS12dWVcIiwgJ2luZGV4Lmh0bWwnKSxcbiAgICAgICAgfSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0uanMnLFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICB9LFxuICAgIGhvb2s6IHtcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICAgIGZpZ21hOiBwYXRoLnJlc29sdmUoXCIvVXNlcnMvcml2ZXIvZGV2L3Z1ZVBvb2wvc3RhcnRlci1maWdtYS12dWVcIiwgJy4vZmlnbWEvY29kZS50cycpLFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgIGRpcjogcGF0aC5yZXNvbHZlKFwiL1VzZXJzL3JpdmVyL2Rldi92dWVQb29sL3N0YXJ0ZXItZmlnbWEtdnVlXCIsICcuLy5hcHBzY3JpcHQnKSxcbiAgICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnY29kZS5qcycsXG4gICAgICAgIH0sXG4gICAgfSxcbn07XG5cbmNvbnN0IGN1cnJlbnRDb25maWcgPSBjb25maWdbcHJvY2Vzcy5lbnYuTElCX05BTUVdO1xuXG5pZiAoY3VycmVudENvbmZpZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdMSUJfTkFNRSBpcyBub3QgZGVmaW5lZCBvciBpcyBub3QgdmFsaWQnKTtcbn1cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcmVzb2x2ZToge1xuICAgICAgICBhbGlhczoge1xuICAgICAgICAgICAgJ34vJzogYCR7cGF0aC5yZXNvbHZlKFwiL1VzZXJzL3JpdmVyL2Rldi92dWVQb29sL3N0YXJ0ZXItZmlnbWEtdnVlXCIsICdzcmMnKX0vYCxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgICAnaW1wb3J0Lm1ldGEudml0ZXN0JzogJ2ZhbHNlJyxcbiAgICB9LFxuICAgIHBsdWdpbnM6IHByb2Nlc3MuZW52LlRFU1RcbiAgICAgICAgPyBbXVxuICAgICAgICA6IFtcbiAgICAgICAgICAgIFZ1ZShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWN0aXZpdHlUcmFuc2Zvcm06IHRydWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFVub2NzcygpLFxuICAgICAgICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgICAgICAgICAgaW1wb3J0czogW1xuICAgICAgICAgICAgICAgICAgICAndnVlJyxcbiAgICAgICAgICAgICAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBkdHM6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICAgICAgICAgIHJlc29sdmVyczogW05haXZlVWlSZXNvbHZlcigpXSxcbiAgICAgICAgICAgICAgICBkdHM6IHRydWUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHZpdGVTaW5nbGVGaWxlKCksXG4gICAgICAgIF0sXG4gICAgYnVpbGQ6IHtcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAgICAgLi4uY3VycmVudENvbmZpZyxcbiAgICAgICAgICAgIGVtcHR5T3V0RGlyOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgfSxcbn0pXG4iLCAiLy8gVGhpcyBmaWxlIHRlbGxzIHZpdGUgY29uZmlnIHRoYXQgd2UgZG9uJ3Qgd2FudCBjb2RlIHNwbGl0dGluZ1xuY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgdXNlUmVjb21tZW5kZWRCdWlsZENvbmZpZzogdHJ1ZSxcbiAgcmVtb3ZlVml0ZU1vZHVsZUxvYWRlcjogZmFsc2UsXG59XG5leHBvcnQgZnVuY3Rpb24gdml0ZVNpbmdsZUZpbGUoe1xuICB1c2VSZWNvbW1lbmRlZEJ1aWxkQ29uZmlnID0gdHJ1ZSxcbiAgcmVtb3ZlVml0ZU1vZHVsZUxvYWRlciA9IGZhbHNlLFxufSA9IGRlZmF1bHRDb25maWcpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndml0ZTpzaW5nbGVmaWxlJyxcbiAgICBjb25maWc6IHVzZVJlY29tbWVuZGVkQnVpbGRDb25maWcgPyBfdXNlUmVjb21tZW5kZWRCdWlsZENvbmZpZyA6IHVuZGVmaW5lZCxcbiAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IHtcbiAgICAgIGVuZm9yY2U6ICdwb3N0JyxcbiAgICAgIHRyYW5zZm9ybShodG1sLCBjdHgpIHtcbiAgICAgICAgLy8gT25seSB1c2UgdGhpcyBwbHVnaW4gZHVyaW5nIGJ1aWxkXG4gICAgICAgIGlmICghY3R4IHx8ICFjdHguYnVuZGxlKVxuICAgICAgICAgIHJldHVybiBodG1sXG4gICAgICAgIC8vIEdldCB0aGUgYnVuZGxlXG4gICAgICAgIGZvciAoY29uc3QgWywgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGN0eC5idW5kbGUpKSB7XG4gICAgICAgICAgY29uc3QgbyA9IHZhbHVlXG4gICAgICAgICAgY29uc3QgYSA9IHZhbHVlXG4gICAgICAgICAgaWYgKG8uY29kZSkge1xuICAgICAgICAgICAgY29uc3QgcmVTY3JpcHQgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICBgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCJbXj5dKj9zcmM9XCJbXFwuL10qJHtvLmZpbGVOYW1lfVwiW14+XSo/Pjwvc2NyaXB0PmAsXG4gICAgICAgICAgICApXG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJzxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiPlxcbklOU0VSVF9KU1xcbjwvc2NyaXB0PidcbiAgICAgICAgICAgIGNvbnN0IGlubGluZWQgPSBodG1sLnJlcGxhY2UocmVTY3JpcHQsIF8gPT4gY29kZSlcbiAgICAgICAgICAgIGh0bWwgPSByZW1vdmVWaXRlTW9kdWxlTG9hZGVyXG4gICAgICAgICAgICAgID8gX3JlbW92ZVZpdGVNb2R1bGVMb2FkZXIoaW5saW5lZClcbiAgICAgICAgICAgICAgOiBpbmxpbmVkXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGEuZmlsZU5hbWUuZW5kc1dpdGgoJy5jc3MnKSkge1xuICAgICAgICAgICAgY29uc3QgcmVDU1MgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgICBgPGxpbmsgcmVsPVwic3R5bGVzaGVldFwiW14+XSo/aHJlZj1cIltcXC4vXSoke2EuZmlsZU5hbWV9XCJbXj5dKj8+YCxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSAnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPlxcbiBJTlNFUlRfQ1NTIFxcbjwvc3R5bGU+J1xuICAgICAgICAgICAgaHRtbCA9IGh0bWwucmVwbGFjZShyZUNTUywgXyA9PiBjb2RlKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUud2FybihgJHtjaGFsay55ZWxsb3coXCJXQVJOXCIpfSBhc3NldCBub3QgaW5saW5lZDogJHtjaGFsay5ncmVlbihhLmZpbGVOYW1lKX1gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGh0bWxcbiAgICAgIH0sXG4gICAgfSxcbiAgfVxufVxuLy8gT3B0aW9uYWxseSByZW1vdmUgdGhlIFZpdGUgbW9kdWxlIGxvYWRlciBzaW5jZSBpdCdzIG5vIGxvbmdlciBuZWVkZWQgYmVjYXVzZSB0aGlzIHBsdWdpbiBoYXMgaW5saW5lZCBhbGwgY29kZS5cbmNvbnN0IF9yZW1vdmVWaXRlTW9kdWxlTG9hZGVyID0gKGh0bWwpID0+IHtcbiAgY29uc3QgbWF0Y2ggPSBodG1sLm1hdGNoKFxuICAgIC8oPHNjcmlwdCB0eXBlPVwibW9kdWxlXCI+W1xcc1xcU10qKShjb25zdCAoXFxTKT1mdW5jdGlvblxcKFxcKVxce1tcXHNcXFNdKlxcfTtcXDNcXChcXCk7KS8sXG4gIClcbiAgLy8gR3JhY2VmdWwgZmFsbGJhY2sgaWYgVml0ZSB1cGRhdGVzIHRoZSBmb3JtYXQgb2YgdGhlaXIgbW9kdWxlIGxvYWRlciBpbiB0aGUgZnV0dXJlLlxuICBpZiAoIW1hdGNoIHx8IG1hdGNoLmxlbmd0aCA8IDMpXG4gICAgcmV0dXJuIGh0bWxcbiAgcmV0dXJuIGh0bWxcbiAgICAucmVwbGFjZShtYXRjaFsxXSwgJyAgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCI+JylcbiAgICAucmVwbGFjZShtYXRjaFsyXSwgJycpXG59XG4vLyBNb2RpZmllcyB0aGUgVml0ZSBidWlsZCBjb25maWcgdG8gbWFrZSB0aGlzIHBsdWdpbiB3b3JrIHdlbGwuXG5jb25zdCBfdXNlUmVjb21tZW5kZWRCdWlsZENvbmZpZyA9IChjb25maWcpID0+IHtcbiAgaWYgKCFjb25maWcuYnVpbGQpXG4gICAgY29uZmlnLmJ1aWxkID0ge31cbiAgLy8gRW5zdXJlcyB0aGF0IGV2ZW4gdmVyeSBsYXJnZSBhc3NldHMgYXJlIGlubGluZWQgaW4geW91ciBKYXZhU2NyaXB0LlxuICBjb25maWcuYnVpbGQuYXNzZXRzSW5saW5lTGltaXQgPSAxMDAwMDAwMDBcbiAgLy8gQXZvaWQgd2FybmluZ3MgYWJvdXQgbGFyZ2UgY2h1bmtzLlxuICBjb25maWcuYnVpbGQuY2h1bmtTaXplV2FybmluZ0xpbWl0ID0gMTAwMDAwMDAwXG4gIC8vIEVtaXQgYWxsIENTUyBhcyBhIHNpbmdsZSBmaWxlLCB3aGljaCBgdml0ZS1wbHVnaW4tc2luZ2xlZmlsZWAgY2FuIHRoZW4gaW5saW5lLlxuICBjb25maWcuYnVpbGQuY3NzQ29kZVNwbGl0ID0gZmFsc2VcbiAgLy8gQXZvaWRzIHRoZSBleHRyYSBzdGVwIG9mIHRlc3RpbmcgQnJvdGxpIGNvbXByZXNzaW9uLCB3aGljaCBpc24ndCByZWFsbHkgcGVydGluZW50IHRvIGEgZmlsZSBzZXJ2ZWQgbG9jYWxseS5cbiAgY29uZmlnLmJ1aWxkLnJlcG9ydENvbXByZXNzZWRTaXplID0gZmFsc2VcbiAgaWYgKCFjb25maWcuYnVpbGQucm9sbHVwT3B0aW9ucylcbiAgICBjb25maWcuYnVpbGQucm9sbHVwT3B0aW9ucyA9IHt9XG4gIGlmICghY29uZmlnLmJ1aWxkLnJvbGx1cE9wdGlvbnMub3V0cHV0KVxuICAgIGNvbmZpZy5idWlsZC5yb2xsdXBPcHRpb25zLm91dHB1dCA9IHt9XG4gIGNvbnN0IHVwZGF0ZU91dHB1dE9wdGlvbnMgPSAob3V0KSA9PiB7XG4gICAgLy8gRW5zdXJlIHRoYXQgYXMgbWFueSByZXNvdXJjZXMgYXMgcG9zc2libGUgYXJlIGlubGluZWQuXG4gICAgb3V0LmlubGluZUR5bmFtaWNJbXBvcnRzID0gZmFsc2VcbiAgfVxuICBpZiAoIUFycmF5LmlzQXJyYXkoY29uZmlnLmJ1aWxkLnJvbGx1cE9wdGlvbnMub3V0cHV0KSlcbiAgICB1cGRhdGVPdXRwdXRPcHRpb25zKGNvbmZpZy5idWlsZC5yb2xsdXBPcHRpb25zLm91dHB1dClcblxuICBlbHNlXG4gICAgY29uZmlnLmJ1aWxkLnJvbGx1cE9wdGlvbnMub3V0cHV0LmZvckVhY2godXBkYXRlT3V0cHV0T3B0aW9ucylcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxZQUFZLFVBQVU7QUFDdEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sWUFBWTtBQUNuQixTQUFTLHVCQUF1Qjs7O0FDUGhDLElBQU0sZ0JBQWdCO0FBQUEsRUFDcEIsMkJBQTJCO0FBQUEsRUFDM0Isd0JBQXdCO0FBQzFCO0FBQ08sU0FBUyxlQUFlO0FBQUEsRUFDN0IsNEJBQTRCO0FBQUEsRUFDNUIseUJBQXlCO0FBQzNCLElBQUksZUFBZTtBQUNqQixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixRQUFRLDRCQUE0Qiw2QkFBNkI7QUFBQSxJQUNqRSxvQkFBb0I7QUFBQSxNQUNsQixTQUFTO0FBQUEsTUFDVCxVQUFVLE1BQU0sS0FBSztBQUVuQixZQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7QUFDZixpQkFBTztBQUVULG1CQUFXLENBQUMsRUFBRSxLQUFLLEtBQUssT0FBTyxRQUFRLElBQUksTUFBTSxHQUFHO0FBQ2xELGdCQUFNLElBQUk7QUFDVixnQkFBTSxJQUFJO0FBQ1YsY0FBSSxFQUFFLE1BQU07QUFDVixrQkFBTSxXQUFXLElBQUk7QUFBQSxjQUNuQix3Q0FBeUMsRUFBRTtBQUFBLFlBQzdDO0FBQ0Esa0JBQU0sT0FBTztBQUNiLGtCQUFNLFVBQVUsS0FBSyxRQUFRLFVBQVUsT0FBSyxJQUFJO0FBQ2hELG1CQUFPLHlCQUNILHdCQUF3QixPQUFPLElBQy9CO0FBQUEsVUFDTixXQUNTLEVBQUUsU0FBUyxTQUFTLE1BQU0sR0FBRztBQUNwQyxrQkFBTSxRQUFRLElBQUk7QUFBQSxjQUNoQiwwQ0FBMkMsRUFBRTtBQUFBLFlBQy9DO0FBQ0Esa0JBQU0sT0FBTztBQUNiLG1CQUFPLEtBQUssUUFBUSxPQUFPLE9BQUssSUFBSTtBQUFBLFVBQ3RDLE9BQ0s7QUFBQSxVQUVMO0FBQUEsUUFDRjtBQUNBLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0sMEJBQTBCLENBQUMsU0FBUztBQUN4QyxRQUFNLFFBQVEsS0FBSztBQUFBLElBQ2pCO0FBQUEsRUFDRjtBQUVBLE1BQUksQ0FBQyxTQUFTLE1BQU0sU0FBUztBQUMzQixXQUFPO0FBQ1QsU0FBTyxLQUNKLFFBQVEsTUFBTSxJQUFJLDBCQUEwQixFQUM1QyxRQUFRLE1BQU0sSUFBSSxFQUFFO0FBQ3pCO0FBRUEsSUFBTSw2QkFBNkIsQ0FBQ0EsWUFBVztBQUM3QyxNQUFJLENBQUNBLFFBQU87QUFDVixJQUFBQSxRQUFPLFFBQVEsQ0FBQztBQUVsQixFQUFBQSxRQUFPLE1BQU0sb0JBQW9CO0FBRWpDLEVBQUFBLFFBQU8sTUFBTSx3QkFBd0I7QUFFckMsRUFBQUEsUUFBTyxNQUFNLGVBQWU7QUFFNUIsRUFBQUEsUUFBTyxNQUFNLHVCQUF1QjtBQUNwQyxNQUFJLENBQUNBLFFBQU8sTUFBTTtBQUNoQixJQUFBQSxRQUFPLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEMsTUFBSSxDQUFDQSxRQUFPLE1BQU0sY0FBYztBQUM5QixJQUFBQSxRQUFPLE1BQU0sY0FBYyxTQUFTLENBQUM7QUFDdkMsUUFBTSxzQkFBc0IsQ0FBQyxRQUFRO0FBRW5DLFFBQUksdUJBQXVCO0FBQUEsRUFDN0I7QUFDQSxNQUFJLENBQUMsTUFBTSxRQUFRQSxRQUFPLE1BQU0sY0FBYyxNQUFNO0FBQ2xELHdCQUFvQkEsUUFBTyxNQUFNLGNBQWMsTUFBTTtBQUFBO0FBR3JELElBQUFBLFFBQU8sTUFBTSxjQUFjLE9BQU8sUUFBUSxtQkFBbUI7QUFDakU7OztBRDFFQSxJQUFNLFNBQVM7QUFBQSxFQUNYLElBQUk7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNILE1BQVcsYUFBUSw4Q0FBOEMsWUFBWTtBQUFBLElBQ2pGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDSixnQkFBZ0I7QUFBQSxJQUNwQjtBQUFBLEVBRUo7QUFBQSxFQUNBLE1BQU07QUFBQSxJQUNGLE9BQU87QUFBQSxNQUNILE9BQVksYUFBUSw4Q0FBOEMsaUJBQWlCO0FBQUEsSUFDdkY7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNKLEtBQVUsYUFBUSw4Q0FBOEMsY0FBYztBQUFBLE1BQzlFLGdCQUFnQjtBQUFBLElBQ3BCO0FBQUEsRUFDSjtBQUNKO0FBRUEsSUFBTSxnQkFBZ0IsT0FBTyxRQUFRLElBQUk7QUFFekMsSUFBSSxrQkFBa0IsUUFBVztBQUM3QixRQUFNLElBQUksTUFBTSx5Q0FBeUM7QUFDN0Q7QUFDQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxNQUFNLEdBQVEsYUFBUSw4Q0FBOEMsS0FBSztBQUFBLElBQzdFO0FBQUEsRUFDSjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osc0JBQXNCO0FBQUEsRUFDMUI7QUFBQSxFQUNBLFNBQVMsUUFBUSxJQUFJLE9BQ2YsQ0FBQyxJQUNEO0FBQUEsSUFDRTtBQUFBLE1BQ0k7QUFBQSxRQUNJLHFCQUFxQjtBQUFBLE1BQ3pCO0FBQUEsSUFDSjtBQUFBLElBQ0EsT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsTUFDSjtBQUFBLE1BQ0EsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBLE1BQ1AsV0FBVyxDQUFDLGdCQUFnQixDQUFDO0FBQUEsTUFDN0IsS0FBSztBQUFBLElBQ1QsQ0FBQztBQUFBLElBQ0QsZUFBZTtBQUFBLEVBQ25CO0FBQUEsRUFDSixPQUFPO0FBQUEsSUFDSCxlQUFlO0FBQUEsTUFDWCxHQUFHO0FBQUEsTUFDSCxhQUFhO0FBQUEsSUFDakI7QUFBQSxFQUNKO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUEsRUFDVjtBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbImNvbmZpZyJdCn0K
