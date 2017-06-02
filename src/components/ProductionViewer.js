import React, { Component } from 'react'
import Identicon from "react-blockies"

var web3 = new (require('web3'))()

export default class ProductionViewer extends Component {
	setDescription(desc) {
		if (typeof(desc) !== String)
			desc = web3.toAscii(desc)
		this.setState({description: desc})
	}
	setPrice(p) {
		this.setState({price: p})
	}
	setBuyer(b) {
		this.setState({buyer: b})
	}
	constructor(props) {
		super(props);
		this.state = {address: props.prod.address, description: "...", price: 0}
		props.prod.description().then(this.setDescription.bind(this))
		props.prod.price().then(this.setPrice.bind(this))
		props.prod.buyer().then(this.setBuyer.bind(this))
	}
	render() { return (
		<p>
			<Identicon seed={this.state.address} />
			<br />
			Address:
			{this.state.address}
			<br />
			Description:
			{this.state.description}
			<br />
			Price:
			{this.state.price.toString()}
			ETH
			<br />
			Buyer:
			{this.state.buyer}
		</p>
    )}
}
