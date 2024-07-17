var Web3 = require("web3");
var _abiJson = require("../src/OrderABI.json");
var _binJson = require("../src/OrderBIN.json");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));

contractName = Object.keys(_abiJson.contracts);
console.log("- contract name: ", contractName[1]);
_abiArray = JSON.parse(JSON.stringify(_abiJson.contracts[contractName[1]].abi));
_bin = "0x" + _binJson.contracts[contractName[1]].bin;

async function deploy() {
  const accounts = await web3.eth.getAccounts();
  console.log("Deploying the contract from " + accounts[0]);
  var deployed = await new web3.eth.Contract(_abiArray)
    .deploy({ data: _bin })
    .send({ from: accounts[0], gas: 3000000 }, function (err, transactionHash) {
      if (!err) console.log("hash: " + transactionHash);
    });
  console.log("---> The contract deployed to: " + deployed.options.address);
}
deploy();
