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
      // Converted sections always destructure t/ta/href and the h (hole values) object.
      "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^(t|ta|href|h|_.*)$", argsIgnorePattern: "^_" }],
    },
  },
  globalIgnores([".next/**", "out/**", "preview/**", "tools/**", "next-env.d.ts"]),
]);
