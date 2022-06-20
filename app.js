require('dotenv').config()
const express = require("express");
const nodemailer =require ("nodemailer");
const request =require ("request");
const bodyParser = require("body-parser");
const path = require('path');
// const ethercon = require("ethercon")

const app= express();
const port = 4000;
/* import moralis */

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
  });

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})
