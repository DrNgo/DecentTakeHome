var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const Web3 = require('web3');
const crypto = require('crypto');
let contract;

let response = [];

async function setupResponses(){
  try{
    const abi = await fetch('http://localhost:8888/api/DecentTakeHome/all?path=abi').then(res => res.json());
    const address = await fetch('http://localhost:8888/api/DecentTakeHome/').then(res => res.json());

    let provider = new Web3.providers.WebsocketProvider("ws://localhost:8545");

    const web3 = new Web3(provider);
    contract = new web3.eth.Contract(abi[0],address.address);
    let greeting = await contract.events.NewString().on('data', function(result) {
      if(!response.some(function(el){ return el.id === result.returnValues.id}))
        response.push({
          id: result.returnValues.id,
          string: result.returnValues.content,
          transformed: crypto
              .createHash('md5')
              .update(result.returnValues.id+result.returnValues.content, 'utf-8')
              .digest('hex')});
    });
    /* GET responses listing. */
    router.get('/', async function(req, res, next) {
      res.json(response);
    });
    return router;
  } catch(err){
    console.log('error in setting up contract: ', err);
  }

}



module.exports = setupResponses;