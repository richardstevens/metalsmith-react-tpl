import debugCore from 'debug'

import fs from 'fs'
import multimatch from 'multimatch'
import path from 'path'

import { each } from 'async'
import objectAssign from 'object-assign'
import naiveTemplates from './naiveTemplates'
import renderReactTemplates from './renderReactTemplates'

const debug = debugCore('metalsmith-react-tpl')

// Plugin Exports
export default (options = {}) => {
  const {
    defaultTemplate = 'default.jsx',
    directory = 'templates',
    html = true,
    pattern = '**/*',
    preserve = false,
    noConflict = true,
    baseFileDirectory = null
  } = options

  let { baseFile = null } = options
  let originalBase = baseFile

  return (files, metalsmith, done) => {
    const metadata = metalsmith.metadata()

    each(multimatch(Object.keys(files), pattern), (file, callback) => {
      let data = files[file]

      // lets update the baseFile just for this one instance and reset later
      if (data.baseFile) {
        originalBase = baseFile
        baseFile = data.baseFile
      }

      // Prepare Props
      debug('Preparing Props: %s', file)
      let props = objectAssign({}, data, metadata, {
        contents: data.contents.toString()
      })

      // if opt.preserve is set
      // preserve the raw, not templated content
      if (preserve) {
        debug('Preserving untouched contents: %s', file)
        data.rawContents = data.contents
      }

      // Start Conversion Process
      debug('Starting conversion: %s', file)
      const templateKey = (noConflict) ? 'rtemplate' : 'template'
      const templatePath = metalsmith.path(directory, data[templateKey] || defaultTemplate)

      const { error, result } = renderReactTemplates(templatePath, props, options)

      if (error) {
        // lets reset baseFile before we exit
        if (data.baseFile) {
          baseFile = originalBase
        }
        return callback(error)
      }

      // Buffer back the result
      data.contents = Buffer.from(result)

      // If `baseFile` is specified,
      // insert content into the file.
      if (baseFile) {
        debug('Applying baseFile to contents: %s', file)
        const dir = baseFileDirectory || directory
        const baseFilePath = metalsmith.path(dir, baseFile)
        if (path.extname(baseFile) === '.jsx') {
          debug('Using JSX baseFile: %s', baseFile)
          props.children = result
          const newOptions = objectAssign({ }, options, {
            isStatic: true
          })
          const { error: err, result: results } = renderReactTemplates(baseFilePath, props, newOptions)
          if (err) {
            // lets reset baseFile before we exit
            if (data.baseFile) {
              baseFile = originalBase
            }
            return callback(err)
          }
          data.contents = results
        } else {
          const baseFileContent = fs.readFileSync(baseFilePath, 'utf8')
          data = naiveTemplates(baseFileContent, data)
        }
      }

      // if `html` is set
      // Rename markdown files to html
      if (html) {
        let fileDir = path.dirname(file)
        let fileName = path.basename(file, path.extname(file)) + '.html'

        if (fileDir !== '.') {
          fileName = fileDir + '/' + fileName
        }

        debug('Renaming file: %s -> %s', file, fileName)

        delete files[file]
        files[fileName] = data
      }

      // Complete
      debug('Saved file: %s', file)
      // lets reset baseFile before we exit
      if (data.baseFile) {
        baseFile = originalBase
      }
      callback()
    }, done) // Each
  } // Return
} // export
