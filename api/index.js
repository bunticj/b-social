const express = require('express'),
logger = require('morgan'),
bodyParser = require('body-parser'),
port = process.env.PORT || 7000;

app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
extended: true
}));
app.use(bodyParser.json());

app.listen(port, () => console.log(`b-social api server listening on port ${port}`));