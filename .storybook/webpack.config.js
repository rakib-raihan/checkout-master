module.exports = function ({ config }) {
  config.module.rules.unshift({
    test: /\.story\.js?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  })

  return config
}
