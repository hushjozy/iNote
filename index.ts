const Moralis = require("moralis/node");

/* Moralis init code */
const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;
const masterKey = process.env.MASTER;

await Moralis.start({ serverUrl, appId, masterKey });
