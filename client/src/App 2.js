import React from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import fs from 'fs';
import abiDecoder from 'abi-decoder';
import * as wrapper from 'solc/wrapper';

const solc = wrapper(window.Module);

// const input = fs.readFileSync('./smartContract/contracts/HellowWorldContract.sol');
// const output = solc.compile(input.toString(), 1);
// const bytecode = output.contracts[':HellowWorldContract'].bytecode;
// const abi = JSON.parse(output.contracts[':HellowWorldContract'].interface);
// console.log('abi',abi);
// abiDecoder.addABI(abi);

// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// web3.eth.getAccounts().then(accounts => {
//
//   accounts.forEach(account => {
//
//     console.log(account)
//
//   })
//
// });

// var contract = new web3.eth.Contract(abi);
// contract.defaultAccount = web3.eth.accounts[0];
// contract.methods.greet().call((result) =>{
//   console.log(result);
// });

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
