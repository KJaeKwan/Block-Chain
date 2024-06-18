var Web3 = require("web3");
var _abiBinJson = require("./MyBank.json");

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8345"));
contractName = Object.keys(_abiBinJson.contracts);
_abi = _abiBinJson.contracts[contractName].abi;
_abiArray = JSON.parse(JSON.stringify(_abi));

var myBank = new web3.eth.Contract(
  _abiArray,
  "0x81b928274EC5c4F366fEb3572252A327474C921d"
); // 배포 후 컨트랙 주소 입력

async function doIt() {
  const accounts = await web3.eth.getAccounts();
  console.log("Call from: " + accounts[0]);
  myBank.methods.getBalance().call().then(console.log);
  myBank.methods
    .deposit(1111)
    .send({ from: accounts[0], gas: 80000, value: 1111 });
  myBank.methods.getBalance().call().then(console.log);
}

doIt();
