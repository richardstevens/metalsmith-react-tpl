import React from 'react';

class Test extends React.Component {
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
}

export default Test;