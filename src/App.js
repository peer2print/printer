import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
/*const loadContract = require("./loadContract.js")

var Production = loadContract("Production")*/

class ProductionCreator extends Component {
	constructor(props) {
		super(props);
		this.state = {desc: "default", price: 42};

		this.handleChange = this.handleChange.bind(this);
		this.createProduction = this.createProduction.bind(this);
	}
	render() { return (
      <form onSubmit={this.createProduction}>
        <label>
          Description:
          <input type="text" name="desc" value={this.state.desc} onChange={this.handleChange} />
        </label>
		<br />
		<label>
          Price:
          <input type="number" name="price" value={this.state.price} onChange={this.handleChange} />
		  ETH
        </label>
		<br />
        <input type="submit" value="Create Production" />
      </form>
    )}
	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}
	createProduction(event) {
		alert("creating " + this.state.desc + ", price: " + this.state.price)
		event.preventDefault();
	}
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Peer2Print Printer</h2>
        </div>
        <ProductionCreator />
      </div>
    )
  }
}

export default App
