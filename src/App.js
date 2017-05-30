import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
/*const loadContract = require("./loadContract.js")

var Production = loadContract("Production")*/

import ProductionCreator from "./components/ProductionCreator.js"
import ProductionList from "./components/ProductionList.js"
import RegistrySetter from "./components/RegistrySetter.js"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {prodList: [], registry: null}
	}
	addProd(prod) {
		console.log("addProd: "+prod)
		this.setState({prodList: this.state.prodList.concat([prod])})
	}
	setRegistry(reg) {
		this.setState({registry: reg})
	}
	render() {
		console.log("prodList: "+this.state.prodList)
		var regStr = this.state.registry ? this.state.registry.address : "none"
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Peer2Print Printer</h2>
					Current registry: {regStr}
				</div>
				<ProductionCreator addProd={this.addProd.bind(this)} />
				<br />
				<ProductionList prodList={this.state.prodList} registry={this.state.registry} />
				<br />
				<RegistrySetter setRegistry={this.setRegistry.bind(this)} />
			</div>
		)
	}
}

export default App
