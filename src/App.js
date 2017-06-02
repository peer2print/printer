import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import ProductionCreator from "./components/ProductionCreator.js"
import ProductionList from "./components/ProductionList.js"
import RegistrySetter from "./components/RegistrySetter.js"
import RegistryViewer from "./components/RegistryViewer.js"
import Login from "./components/Login.js"
import Identicon from "react-blockies"

// You can use these addresses if you run `testrpc -d`
// Registry: 0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab
// Bob: 0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1
// Alice: 0xffcf8fdee72ac11b5c542428b35eef5769c409f0

export default class App extends Component {
	constructor(props) {
		super(props)
		this.state = {productionList: [], registry: null, address: null}
	}
	addProduction(prod) {
		this.setState({productionList: this.state.productionList.concat([prod])})
	}
	setRegistry(reg) {
		this.setState({registry: reg})
	}
	setAddress(addr) {
		this.setState({address: addr})
	}
	render() {
		var registryString = this.state.registry ? this.state.registry.address : "none"
		var addressString = this.state.address ? this.state.address : "none"
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Peer2Print Printer</h2>
				</div>
				<hr />
				<div>
					USER
					<Identicon seed={addressString} />
					<Login setAddress={this.setAddress.bind(this)}/>
					Current address: {addressString}
				</div>
				<hr />
				<div>
					MY PRODUCTIONS
					{ this.state.registry && <RegistryViewer registry={this.state.registry} from={this.state.address} constraints={ { buyer: true } }/> }
				</div>
				<hr />
				<div>
					REGISTRY
					<Identicon seed={registryString} />
					<RegistrySetter setRegistry={this.setRegistry.bind(this)} from={this.state.address} />
					Current registry: {registryString}
				<hr />
				</div>
				<div>
					OTHERS PRODUCTIONS
					{ this.state.registry && <RegistryViewer registry={this.state.registry} from={ this.state.address } constraints={ { buyer: false } }/> }
				</div>
				<hr />
				<div>
					CREATE PROD
					<ProductionCreator addProduction={this.addProduction.bind(this)} registry={this.state.registry} from={this.state.address} />
					<ProductionList productionList={this.state.productionList} from={this.state.address} />
				</div>
				<hr />
			</div>
		)
	}
}
