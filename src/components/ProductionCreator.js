import React, { Component } from 'react'

export default class ProductionCreator extends Component {
	constructor(props) {
		super(props)
		this.state = {desc: "default", price: 42}

		this.handleChange = this.handleChange.bind(this)
		this.createProduction = this.createProduction.bind(this)
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
		event.preventDefault();
		if (this.props.registry == null)
		{
			alert("missing registry")
			return
		}
		const loadContract = require("core").loadContract
		var Production = loadContract("Production")
		Production.defaults({
			from: "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1",
			gas: 4712388,
			gasPrice: 100000000000
		})
		Production.new(this.state.desc, this.state.price).then((instance) => {
            alert("created " + this.state.desc + ", price: " + this.state.price)
			console.log(instance)
			this.props.addProd(instance)
			this.props.registry.addProduction(instance.address).then(() => {
				alert("added to registry")
			})
        })
	}
}
