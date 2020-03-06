import React, { Component } from 'react';
import './App.css';
import Web3 from "web3";

class App extends Component {
  state = {
    account: '',
    contract: {},
    responses: [],
    value: ''
  };

  componentDidMount() {
    this.loadResponses();
    this.loadBlockchainData();
    this.poll();
  }

  poll () {
    setTimeout(() => {
      this.loadResponses();
      this.poll();
    },1000);
  }

  async loadResponses() {
    let response = await fetch('/responses');
    let body = await response.json();
    if(!response.ok){
      console.log("error with fetching response: ", body.message);
    }else {
      this.setState({ responses: body });
    }
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const abi = await fetch('http://localhost:8888/api/DecentTakeHome/all?path=abi').then(res => res.json());
    const address = await fetch('http://localhost:8888/api/DecentTakeHome/').then(res => res.json());
    const accounts = await web3.eth.getAccounts();
    let contract = new web3.eth.Contract(abi[0],address.address);
    this.setState({ account: accounts[0], contract })
  }

  sendString = async () => {
    try{
      await this.state.contract.methods.addString(this.state.value).send({
        from: this.state.account
      });
    }catch(error){
      console.log(error);
    }
  };

  setString = (newString) => {
    this.setState((state) => ({
      value: newString
    }))
  };

  render() {
    return (
        <div className="App">
          <h1>Strings</h1>
          {this.state.responses.map(response =>
              <div key={response.id}>Original: {response.string} Transformed: {response.transformed}</div>
          )}
          <input onChange={e => this.setString(e.target.value)} />
          <button onClick={this.sendString}>submit</button>
        </div>
    );
  }
}

export default App;