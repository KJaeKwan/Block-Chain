var Web3 = require("web3");
var _abiBinJson = require("../src/OrderEvent.json");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));

contractName = Object.keys(_abiBinJson.contracts);
console.log("- contract name: ", contractName);
_abiArray = _abiBinJson.contracts[contractName].abi;
_bin = _abiBinJson.contracts[contractName].bin;

async function deploy() {
  const accounts = await web3.eth.getAccounts();
  console.log("Deploying the contract from " + accounts[0]);
  var deployed = await new web3.eth.Contract(_abiArray)
    .deploy({ data: "0x" + _bin })
    .send({ from: accounts[0], gas: 259210 }, function (err, transactionHash) {
      if (!err) console.log("hash: " + transactionHash);
    });
  console.log("---> The contract deployed to: " + deployed.options.address);
}
deploy();
