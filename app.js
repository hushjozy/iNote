require('dotenv').config()
const express = require("express");
const nodemailer =require ("nodemailer");
const request =require ("request");
const bodyParser = require("body-parser");
const path = require('path');
// const ethercon = require("ethercon")
const NodeWalletConnect = require ("@walletconnect/node/dist/cjs/index.js");
const WalletConnectQRCodeModal = require ("@walletconnect/qrcode-modal/dist/cjs/index.js");

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
  const walletConnector = new NodeWalletConnect(
    {
      bridge: "https://bridge.walletconnect.org", // Required
    },
    {
      clientMeta: {
        description: "WalletConnect NodeJS Client",
        url: "https://nodejs.org/en/",
        icons: ["https://nodejs.org/static/images/logo.svg"],
        name: "WalletConnect",
      },
    }
  );

  // Check if connection is already established
  if (!walletConnector.connected) {
    // create new session
    walletConnector.createSession().then(() => {
      // get uri for QR Code modal
      const uri = walletConnector.uri;
      // display QR Code modal
      WalletConnectQRCodeModal.open(
        uri,
        () => {
          console.log("QR Code Modal closed");
        },
        true // isNode = true
      );
    });
  }

  // Subscribe to connection events
  walletConnector.on("connect", (error, payload) => {
    if (error) {
      throw error;
    }

    // Close QR Code Modal
    WalletConnectQRCodeModal.close(
      true // isNode = true
    );

    // Get provided accounts and chainId
    const { accounts, chainId } = payload.params[0];
  });

  walletConnector.on("session_update", (error, payload) => {
    if (error) {
      throw error;
    }

    // Get updated accounts and chainId
    const { accounts, chainId } = payload.params[0];
  });

  walletConnector.on("disconnect", (error, payload) => {
    if (error) {
      throw error;
    }

    // Delete walletConnector
  });
  res.sendFile("/moral.html")
})
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})
