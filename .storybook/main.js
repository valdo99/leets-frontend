const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    // "storybook-addon-next",
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: (config) => {
    /**
     * Add support for alias-imports
     * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
     */
    config.resolve.alias = {
      ...config.resolve?.alias,
      "@components": path.resolve(__dirname, "../src/components"),
      "@providers": path.resolve(__dirname, "../src/providers"),
      "@layouts": path.resolve(__dirname, "../src/layouts"),
      "@hooks": path.resolve(__dirname, "../src/hooks"),
      "@icons": path.resolve(__dirname, "../src/icons"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@api": path.resolve(__dirname, "../src/api"),
      "@state": path.resolve(__dirname, "../src/state"),
    };

    /* Fix issues with util package not being resolved */
    config.resolve.fallback = {
      ...config.resolve?.fallback,
      util: false,
    };

    /**
     * Add support for svgr
     */
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test(".svg")
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
