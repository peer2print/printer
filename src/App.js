import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
/*const loadContract = require("./loadContract.js")

var Production = loadContract("Production")*/

import ProductionCreator from "./components/ProductionCreator.js"
import ProductionList from "./components/ProductionList.js"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {prodList: []}
	}
	addProd(prod) {
		console.log("addProd: "+prod)
		this.setState({prodList: this.state.prodList.concat([prod])})
	}
	render() {
		console.log("prodList: "+this.state.prodList)
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Peer2Print Printer</h2>
				</div>
				<ProductionCreator addProd={this.addProd.bind(this)} />
				<br />
				<ProductionList prodList={this.state.prodList} />
			</div>
		)
	}
}

export default App
