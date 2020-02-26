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
    fetch('/responses')
        .then(res => res.json())
        .then(responses => this.setState({ responses }));
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const abi = await fetch('http://localhost:8888/api/DecentTakeHome/all?path=abi').then(res => res.json());
    const address = await fetch('http://localhost:8888/api/DecentTakeHome/').then(res => res.json());
    const accounts = await web3.eth.getAccounts();
    let contract = new web3.eth.Contract(abi,address.address);
    this.setState({ account: accounts[0], contract })
  }

  sendString = async () => {
    const rawResponse = await fetch('/responses', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newString: this.state.value})
    });
    const content = await rawResponse.json();

    console.log(content);
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
              <div key={response.id}>{response.string}</div>
          )}
          <input onChange={e => this.setString(e.target.value)} />
          <button onClick={this.sendString}>submit</button>
        </div>
    );
  }
}

export default App;