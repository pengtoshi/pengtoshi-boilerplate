const {
  utils: { getProjects },
} = require("@commitlint/config-nx-scopes");

const Configuration = {
  extends: ["git-commit-emoji", "@commitlint/config-nx-scopes"],
  rules: {
    //* Type
    "type-enum": [2, "always", ["✨ Feat", "🔨 Fix", "🍎 Chore", "🧪 Test", "🌊 Deploy", "🏗️ Refactor"]],
    "type-case": [2, "always", "start-case"],
    "type-empty": [2, "never"],

    //* Scope
    "scope-case": [2, "never", []],
    "scope-empty": [0],
    "scope-enum": async (ctx) => [2, "always", [...(await getProjects(ctx))]],

    //* Subject
    "subject-full-stop": [2, "never", "."],
    "subject-exclamation-mark": [2, "never", "!"],
    "subject-case": [2, "never", []],
    "subject-empty": [2, "never"],

    //* Body & Footer
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
  },

  prompt: {},
  ignores: [
    (message: string) =>
      message.startsWith("Merge") ||
      message.startsWith("Revert") ||
      message.startsWith("Amend") ||
      message.startsWith("Reset") ||
      message.startsWith("Rebase") ||
      message.startsWith("Tag"),
  ],
};

module.exports = Configuration;
