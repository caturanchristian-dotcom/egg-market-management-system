const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
    const { user_id, total } = req.body;

    db.query(
        'INSERT INTO orders (user_id, total, status) VALUES (?, ?, "Pending")',
        [user_id, total],
        (err, result) => {
            res.send('Order placed');
        }
    );
});

module.exports = router;
