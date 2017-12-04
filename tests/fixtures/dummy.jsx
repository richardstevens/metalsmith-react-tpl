import React from 'react'

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

export default Test
