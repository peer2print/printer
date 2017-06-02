import React, { Component } from 'react'
import setContractDefaults from "./setContractDefaults.js"
const loadContract = require("core").loadContract

export default class ProductionCreator extends Component {
	constructor(props) {
		super(props)
		this.state = {address: ""}

		this.createRegistry = this.createRegistry.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.setRegistry = this.setRegistry.bind(this)
	}
	render() { return (
		<form onSubmit={this.setRegistry}>
			<label>
				Registry Address:
				<input type="text" name="address" value={this.state.address} onChange={this.handleChange} />
			</label>
			<input type="submit" value="Set Registry" />
			<button onClick={this.createRegistry}>Create Registry</button>
		</form>
    )}
	handleChange(event) {
		this.setState({address: event.target.value})
	}
	createRegistry(event) {
		event.preventDefault()
		var ProductionRegistry = loadContract("ProductionRegistry")
		setContractDefaults(ProductionRegistry, {from: this.props.from})
		ProductionRegistry.new().then((instance) => {
			this.props.setRegistry(instance)
			this.setState({address: instance.address})
        })
	}
	setRegistry(event) {
		event.preventDefault()
		var ProductionRegistry = loadContract("ProductionRegistry")
		setContractDefaults(ProductionRegistry, {from: this.props.from})
		ProductionRegistry.at(this.state.address).then((instance) => {
			this.props.setRegistry(instance)
			this.setState({address: instance.address})
        })
	}
}
