import React from 'react'
import ReactDOM from 'react-dom/server'
import '@babel/register'

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
    let code = require(templatePath) /* eslint-disable-line */
    if (code.hasOwnProperty('default')) code = code.default
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

