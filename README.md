[![Build Status](https://travis-ci.org/richardstevens/metalsmith-react-tpl.svg?branch=master)](https://travis-ci.org/richardstevens/metalsmith-react-tpl)
[![Circle CI](https://circleci.com/gh/richardstevens/metalsmith-react-tpl/tree/master.svg?style=svg)](https://circleci.com/gh/richardstevens/metalsmith-react-tpl/tree/master)

# metalsmith-react-tpl
Use React in metalsmith as a templating language

## About
`metalsmith-react-tpl` is a [metalsmith](http://http://www.metalsmith.io/) plugin to render files using [React.js](http://http://facebook.github.io/react/) based templates. 



## Installation

```
npm install metalsmith-react-tpl
```

## CLI Usage

  Install the node modules and then add the `metalsmith-react-tpl` key to your `metalsmith.json` plugins. The simplest use case just requires the template engine you want to use:

```json
{
  "plugins": {
    "metalsmith-react-tpl": true
  }
}
```

  If you want to specify additional options, pass in an object:

```json
{
  "plugins": {
    "metalsmith-react-tpl": {
      "baseFile": "base.jsx",
      "isStatic": true,
      "directory": "templates"
    }
  }
}
```

## Javascript Usage

  Simplest use case:

```js
var templates = require('metalsmith-react-tpl');

metalsmith.use(templates());
```

  To specify additional options:

```js
metalsmith.use(templates({
  baseFile: 'base.html'
  isStatic: true,
  directory: 'templates'
}));
```


## Usage Notes

### Specifying Templates
If a `rtemplate` field is set in the `yaml` front-matter of your markdown files, `metalsmith-react-tpl` will use the specified template instead of `default.jsx`

You can also set `noConflict` to `false` and the plugin will use the `template` field instead of `rtemplate` field in the yaml front-matter.

### Webpack / Build Systems

If you import css or any other non-standard js code using 'require', 
you might want to make use of the `requireIgnoreExt` to ignore those files.



## Options

#### `baseFile` (optional)
default: `null`

You can pass in a .html or .jsx baseFile depending on your setup, using a react baseFile will allow you to continue using React even for your main layout template.

Using a .jsx baseFile will result in the baseFile.jsx to use `isStatic: false` and be rendered with ReactDOM.renderToString option and then will not have any reactid's passed through (Your templates will still go through the `isStatic` option).

Specifies a file which the contents of the react template will render into. 

This is similar to the index.html file which you ReactDOM.render() your components in.

In your base file, put `{{content}}` in the location where you want your data will render into.


#### `isStatic` (optional) 
default: `true`

Since this is a static site generator, by default, it will render the React Templates using `renderToStaticMarkup()`

However, you may choose to make a static site generator with React functionalities (similar to first render from server) and subsequently pull page routes via JavaScript / React.

Setting this parameter to `false` will cause templates to be parsed using `renderToString()`


#### `noConflict` (optional)
default: `true`

By default, this plugin will read from the `rtemplate` key in your yaml 
front-matter. However, if this is the only templating plugin, you may 
set `noConflict` to `false` to use the `template` key instead.


#### `directory` (optional) 
default: `templates`

Sets the directory which your react templates (or baseFile) resides.


#### `pattern` (optional)
default: `**/*`

Specifies a file filter pattern


#### `html` (optional)
default: `true`

Renames files from *.md to *.html


#### `preserve` (optional)
default: `false`

Stores a copy of un-templated contents into `rawContents` meta.


#### `requireIgnoreExt` (optional)
default: `[]`

A list of extensions to ignore. For example, `{requireIgnoreExt: ['.css']}` would 
ignore declarations like `require('file.css')`






