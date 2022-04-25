const serverUrl = "https://fjhqwoplnapa.usemoralis.com:2053/server"; //Server url from moralis.io
const appId = "qzmwR7GsUDMGwahH6Z13MXUCZvi0D0Dw9lrvJG2h"; // Application id from moralis.io
Moralis.start({ serverUrl, appId });

const authButton = document.getElementById('btn-auth');
const enableButton = document.getElementById('btn-enable');
const logoutButton = document.getElementById('btn-logout');
const callButton = document.getElementById('btn-call');
const subheader = document.getElementById('subheader');
const resultBox = document.getElementById('result');
const chkAsset = document.getElementById('chk-asset');
const chkNfts = document.getElementById('chk-nfts');
const sbscAmount = document.getElementById("sbsc_amount");
const sbscAmountDollar = document.getElementById("sbsc_dollar");
const nftViewer = document.getElementById("nft_viewer");
const nftMain = document.getElementById("nft_main");
const nftHeader = document.getElementById("nft_header");
// const nftCaption = document.getElementById("nft_text");





// nftViewer.insertRule('width:40%;', nftViewer.cssRules.length);




var user;
var web3 = window.web3;
var ethAvail = window.ethereum;
//let web3;
let result = '';
var walletAddress;
// let provider;
const provider = 'walletconnect';
var  balances = 20;
/**
 * get the cookie information
 * @param {cookie name} c_name
 */
 function getCookiesCSRF(c_name) {
  if (document.cookie.length > 0) {
      c_start = document.cookie.indexOf(c_name + "=");
      if (c_start != -1) {
          c_start = c_start + c_name.length + 1;
          c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) c_end = document.cookie.length;
          return unescape(document.cookie.substring(c_start, c_end));
      }
  }
  return "";
}


function getTokens() {
   walletAddress = user.get('ethAddress');
  console.log(user.get('ethAddress'));
  console.log(walletAddress);
  // resultBox.innerText = user.get('ethAddress');

  $.ajax({
    url:"/dapps/wallet/",
    headers: { "X-CSRFToken":  getCookiesCSRF("csrftoken")},
    type: "POST",
    dataType: "json",
    data:{
        walletAddress: user.get('ethAddress')
    },
    success: function(result) {
      console.log("SUCCESS");
      console.log(result["sbsc_balance"]);
      sbscAmount.innerHTML = `SBSC: ${result["sbsc_balance"]}<br>(${result["dollar_sbsc"]}\$)`;
      //sbscAmountDollar.innerHTML = `(${result["dollar_sbsc"]}\$)`;
      console.log(result["satoshi_URLs"]);
      var URLs = result["satoshi_URLs"];
      console.log(URLs);
      // nftViewer.style.display = "inline";
      // nftViewer.style.justifyContent = "center";
      // nftViewer.style.textAlign = "center";


      // nftViewer.style.width = "5%";

      // nftCaption.style.justifyContent = "center";
      // nftCaption.style.textAlign = "center";
      // nftCaption.style.display = "inline";

      if (URLs.length > 0) {
        //  block of code to be executed if the condition is true

        var imgs = URLs.map(function(URL) {
          var img = new Image();
          console.log(URL[0]);
          img.src = URL[0];
          img.style.width = "100%";
          img.style.padding = "1%";
        img.style.height = "auto";

        var inner_div = document.createElement('div');
        inner_div.style.verticalAlign = "top";
        inner_div.style.display = "inline-block";
        inner_div.style.textAlign = "center";
        inner_div.style.width = "30%";
        inner_div.style.height = "auto";
        inner_div.style.padding = "1%";
        inner_div.style.whiteSpace = "normal";

        //img.style.display = "inline-block";

          // document.body.appendChild(img);
            //var theDiv = document.getElementById("nft_viewer");
            // var content = document.createTextNode("Image");
            // theDiv.appendChild(content);
            inner_div.appendChild(img);

          var z = document.createElement('span'); // is a node
          z.innerHTML = `Series: ${URL[4]}<br>ID: ${URL[3]} <br> Rarity Points: ${URL[1]} <br> Rank: ${URL[2]}`;
          //z.style.textAlign = "center";
          z.style.display = "block";
          z.style.color = "white";
          z.style.fontSize = "0.8em";
          z.style.fontWeight = "500";
          //z.style.verticalAlign = "bottom";
          //var content = document.createTextNode("<YOUR_CONTENT>");
          inner_div.appendChild(z);

          nftViewer.appendChild(inner_div);

          return img;
        });
      } else {
        nftHeader.innerHTML = '';
      }



      // resultBox.innerText = result["sbsc_balance"];
    },
    fail: function(result){
      console.log("Some error");
    }
});

}


function getNFTs() {
   walletAddress = user.get('ethAddress');
  console.log(user.get('ethAddress'));
  console.log(walletAddress);
  // resultBox.innerText = user.get('ethAddress');

  $.ajax({
    url:"/dapps/nfts/",
    headers: { "X-CSRFToken":  getCookiesCSRF("csrftoken")},
    type: "POST",
    dataType: "json",
    data:{
        walletAddress: user.get('ethAddress')
    },
    success: function(result) {
      console.log("SUCCESS");
      console.log(result["sbsc_balance"]);
      // resultBox.innerText = result["sbsc_balance"];
    },
    fail: function(result){
      console.log("Some error");
    }
});

}

function renderApp() {
  user = Moralis.User.current();

  if (user) {
    authButton.style.display = 'block';
    logoutButton.style.display = 'inline-block';
    nftMain.style.display = 'block';
    nftHeader.style.display = 'block';

    // subheader.innerText = `Welcome ${user.get('ethAddress')}`;

    if (web3) {
      // callButton.style.display = 'inline-block';
      // enableButton.style.display = 'none';
    } else {
      // callButton.style.display = 'none';
      // enableButton.style.display = 'inline-block';
    }
  } else {
    authButton.style.display = 'inline-block';
    // callButton.style.display = 'none';
    logoutButton.style.display = 'block';
    nftMain.style.display = 'block';
    nftHeader.style.display = 'block';
    // subheader.innerText = '';
    // enableButton.style.display = 'none';
  }
  getTokens();
  // enableWeb3();

  // resultBox.innerText = result;
}

async function authenticate() {
  try {
  //   user = await Moralis.Web3.authenticate({
  //     provider: "walletconnect"} );
  //   web3 = await Moralis.Web3.enable({
  //     provider: "walletconnect",

  //     // mobileLinks: [
  //     //   "rainbow",
  //     //   "metamask",
  //     //   "argent",
  //     //   "trust",
  //     //   "imtoken",
  //     //   "pillar",
  //     // ]
  // });
  // console.log(typeof web3);

  if (typeof web3 !== 'undefined') {
    const user = await Moralis.authenticate();
    web3 = await Moralis.enableWeb3() ;

} else if (window.ethereum) {
  const user = await Moralis.authenticate();
  web3 = await Moralis.enableWeb3();

}
else {
  const user = await Moralis.authenticate({  provider: "walletconnect"});
  web3 = Moralis.enableWeb3({  provider: "walletconnect" });
}
    walletAddress = user.get('ethAddress');
    // console.log(user.get('ethAddress'));
  } catch (error) {
    console.log('authenticate failed', error);
    // await Moralis.User.logOut();
  }
  renderApp();

}

// window.addEventListener('load', function() {

//   // Check if Web3 has been injected by the browser (Mist/MetaMask).
//   if (typeof web3 !== 'undefined') {
//     // Use Mist/MetaMask's provider.
//     web3js = new Web3(web3.currentProvider);
//   } else {
//     // Handle the case where the user doesn't have web3. Probably
//     // show them a message telling them to install Metamask in
//     // order to use the app.
//   }

// });

async function logout() {
  try {
    await Moralis.User.logOut();
  } catch (error) {
    console.log('logOut failed', error);
  }
  result = 'Please Login';
  sbscAmount.innerHTML = "Please Login";
  nftMain.innerHTML = "Please Login";
  nftHeader.innerHTML = "Please Login";
  window.location.reload(true);
  renderApp();
  console.log("user Logged out");
}

async function testCall() {
  try {
    result = await web3.eth.personal.sign('Hello world', user.get('ethAddress'));
  } catch (error) {
    console.log('testCall failed', error);
  }
  // renderApp();

}

async function enableWeb3() {
  try {
    web3 = await Moralis.Web3.enable({ provider });
    console.log('Successfully enabled web3');
  } catch (error) {
    console.log('testCall failed', error);
  }
}

// if (window.localStorage.walletconnect) {
//   await Moralis.enable({
//         provider: "walletconnect"
//       });
//       console.log("locally loading wc");
// }


// Use Mist/MetaMask's provider.

console.log(typeof web3);
//web3 = new Web3(web3.currentProvider);

// results = {
//   web3: web3
// }

// console.log('Injected web3 detected.');

authButton.onclick = authenticate;
logoutButton.onclick = logout;
// callButton.onclick = testCall;
// enableButton.onclick = enableWeb3;
// chkAsset.onclick = getTokens;

renderApp();

async function displayWallet(){
  const options={
    chain: "eth",
   address: walletAddress,
 };

balances = await Moralis.Web3API.account.getTokenBalances(options);
  const showWallet = document.getElementById("wallet_address");
  const showBalance = document.getElementById("wallet_balance");
  showWallet.style.display = 'block';
  showWallet.innerHTML=walletAddress;
  console.log(balances);
  showBalance.innerHTML=balances;
}
