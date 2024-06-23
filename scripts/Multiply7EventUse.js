var Web3 = require("web3");
var _abiBinJson = require("../src/Multiply7Event.json");

var web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8345")
);
contractName = Object.keys(_abiBinJson.contracts);
_abiArray = _abiBinJson.contracts[contractName].abi;

var m7 = new web3.eth.Contract(
  _abiArray,
  "0x33add2effA3E32050aCD8446d826b0EFFB93A515"
);
var event = m7.events.Print({ fromBlock: 0 }, function (error, result) {
  if (!error) {
    console.log("Event fired: " + JSON.stringify(result.returnValues));
  }
});

async function doIt() {
  const accounts = await web3.eth.getAccounts();
  console.log("Account: " + accounts[0]);
  const balanceBefore = await web3.eth.getBalance(accounts[0]);
  console.log("Balance before: " + balanceBefore);
  const value = m7.methods.multiply(8).send({ from: accounts[0] });
  console.log("---> Function called " + JSON.stringify(value));
  const balanceAfter = await web3.eth.getBalance(accounts[0]);
  console.log("Balance after: " + balanceAfter);
  console.log("Balance diff: " + (balanceBefore - balanceAfter));
}

doIt();
