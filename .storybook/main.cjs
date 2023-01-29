const { mergeConfig } = require("vite")
const jsconfigPaths = require("vite-jsconfig-paths").default

module.exports = {
    async viteFinal(config, { configType }) {
        return mergeConfig(config, {
            plugins: [jsconfigPaths()]
        })
    },
    "stories": [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "storybook-dark-mode"
    ],
    "framework": "@storybook/react",
    "core": {
        "builder": "@storybook/builder-vite"
    },
    "features": {
        "storyStoreV7": true
    }
}
