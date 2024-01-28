// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Comments object
const commentsByPostId = {};

// Get request to get comments by postId
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// Post request to add comment
app.post('/posts/:id/comments', (req, res) => {
    // Generate random id for comment
    const commentId = randomBytes(4).toString('hex');
    // Get the comment content
    const { content } = req.body;

    // Get the comments array for the post
    const comments = commentsByPostId[req.params.id] || [];
    // Add the new comment to the comments array
    comments.push({ id: commentId, content });
    // Add the comments array back to the comments object
    commentsByPostId[req.params.id] = comments;
    // Send the new comment
    res.status(201).send(comments);
});

// Start the server
app.listen(4001, () => {
    console.log('Listening on 4001');
});