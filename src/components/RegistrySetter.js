import React, { Component } from 'react'

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
		this.setState({address: event.target.address})
	}
	createRegistry(event) {
		event.preventDefault();
		const loadContract = require("core").loadContract
		var ProductionRegistry = loadContract("ProductionRegistry")
		ProductionRegistry.defaults({
			from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1",
			gas: 4712388,
			gasPrice: 100000000000
		})
		ProductionRegistry.new().then((instance) => {
            alert("created registry" + instance.address)
			console.log(instance)
			this.props.setRegistry(instance)
			this.setState({address: instance.address})
        })
	}
	setRegistry(event) {
		event.preventDefault();
		const loadContract = require("core").loadContract
		var ProductionRegistry = loadContract("ProductionRegistry")
		ProductionRegistry.defaults({
			from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1",
			gas: 4712388,
			gasPrice: 100000000000,
			address: this.state.address
		})
		ProductionRegistry.deployed().then((instance) => {
            alert("set registry" + instance.address)
			console.log(instance)
			this.props.setRegistry(instance)
			this.setState({address: instance.address})
        })
	}
}
