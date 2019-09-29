import tape from 'tape'
import {join} from 'path'
import plugin, {features} from '..'
import utils from './utils'
import postcss from 'postcss'

var featuresList = Object.keys(features)

// disable all features
featuresList.forEach(function(name) {
  const input = utils.readFixture(join('features', name))
  const expected = utils.readFixture(join('features', name + '.expected'))
  let options = {features: {}}
  featuresList.forEach(function(name) {
    options.features[name] = false
  })

  options.features[name] = true

  postcss(plugin(options))
    .process(input, {from: undefined})
    .then(result => {
      let actual = result.css

      utils.write(utils.fixturePath(join('features', name + '.actual')), actual)
      // console.log(27)
      tape(name, t => {
        t.equal(actual, expected)
        t.end()
      })
    })
    .catch(e => {
      console.log(e)
    })
})
// all features
// const input = utils.readFixture(join('features', 'all'))
// const expected = utils.readFixture(join('features', 'all' + '.expected'))
// let options = {features: {}}
// featuresList.forEach(function(name) {
//   options.features[name] = true
// })
// postcss(plugin(options))
//   .process(input, {from: undefined})
//   .then(result => {
//     let actual = result.css

//     utils.write(utils.fixturePath(join('features', 'all' + '.actual')), actual)
//     // console.log(27)
//     tape('all', t => {
//       t.equal(actual, expected)
//       t.end()
//     })
//   })
//   .catch(e => {
//     console.log(e)
//   })
