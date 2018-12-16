// Simple Micro Templating Function
export default (str, data) => {
  // Iterates through the keys in file object
  // and interpolate / replace {{key}} with it's value
  for (let k in data) {
    let exp = '{{' + k + '}}'
    let regex = new RegExp(exp, 'g')

    str = str.replace(regex, data[k])
  }

  // Assign the final result back into the contents field
  data.contents = Buffer.from(str) /* eslint-disable-line */

  return data
}

