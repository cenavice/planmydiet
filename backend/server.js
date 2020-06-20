const express = require('express');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(session({
    secret: 'tesa',
    resave: true,
    saveUninitialized: true
}));

const fatsecretRouter = require('./routes/fatsecret');

app.use('/fatsecret', fatsecretRouter);

