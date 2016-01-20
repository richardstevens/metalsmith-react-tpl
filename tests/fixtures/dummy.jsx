import React from 'react';

const Test = React.createClass({
  getDefaultProps() {
    return {
      text: 'foo bar'
    }
  },
  
  render() {
    const { text } = this.props;
    
    return (
      <div>
        <h1>{ text }</h1>
      </div>
    );
  }
});

export default Test;