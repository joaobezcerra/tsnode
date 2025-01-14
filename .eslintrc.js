module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest", // Use "latest" para a versão mais recente
    sourceType: "module",
    project: "./tsconfig.json", // Adicione o caminho para o tsconfig.json
  },
  env: {
    browser: true, // Se você estiver usando no navegador
    node: true,    // Adicione node se você estiver usando no Node.js
    es2021: true,   // Ou "es2020", "es2019" etc., ou "latest"
  },
  plugins: ["@typescript-eslint", "prettier"], // Adicione "prettier" como plugin
  extends: [
    "eslint:recommended", // Comece com as regras recomendadas do ESLint
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked", // Regras com verificação de tipo (requer `project` no `parserOptions`)
    "plugin:prettier/recommended", // Integração com Prettier. Deve vir por último.
    "standard", // Ou "airbnb-base", "google" etc., se preferir outro guia de estilo
  ],
  rules: {
    // Adicione suas regras personalizadas aqui
    "@typescript-eslint/no-unused-vars": "warn", // ou "error"
    "no-unused-vars": "off", // Desativa a regra padrão do ESLint, pois a do TS é melhor
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  },
};
