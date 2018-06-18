import React from 'react'
import ReactDOM from 'react-dom/server'
import { dirname, join } from 'path'
import { transformFileSync } from 'babel-core'
import { babelCore } from './requireTools'

// Ensure .jsx transformation
if (!require.extensions['.jsx']) {
  require.extensions['.jsx'] = babelCore.bind(null, {})
}

function requireFromString (src, filename) {
  var Module = module.constructor
  var m = new Module(filename, module.parent)
  m.paths = Module._nodeModulePaths(dirname(filename))
  m.paths.push(join(dirname(filename)))
  m.filename = filename
  m._compile(src, filename)
  return m.exports
}

// Main rendering function for React
export default (templatePath, props = {}, options = {}) => {
  try {
    // Option for isStatic rendering
    // False if we want to do a static first load
    // but dynamic interation subsequently.
    // i.e. React Server side rendering style
    const isStatic = (options.isStatic !== void 0) ? options.isStatic : true

    // Initialize the template as a factory
    // and apply the options into the factory.
    let code = transformFileSync(templatePath, {}).code
    code = requireFromString(code, templatePath)
    const component = React.createElement(code, props)

    let content = ''

    if (isStatic) {
      // renderToStaticMarkup (React ids removed)
      content = ReactDOM.renderToStaticMarkup(component)
    } else {
      // renderToString (with React ids)
      content = ReactDOM.renderToString(component)
    }

    return { error: null, result: content }
  } catch (error) {
    return { error, result: null }
  }
}

