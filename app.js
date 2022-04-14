require('dotenv').config()
const express = require("express");
const nodemailer =require ("nodemailer");
const request =require ("request");
const bodyParser = require("body-parser");
const path = require('path');
// const ethercon = require("ethercon")

const app= express();
const port = 3000

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/walletcon.html'));
  });

app.post("/",(req,res) =>{

})
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})
