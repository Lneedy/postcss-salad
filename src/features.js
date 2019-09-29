/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 14:47:44
 * @LastEditTime: 2019-08-09 16:28:03
 * @LastEditors: Please set LastEditors
 */
export default {
  /**
   * REMINDER:
   * ******************
   * order is important
   * ******************
   */
  // https://npmjs.com/package/saladcss-partial-import
  partialImport: options => require('postcss-partial-import')(options),
  customProperties: function customProperties(options) {
    if (!options) {
      options = {preserve: false}
    }
    return require('postcss-custom-properties')(options)
  },
  // https://npmjs.com/package/saladcss-bem
  bem: options => require('@lneedy/saladcss-bem')(options),
  // https://npmjs.com/package/precss
  precss: options => require('precss')(options),
  // postcss-sass-color-functions
  sassColor: options => require('postcss-color-function')(options),
  // https://npmjs.com/package/postcss-utils
  utils: options => require('postcss-utils')(options),
  // https://npmjs.com/package/postcss-calc
  calc: options => require('postcss-calc')(options),
  // https://npmjs.com/package/postcss-initial
  initial: options => require('postcss-initial')(options),
  // https://npmjs.com/package/postcss-inline-svg
  inlineSvg: options => require('postcss-inline-svg')(options),
  // https://npmjs.com/package/postcss-short
  short: options => require('postcss-short')(options),
  // https://npmjs.com/package/postcss-shape
  shape: options => require('postcss-shape')(options),
  // https://npmjs.com/package/pixrem
  rem: options => require('pixrem')(options),
  // https://npmjs.com/package/autoprefixer
  autoprefixer: options => require('autoprefixer')(options),
  // https://npmjs.com/package/postcss-neat
  neat: options => require('postcss-neat')(options)
}
