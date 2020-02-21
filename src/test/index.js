import tape from 'tape'
import {join} from 'path'
import plugin, {features} from '..'
import utils from './utils'
import postcss from 'postcss'

var featuresList = Object.keys(features)
var env = process.env.NODE_ENV || 'ALL'
switch (env) {
  case 'ALL':
    allTest()
    break
  case 'SIGHT':
    sigleTest()
    break
  case 'TAPALL':
    tapeAll()
    break
  case 'TAPSIGHT':
    tapeSigle()
    break
}
function sigleTest() {
  featuresList.forEach(name => {
    const input = utils.readFixture(join('features', name))
    const expected = utils.readFixture(join('features', name + '.expected'))
    // 检测
    let options = {features: {}}
    featuresList.forEach(name => {
      options.features[name] = false
    })

    options.features[name] = true

    postcss(plugin(options))
      .process(input, {from: undefined})
      .then(result => {
        let actual = result.css
        utils.write(
          utils.fixturePath(join('features', name + '.actual')),
          actual
        )
        if (actual.length > 0) {
          console.log(name, 'success!\n')
        }
      })
      .catch(e => {
        console.log(e)
      })
  })
}
// all features
function allTest() {
  const input = utils.readFixture(join('features', 'all'))
  let options = {features: {}}
  featuresList.forEach(function(name) {
    options.features[name] = true
  })

  options.features['partialImport'] = {root: 'src/test/features/'}
  postcss(plugin(options))
    .process(input, {from: undefined})
    .then(result => {
      let actual = result.css
      utils.write(
        utils.fixturePath(join('features', 'all' + '.actual')),
        actual
      )

      console.log('all success')
    })
    .catch(e => {
      console.log(e)
    })
}

function tapeTest(name = 'all', actual, expected) {
  tape(name, t => {
    t.equal(actual, expected)
    t.end()
  })
}

function tapeSigle() {
  featuresList.forEach(name => {
    const actual = utils.readFixture(join('features', name + '.actual'))
    const expected = utils.readFixture(join('features', name + '.expected'))
    tapeTest(name, actual, expected)
  })
}

function tapeAll() {
  let name = 'all'
  const actual = utils.readFixture(join('features', name + '.actual'))
  const expected = utils.readFixture(join('features', name + '.expected'))
  tapeTest(name, actual, expected)
}
