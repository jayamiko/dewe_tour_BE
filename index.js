require("dotenv").config();
const express = require('express')
const router = require('./src/routes/index')
const app = express()
const PORT = 5000;

app.use(express.json())
app.use('/api/v1/', router)

app.listen(PORT, () => {
    console.log(('Server Running on Port: ', PORT));
})