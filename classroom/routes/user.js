const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All users');
});

router.get('/:id', (req, res) => {
    res.send('GET for user with id ');
});

router.post('/', (req, res) => {
    res.send('Create a new user');
});

router.delete('/:id', (req, res) => {
    res.send(`Delete user with id ${req.params.id}`);
});

module.exports = router;