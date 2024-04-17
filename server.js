const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 3000;


//add middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//add routes
const commentsRouter = require('./routes/comments');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

app.use('/api/comments', commentsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);



//-----------------------------------------------listen
app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
})