var Web3 = require("web3");
var _abiBinJson = require("../src/OrderEvent.json");

var web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8345")
);
contractName = Object.keys(_abiBinJson.contracts);
_abiArray = _abiBinJson.contracts[contractName].abi;
console.log("- ABI: " + _abiArray);

async function doIt() {
  var _order = new web3.eth.Contract(
    _abiArray,
    "0x3E04292870AA4Ef2bc44A1638B19A50BCD99b04D"
  );
  const accounts = await web3.eth.getAccounts();
  console.log("Account: " + accounts[0]);
  var event = _order.events.OrderLog(
    {
      filter: { _from: accounts[0], _value: 30 },
      fromBlock: "latest",
      toBlock: "pending",
    },
    function (error, result) {
      if (!error) {
        console.log("Event fired: " + JSON.stringify(result.returnValues));
      }
    }
  );
  var value;
  const balanceBefore = await web3.eth.getBalance(accounts[0]);
  console.log("Balance before: " + balanceBefore);
  my = await _order.methods
    .order("0x1234", 3)
    .send({ from: accounts[0], gas: 100000, value: 30 });
  console.log(
    "---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues)
  );
  my = await _order.methods
    .order("0x1234", 4)
    .send({ from: accounts[0], gas: 100000, value: 40 });
  console.log(
    "---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues)
  );
  my = await _order.methods
    .order("0x1234", 10)
    .send({ from: accounts[0], gas: 100000, value: 100 });
  console.log(
    "---> MyFunction called " + JSON.stringify(my.events.OrderLog.returnValues)
  );
  const balanceAfter = await web3.eth.getBalance(accounts[0]);
  console.log("Balance after: " + balanceAfter);
  console.log("Balance diff: " + (balanceBefore - balanceAfter));
}

doIt();
