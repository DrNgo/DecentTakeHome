import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    responses: [],
    value: 'test'
  };

  componentDidMount() {
    fetch('/responses')
        .then(res => res.json())
        .then(responses => this.setState({ responses }));
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