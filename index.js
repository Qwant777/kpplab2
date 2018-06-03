const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static('bull'));


app.listen(3000, function() {
  console.log('Started on http://localhost:3000');
});
