const express = require('express');
const { connectDB } = require('./sequelize/db');
const authRouter = require('./routes/authRouter')
const courseRouter = require('./routes/courseRouter')
const categoryRouter = require('./routes/categoryRouter')

require("dotenv").config();
const app = express();
const port = 3000;
connectDB();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter)

app.listen (port, () => {

    console.log(`Le serveur a démarré et tourne sur le port ${port}.`);

});