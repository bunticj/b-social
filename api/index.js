const express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 3000,
    userRoutes = require('./router/user'),
    postRoutes = require('./router/post'),
    commentRoutes = require('./router/comment'),
    followRoutes = require('./router/follower')

app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);
app.use('/', followRoutes);

app.listen(port, () => console.log(`b-social api server listening on port ${port}`));