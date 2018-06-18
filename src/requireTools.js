import { transformFileSync } from 'babel-core'
import { basename } from 'path'
import debugCore from 'debug'

const debug = debugCore('metalsmith-react-tpl')

// Runs babel transform
function babelCore (tooling = {}, module, filename) {
  var compiled = transformFileSync(filename, tooling).code

  var startTime = new Date()
  var code = module._compile(compiled, filename)
  debug('%sms \t- Finished %s', (new Date() - startTime), basename(filename))
  return code
}

// Ignoring Files
function ignore () {
  return null
}

export default {
  babelCore,
  ignore
}
