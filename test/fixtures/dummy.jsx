const React = require('react')

class Test extends React.Component {
  render () {
    const { text } = this.props

    return (
      <div>
        <h1>{ text }</h1>
      </div>
    )
  }
}

Test.defaultProps = {
  text: 'foo bar'
}

module.exports = Test
