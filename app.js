require('dotenv').config()
const express = require("express");
const nodemailer =require ("nodemailer");
const request =require ("request");
const bodyParser = require("body-parser");
const path = require('path');
// const ethercon = require("ethercon")

const app= express();
const port = 3000;
/* import moralis */

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/workingmoral.html'));
  });
app.get('/the', (req, res) => {
  res.sendFile(path.join(__dirname, '/moral.html'));
  });
  app.get('/moralty', (req, res) => {
    res.sendFile(path.join(__dirname, '/walletcon.html'));
    });
app.post("/the",(req,res) =>{
  
  res.sendFile("/moral.html")
})
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})
