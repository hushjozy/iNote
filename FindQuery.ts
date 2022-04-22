require('dotenv').config()
const Moralis = require("moralis/node");
const serverUrl = process.env.SERVER_URL;
const appId = process.env.APP_ID;
const masterKey = process.env.MASTER;
const FindQuery = async () => {
  const Monster = Moralis.Object.extend("Monster");
  const query = new Moralis.Query("Monster");

  const results = await query.find();
  console.log(results);
};
