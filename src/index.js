import postcss from 'postcss'
import {isSupported} from 'caniuse-api'

import libraryFeatures from './features'
import featuresActivationMap from './features-activation-map'
import warnForDuplicates from './warn-for-duplicates'

const plugin = postcss.plugin('postcss-salad', options => {
  options = {
    console: console,
    warnForDuplicates: true,
    features: {},
    ...options
  }
  const features = options.features

  // copy browsers option to plugins that supports it
  const pluginsToPropagateBrowserOption = ['autoprefixer', 'rem']

  pluginsToPropagateBrowserOption.forEach(name => {
    const feature = features[name]

    if (feature !== false) {
      let objKey = name !== 'autoprefixer' ? 'browsers' : 'overrideBrowserslist'
      features[name] = {
        [objKey]:
          feature && feature[objKey] ? feature[objKey] : options[objKey],
        ...(feature || {})
      }
    }
  })

  if (
    features.autoprefixer &&
    features.autoprefixer.overrideBrowserslist === undefined
  ) {
    // delete features.autoprefixer.browsers
    features.autoprefixer.overrideBrowserslist = [
      'last 5 version',
      '> 10%',
      'maintained node versions',
      'not ie <= 8'
    ]
  }

  const processor = postcss()

  // features
  Object.keys(libraryFeatures).forEach(key => {
    // feature is auto enabled if: not disable && (enabled || no data yet ||
    // !supported yet)
    if (
      // feature is not disabled
      features[key] !== false &&
      // feature is enabled
      (features[key] === true ||
        // feature don't have any browsers data (yet)
        featuresActivationMap[key] === undefined ||
        // feature is not yet supported by the browsers scope
        (featuresActivationMap[key] &&
          featuresActivationMap[key][0] &&
          !isSupported(featuresActivationMap[key][0], options.browsers)))
    ) {
      const plugin = libraryFeatures[key](
        typeof features[key] === 'object' ? {...features[key]} : undefined
      )
      processor.use(plugin)
    }
  })

  if (options.warnForDuplicates) {
    processor.use(
      warnForDuplicates({
        keys: Object.keys(libraryFeatures),
        console: options.console
      })
    )
  }

  return processor
})

plugin.features = libraryFeatures

module.exports = plugin
