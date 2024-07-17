var Web3 = require("web3");
var _abiJson = require("../src/OrderABI.json");
var web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8345")
);

contractName = Object.keys(_abiJson.contracts);
console.log("- contract name: ", contractName[1]);
_abiArray = _abiJson.contracts[contractName[1]].abi;

async function doIt() {
  var order = new web3.eth.Contract(
    _abiArray,
    "0xF643f481f065da62Dc01865ec7dcC3FC6c8Eef75"
  );
  const accounts = await web3.eth.getAccounts();
  await order.methods
    .addC(111, "kim", "010-2017-1111", "111 hongji-dong jongro-gu seoul")
    .send({ from: accounts[0], gas: 3604124 });
  console.log("addCustomer [kim]");
  await order.methods
    .addC(112, "lee", "010-2017-1112", "112 hongji-dong jongro-gu seoul")
    .send({ from: accounts[1], gas: 3604124 });
  console.log("addCustomer [lee]");
  await order.methods
    .addC(113, "lim", "010-2017-1113", "113 hongji-dong jongro-gu seoul")
    .send({ from: accounts[2], gas: 3604124 });
  console.log("addCustomer [lim]");

  await order.methods
    .getHomeAddr()
    .call({ from: accounts[0] })
    .then(console.log);
  await order.methods
    .getHomeAddr()
    .call({ from: accounts[1] })
    .then(console.log);
  await order.methods
    .getHomeAddr()
    .call({ from: accounts[2] })
    .then(console.log);

  await order.methods
    .placeOrder(555, 1115, "T-Shirt", 2)
    .send({ from: accounts[0], gas: 3000000, value: 555 });
  console.log("Order ID [555]");
  await order.methods
    .placeOrder(556, 1116, "T-Shirt", 3)
    .send({ from: accounts[1], gas: 3000000, value: 556 });
  console.log("Order ID [556]");
  await order.methods
    .placeOrder(557, 1117, "T-Shirt", 4)
    .send({ from: accounts[2], gas: 3000000, value: 557 });
  console.log("Order ID [557]");

  totalprice = await order.methods
    .getTotalOrderAmount()
    .call({ from: accounts[1] });
  contrackBalance = await order.methods.queryBalance().call();
  console.log("TotalOrderPrice: ", +totalprice);
  console.log("ContrackBalance: " + contrackBalance);
  await order.methods
    .updateStatus(556, "On delivery")
    .send({ from: accounts[0], gas: 3000000 });
  await order.methods.getOrderById(556).call().then(console.log);

  await order.methods
    .getOrderItem()
    .call({ from: accounts[0] })
    .then(console.log);
  await order.methods
    .getOrderItem()
    .call({ from: accounts[1] })
    .then(console.log);
  await order.methods
    .getOrderItem()
    .call({ from: accounts[2] })
    .then(console.log);
}

doIt();
