const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const { name, price, stock, user_id } = req.body;

    db.query(
        'INSERT INTO products (name, price, stock, user_id) VALUES (?, ?, ?, ?)',
        [name, price, stock, user_id],
        (err, result) => {
            res.send('Product added');
        }
    );
});

module.exports = router;
