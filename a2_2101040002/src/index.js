const express = require('express');

const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('a1_2101040002'));

route(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });