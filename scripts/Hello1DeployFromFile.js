var Web3 = require("web3");
var _abiJson = require("../src/Hello1ABI.json");
var _binJson = require("../src/Hello1BIN.json");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));

contractName = Object.keys(_abiJson.contracts);
_abiArray = _abiJson.contracts[contractName].abi;
_bin = "0x" + _binJson.contracts[contractName].bin;

async function deploy() {
  const accounts = await web3.eth.getAccounts();
  console.log("Deploying the contract from " + accounts[0]);
  var deployed = await new web3.eth.Contract(_abiArray)
    .deploy({ data: _bin, arguments: ["Hello from web3"] })
    .send({ from: accounts[0], gas: 1000000 }, function (err, transactionHash) {
      if (!err) console.log("hash: " + transactionHash);
    });
  console.log("---> The contract deployed to: " + deployed.options.address);
}
deploy();
