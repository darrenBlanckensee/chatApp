const path = require('path');
const express = require('express');
const port = 3000;

var app = express();

publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

// 
// app.get('/', (req, res) => {
//   res.render(publicPath);
// });


app.listen(port);
