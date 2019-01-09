const express = require('express');
const app = express();
const port = 3300;

var indexRouter = require('./routes/index');

app.use(express.static('public'));

app.use('/', indexRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))