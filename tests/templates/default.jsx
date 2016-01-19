import React from 'react';

const Test = React.createClass({
  render() {
    return (
      <html>
        <head>
          <title>Dummy title</title>
        </head>
        <body>
          <div id="content">{this.props.children}</div>
        </body>
      </html>
    );
  }
});

export default Test;