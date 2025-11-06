// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
//   {
//     ignores: [
//       "node_modules/**",
//       ".next/**",
//       "out/**",
//       "build/**",
//       "next-env.d.ts",
//     ],
//   },
// ];

// export default eslintConfig;


import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Resolve file path for ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create FlatCompat instance for extending ESLint configurations
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js core web vitals and TypeScript support
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    // Custom ESLint rules
    rules: {
      // Enable or disable specific ESLint rules
      "@typescript-eslint/no-explicit-any": "warn", // Example: Warn about explicit `any`
      "@typescript-eslint/explicit-module-boundary-types": "off", // Example: Disable enforcing function return types
    },

    // Ignore certain directories and files
    ignores: [
      "node_modules/**",    // Ignore node_modules
      ".next/**",           // Ignore Next.js build directory
      "out/**",             // Ignore Next.js export directory
      "build/**",           // Ignore build directories
      "next-env.d.ts",      // Ignore Next.js env types file
    ],
  },
];

export default eslintConfig;
