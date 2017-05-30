import React, { Component } from 'react'

export default class ProductionCreator extends Component {
	constructor(props) {
		super(props)
		this.state = {}

		this.createRegistry = this.createRegistry.bind(this)
	}
	render() { return (
		<form onSubmit={this.createRegistry}>
			<label>
				Registry Address:
				<input type="text" name="desc" value={this.state.desc} onChange={this.handleChange} />
			</label>
			<input type="submit" value="Set Registry" />
			<input type="submit" value="Create Registry" />
		</form>
    )}
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
        })
	}
}
