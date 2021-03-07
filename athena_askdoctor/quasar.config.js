build: {
  extendWebpack (cfg, { isServer, isClient })
  {
    cfg.module.rules.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /(node_modules|quasar)/
    })
  }
}
