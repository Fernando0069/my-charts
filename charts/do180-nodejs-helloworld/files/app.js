var express = require('express');
app = express();

app.get('/', function (req, res) {
  res.send(`
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World</h1>
        <p>Hello World!</p>
        <p>Running on Node.js version: <strong>${process.version}</strong></p>
      </body>
    </html>
  `);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});