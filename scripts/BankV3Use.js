var Web3 = require("web3");
var _abiBinJson = require("./BankV3.json");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName = Object.keys(_abiBinJson.contracts);
_abiArray = _abiBinJson.contracts[contractName].abi;
console.log("- ABI: " + _abiArray);
var bank = new web3.eth.Contract(
  _abiArray,
  "0x0042048e0e97BA996CA18fC7d027379ed786Af7a"
);

async function doIt() {
  const accounts = await web3.eth.getAccounts();
  console.log("Account: " + accounts[0]);
  const balanceBefore = await web3.eth.getBalance(accounts[0]);
  console.log("Balance before: " + balanceBefore);
  bank.methods.getBalance().call().then(console.log);
  await bank.methods.deposit(111).send({ from: accounts[0], value: 111 });
  bank.methods.getBalance().call().then(console.log);
  await bank.methods.withdrawAll().send({ from: accounts[0] });
  bank.methods.getBalance().call().then(console.log);
  const balanceAfter = await web3.eth.getBalance(accounts[0]);
  console.log("Balance after: " + balanceAfter);
  console.log("Balance diff: " + (balanceBefore - balanceAfter));
}
doIt();
