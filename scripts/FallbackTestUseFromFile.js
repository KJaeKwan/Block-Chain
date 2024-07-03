var Web3 = require("web3");
var _abiBinJson = require("../src/FallbackTest.json");

var web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8345")
);
contractName = Object.keys(_abiBinJson.contracts);
console.log("- contract name: ", contractName);
_abiArray = _abiBinJson.contracts[contractName].abi;

console.log("- ABI: " + _abiArray);

async function doIt() {
  const accounts = await web3.eth.getAccounts();
  console.log("Account: " + accounts[0]);
  const balanceBefore = await web3.eth.getBalance(accounts[0]);
  console.log("Balance before: " + balanceBefore);
  var _instance = new web3.eth.Contract(
    _abiArray,
    "0x305F89e9b9C91B0b242874d77Ef675b0eBAD437C"
  );
  var event = _instance.events.PrintLog(
    { fromBlock: 0 },
    function (error, result) {
      if (!error) {
        console.log(
          "Event fired: " +
            JSON.stringify(result) +
            "\n---> " +
            JSON.stringify(result.returnValues)
        );
      }
    }
  );

  _instance.methods
    .callA()
    .call()
    .then(function (res) {
      console.log(res);
    });
  web3.eth.sendTransaction({
    from: accounts[0],
    to: "0x305F89e9b9C91B0b242874d77Ef675b0eBAD437C",
  });
  const balanceAfter = await web3.eth.getBalance(accounts[0]);
  console.log("Balance after: " + balanceAfter);
  console.log("Balance diff: " + (balanceBefore - balanceAfter));
  process.exit(1);
}
doIt();
