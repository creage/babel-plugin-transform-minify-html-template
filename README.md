# babel-plugin-transform-minify-html-template

A plugin for Babel 7 that removes whitespace and minifies html written using template strings

## Installation

```
$ npm install babel-plugin-transform-minify-html-template --save-dev
$ babel --plugins babel-plugin-transform-minify-html-template script.js
```

## Usage

All template strings tagged with the `html` tag will be minified and all unneeded white-space will be removed.

For instance:

```javascript
let html = html`
	<div>
		<section class="awesome">hi there!</section>
	</div>
`;
```

becomes:

```javascript
var html = "<div><section class=\"awesome\">hi there!<\/section><\/div>"
```

## License
Copyright (c) 2018 Aziz Gazanchiian. Released under the MIT license.

[npm-url]: https://npmjs.org/package/babel-plugin-transform-minify-html-template
[npm-image]: https://badge.fury.io/js/babel-plugin-transform-minify-html-template.svg
