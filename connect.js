import NodeWalletConnect from "@walletconnect/node";
import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";

// Create connector
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

// Draft transaction
const tx = {
  from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
  to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
  data: "0x", // Required
  gasPrice: "0x02540be400", // Optional
  gas: "0x9c40", // Optional
  value: "0x00", // Optional
  nonce: "0x0114", // Optional
};

// Send transaction
walletConnector
  .sendTransaction(tx)
  .then((result) => {
    // Returns transaction id (hash)
    console.log(result);
  })
  .catch((error) => {
    // Error returned when rejected
    console.error(error);
  });
  // Draft transaction
const tx = {
  from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3", // Required
  to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359", // Required (for non contract deployments)
  data: "0x", // Required
  gasPrice: "0x02540be400", // Optional
  gas: "0x9c40", // Optional
  value: "0x00", // Optional
  nonce: "0x0114", // Optional
};

// Sign transaction
walletConnector
  .signTransaction(tx)
  .then((result) => {
    // Returns signed transaction
    console.log(result);
  })
  .catch((error) => {
    // Error returned when rejected
    console.error(error);
  });
