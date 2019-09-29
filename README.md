# Postcss-salad <img align="right" width="96" height="96" src="http://elemefe.github.io/postcss-salad/svg/logo.svg" title="salad logo" style="margin: -60px 30px 0 0;">

[![Build Status][travis-img]][travis]
[![Version][version]](https://github.com/lneedy/postcss-salad/blob/master/CHANGELOG.md)

> Postcss-salad 是一个基于 <a href="http://postcss.org/">PostCSS</a> 的 CSS 解决方案，它提供了一系列快捷的 at-rule 和默认语法声明来帮助你快速地搭建项目样式与类库，它只在调用时才输出代码，而不是直接提供 CSS 类库。<br>
> 沙拉不仅提供了下一代 css 语法支持，还提供了基础的 sass 的语法、属性顺时针简写、rem 填充、基础图形绘制、可定制样式的 inline-svg 以及 bem 类名自动转化等实用的功能。

### [Documents]

## Demo

**input:**

```css
/* short property */
.box {
  position: fixed 0 0 *;
}
/* utils */
.ellipsis2 {
  @utils-ellipsis 3;
}
/* shape */
.circle-a {
  circle: 50px #ff0;
}
```

**output:**

```css
.box {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.ellipsis2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.circle-a {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ff0;
}
```

## Usage

- [Node](#node)
- [PostCSS](#postcss)
- [Gulp](#gulp)
- [webpack](#webpack)

Add [Postcss salad] to your build tool:

```bash
npm install @lneedy/postcss-salad --save-dev
```

#### [Node](id:Node)

```js
require('@lneedy/postcss-salad').process(YOUR_CSS, {
  /* options */
})
```

#### [PostCSS](id:a-PostCSS)

Add [PostCSS] to your build tool:

```bash
# postcss >=^7.0.0
npm install postcss --save-dev
```

Load [Postcss salad] as a PostCSS plugin:

```js
postcss([
  require('@lneedy/postcss-salad')({
    /* options */
  })
]).process(YOUR_CSS /* options */)
```

#### [Gulp](id:Gulp)

Add [Gulp PostCSS]: to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Postcss salad] within your Gulpfile:

```js
var gulp = require('gulp')
var postcss = require('gulp-postcss')

gulp.task('css', function() {
  return gulp
    .src('./src/*.css')
    .pipe(
      postcss([
        require('@lneedy/postcss-salad')({
          /* options */
        })
      ])
    )
    .pipe(gulp.dest('.'))
})
```

#### [webpack](id:webpack)

```js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  postcss: function() {
    return [require('@lneedy/postcss-salad')]
  }
}
```

## options

沙拉里每一个特性都是依赖于对应的插件的，因此他们都有自己的配置。 你可以通过 features 属性类为每一个插件传入它的配置，假设某个特性传入的值为 false，则该特性会被关闭:

_example:_

```js
var options = {
  browser: ['ie > 8', 'last 2 version'],
  features: {
    bem: false, //pass boolean false can disable the plugin
    inlineSvg: {
      path: 'src/svgs'
    },
    customProperties: {
      preserve: false
    }
  }
}
```

### Plugins

Postcss-salad powered by the following plugins (in this order):

- [postcss-partial-import]: lets you use sugary @import statements in CSS, including glob-like and Sass-like behavior. It even lets you generates imports as a scaffolding tool.
- [postcss-custom-properties]: lets you use Custom Properties in CSS, following the CSS Custom Properties specification.
- [@lneedy/saladcss-bem]: postcss 7.0 implementing BEM as at-rules
- [precss]: a tool that allows you to use Sass-like markup in your CSS files
- [postcss-color-function]: plugin to transform CSS color function from editor draft of 'Color Module Level 4' specification to more compatible CSS.
- [postcss-utils]: help you create functional fragments quickly via at-rules.
- [postcss-calc]: plugin to reduce calc()
- [postcss-initial]: fallback initial keyword
- [postcss-inline-svg]: reference an SVG file and control its attributes with CSS syntax.
- [postcss-short]: lets you write styles more logically by extending shorthand properties in CSS.
- [postcss-shape]: draw basic shape with specified syntax in css rule
- [pixrem]: generates pixel fallbacks for rem units.
- [autoprefixer]: parse CSS and add vendor prefixes to CSS rules using values from Can I Use
- [postcss-neat]: a fluid grid framework built with the aim of being easy enough to use out of the box and flexible enough to customize down the road.
