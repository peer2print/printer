import React, { Component } from 'react'
import ProductionList from "./ProductionList.js"
import setContractDefaults from "./setContractDefaults.js"
const loadContract = require("core").loadContract

// Registry: 0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab
// Bob: 0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1
// Alice: 0xffcf8fdee72ac11b5c542428b35eef5769c409f0


function applyConstraints(Production, prodAddr, constraints, from)
{
	return (Production.at(prodAddr).then((prod) => {
		return (prod.buyer().then((prodBuyer) => {
			if ((constraints.buyer && prodBuyer === from) ||
					(!constraints.buyer && prodBuyer !== from))
				return prod
			else
				return null
		}))
	}))
}

function fetchProductions(registry, addProductions, from, constraints) {
	var Production = loadContract("Production")
	setContractDefaults(Production, {from: from})
	registry.getProductionsCount.call().then((size) => {
		var i = 0
		var prodAddrsPromises = []
		while (i < size)
			prodAddrsPromises.push(registry.productions.call(i++))
		return Promise.all(prodAddrsPromises).then((prodAddrs) => {
			var prodPromises = prodAddrs.map((prodAddr) => {
				if (constraints) {
					return (applyConstraints(Production, prodAddr, constraints, from))
				} else {
					return (Production.at(prodAddr))
				}
			})
			Promise.all(prodPromises).then((prods) => {
				addProductions(prods)
			})
		})
	})
}

export default class RegistryViewer extends Component {
	addProductions(prods) {
		this.setState({prodList: this.state.prodList.concat(prods)})
	}
	constructor(props) {
		super(props)
		this.state = {prodList: []}
		fetchProductions(this.props.registry, this.addProductions.bind(this),
				this.props.from, this.props.constraints)
	}
	render() {
		return <ProductionList prodList={this.state.prodList} />
	}
}
