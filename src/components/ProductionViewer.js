import React, { Component } from 'react'

var web3 = new (require('web3'))()

export default class ProductionViewer extends Component {
	setDescription(desc) {
		if (typeof(desc) !== String)
			desc = web3.toAscii(desc)
		console.log("fetched desc: "+desc)
		this.setState({description: desc})
	}
	setPrice(p) {
		console.log("fetched price: "+p)
		this.setState({price: p})
	}
	constructor(props) {
		super(props);
		this.state = {address: props.prod.address, description: "...", price: 0};
		props.prod.description().then(this.setDescription.bind(this))
		props.prod.price().then(this.setPrice.bind(this))
		/*props.prod.price().then(function (p) {
			this.setState({price: p})
		})*/
	}
	render() { return (
		<p>
			Address:
			{this.state.address}
			<br />
			Description:
			{this.state.description}
			<br />
			Price:
			{this.state.price.toString()}
			ETH
		</p>
    )}
}
