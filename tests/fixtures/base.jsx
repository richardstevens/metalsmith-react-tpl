import React from 'react';

const Test = React.createClass({
  render() {
    return (
      <html>
        <head>
          <title>Dummy title</title>
        </head>
        <body>
          <div id="content">{{contents}}</div>
        </body>
      </html>
    );
  }
});

export default Test;