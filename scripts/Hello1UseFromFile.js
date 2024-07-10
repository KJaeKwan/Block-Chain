var Web3 = require("web3");
var _abiJson = require("../src/Hello1ABI.json");
var web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8345")
);

contractName = Object.keys(_abiJson.contracts);
console.log("- contract name: ", contractName[0]);
_abiArray = JSON.parse(_abiJson.contracts[contractName].abi);

async function doIt() {
  var hello = new web3.eth.Contract(
    _abiArray,
    "0x5A9D02844aAdfb407A1AD0E0d6fA14627672B026"
  );
  var event = hello.events
    .PrintLog(function (error, event) {
      console.log(">>> Event fired: " + JSON.stringify(event.returnValues));
    })
    .on(">> data", function (event) {
      console.log(event);
    })
    .on(">> changed", function (event) {
      console.log(event);
    })
    .on(">> error", console.error);
  const accounts = await web3.eth.getAccounts();
  console.log("Account: " + accounts[0]);
  const balanceBefore = await web3.eth.getBalance(accounts[0]);
  console.log("Balance before: " + balanceBefore);
  hello.methods.sayHello().call().then(console.log); //null
  await hello.methods.setHello().send({ from: accounts[0] });
  hello.methods.sayHello().call().then(console.log);
  hello.methods.compareTo("Hello").call().then(console.log);
  const balanceAfter = await web3.eth.getBalance(accounts[0]);
  console.log("Balance after: " + balanceAfter);
  console.log("Balance diff: " + (balanceBefore - balanceAfter));
}
doIt();
