require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('connected to DB'));

app.use(express.json());

const userRouter = require('./routes/user');

app.use('/user', userRouter);

app.listen(3000, () => console.log('server is running'));