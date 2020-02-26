var express = require('express');
var router = express.Router();
let response = [{
  id: 1,
  string: "samsepi0l"
}, {
  id: 2,
  string: "D0loresH4ze"
}];
let id = 3;

/* GET responses listing. */
router.get('/', function(req, res, next) {
  const fs = require("fs"),
      abiDecoder = require('abi-decoder'),
      Web3 = require('web3'),
      solc = require('solc');
  const path=require('path');
  const contractPath = path.resolve(__dirname,'..','smartContract','contracts','HelloWorldContract.sol');
  const output = JSON.parse(solc.compile(JSON.stringify({
    language: "Solidity",
    sources: {
      "HelloWorldContract.sol": {
        content: fs.readFileSync(contractPath, 'utf8')
      }
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["abi","evm.bytecode"]
        }
      }
    }
  })));
  const bytecode = output.contracts['HelloWorldContract.sol'].HelloWorldContract.evm.bytecode;
  const abi = output.contracts['HelloWorldContract.sol'].HelloWorldContract.abi;
  abiDecoder.addABI(abi);
  try{
    let provider = new Web3.providers.HttpProvider("http://localhost:8545");

    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(abi,'0xcF5E267D3E67807346A2D297C7Ce347BBd9D86a1');
    // let contractInstance = contract.at();
    let greeting = contract.events.Greeting().on('data', function(error, result) {
      if (!error)
        console.log('results', result);
      else
        console.log('error: ', error);
    });

    contract.methods.greet().call();
  } catch(err){
    console.log(err);
  }

  res.json(response);
});

/* POST responses listing. */
router.post('/', function(req, res, next) {
  response.push({id:id, string: req.body.newString})
  res.json(200);
});

module.exports = router;