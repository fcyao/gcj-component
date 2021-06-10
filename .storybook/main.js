/*
 * 2021-05-12 14:14:28
 * @LastEditTime: 2021-06-10 11:45:18
 * @FilePath: \gcj-manager-ui\.storybook\main.js
 * @Description:
 */


const path = require("path");
module.exports = {
  webpackFinal: async ( config ) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
      '@com': path.resolve(__dirname, '../src/components')
    };
    config.resolve.extensions.push(".ts", ".tsx");
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });
    return config;
  },
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
