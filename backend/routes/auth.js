const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { name, email, password, role_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role_id],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send('User registered');
        }
    );
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).send(err);

        if (results.length === 0) return res.status(400).send('User not found');

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(400).send('Wrong password');

        res.json(user);
    });
});

module.exports = router;
