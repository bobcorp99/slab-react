module.exports = function override(config, env) {
  config.output = {
    ...config.output,
    filename: 'assets/js/[name].index_bundle.js',
    chunkFilename: 'assets/js/[name].index_bundle.js',
  }

  config.plugins.map((plugin, i) => {
    if (plugin.options && plugin.options.filename) {
      config.plugins[i].options = {
        ...config.plugins[i].options,
        filename: 'assets/css/index_bundle.css',
        chunkFilename: 'assets/css/index_bundle.css',
      }
    }
  })
  console.log('Additional config was applied through config-overrides.js')
  return config
}
