const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All posts');
});

router.get('/:id', (req, res) => {
    res.send('GET for post with id ');
});

router.post('/', (req, res) => {
    res.send('Create a new post');
});

router.delete('/:id', (req, res) => {
    res.send('Delete post with id ');
});

module.exports = router;