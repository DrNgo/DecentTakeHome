var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

let response = [{
  id: 1,
  string: "samsepi0l"
}, {
  id: 2,
  string: "D0loresH4ze"
}];
let id = 3;

/* GET responses listing. */
router.get('/', async function(req, res, next) {
  const Web3 = require('web3')

  try{
    const abi = await fetch('http://localhost:8888/api/DecentTakeHome/all?path=abi').then(res => res.json());
    const address = await fetch('http://localhost:8888/api/DecentTakeHome/').then(res => res.json());

    let provider = new Web3.providers.HttpProvider("http://localhost:8545");

    const web3 = new Web3(provider);
    let contract = new web3.eth.Contract(abi,address.address);
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