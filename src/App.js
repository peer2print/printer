import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
/*const loadContract = require("./loadContract.js")

var Production = loadContract("Production")*/

import ProductionCreator from "./components/ProductionCreator.js"
import ProductionList from "./components/ProductionList.js"
import RegistrySetter from "./components/RegistrySetter.js"
import RegistryViewer from "./components/RegistryViewer.js"
import Login from "./components/Login.js"
import Identicon from "react-blockies"

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {prodList: [], registry: null, address: null}
	}
	addProd(prod) {
		this.setState({prodList: this.state.prodList.concat([prod])})
	}
	setRegistry(reg) {
		this.setState({registry: reg})
	}
	setAddress(addr) {
		this.setState({address: addr})
	}
	render() {
		var regStr = this.state.registry ? this.state.registry.address : "none"
		var addrStr = this.state.address ? this.state.address : "none"
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Peer2Print Printer</h2>
				</div>
				<hr />
				<div>
					USER
					<Identicon seed={addrStr} />
					<Login setAddress={this.setAddress.bind(this)}/>
					Current address: {addrStr}
				</div>
				<hr />
				<div>
					MY PRODUCTIONS
					{ this.state.registry && <RegistryViewer registry={this.state.registry} from={this.state.address} constraints={ { buyer: true } }/> }
				</div>
				<hr />
				<div>
					REGISTRY
					<Identicon seed={regStr} />
					<RegistrySetter setRegistry={this.setRegistry.bind(this)} from={this.state.address} />
					Current registry: {regStr}
				<hr />
				</div>
				<div>
					OTHERS PRODUCTIONS
					{ this.state.registry && <RegistryViewer registry={this.state.registry} from={ this.state.address } constraints={ { buyer: false } }/> }
				</div>
				<hr />
				<div>
					CREATE PROD
					<ProductionCreator addProd={this.addProd.bind(this)} registry={this.state.registry} from={this.state.address} />
					<ProductionList prodList={this.state.prodList} from={this.state.address} />
				</div>
				<hr />
			</div>
		)
	}
}

export default App
