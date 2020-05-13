/*
 * @Description: In User Settings Edit
 * @Author: lneedy
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
  // partialImport: options => require('postcss-partial-import')(options),
  // // partialImport: options => require('postcss-import')(options),
  // mixins: options => require('postcss-mixins')(options),
  // customProperties: options => {
  //   if (!options) {
  //     options = {preserve: false}
  //   }
  //   return require('postcss-custom-properties')(options)
  // },
  conditionals: options => require('postcss-conditionals')(options),
  // bem: options => require('@lneedy/saladcss-bem')(options),
  // precss: options => require('precss')(options),
  // sassColor: options => require('postcss-color-function')(options),
  // utils: options => require('postcss-utils')(options),
  // calc: options => require('postcss-calc')(options),
  // initial: options => require('postcss-initial')(options),
  // inlineSvg: options => require('postcss-inline-svg')(options),
  // short: options => require('postcss-short')(options),
  // shape: options => require('postcss-shape')(options),
  // rem: options => require('pixrem')(options),
  // autoprefixer: options => require('autoprefixer')(options),
  // neat: options => require('postcss-neat')(options)
}
