import { transformFileSync } from 'babel-core';

// Extensions for `require` to accept jsx

// Runs babel transform
function babelCore(tooling = {}, module, filename) {
  let compiled = transformFileSync(filename, tooling).code;
  return module._compile(compiled, filename);
}

// Ignoring Files
function ignore() {
  return null;
}

export default {
  babelCore,
  ignore
};
