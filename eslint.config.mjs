import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Logos and illustrations are SVGs served as-is; next/image adds nothing there.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "out/**", "preview/**", "tools/**", "next-env.d.ts"]),
]);
