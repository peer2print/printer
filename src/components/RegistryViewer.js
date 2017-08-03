import React, { Component } from 'react'
import ProductionList from "./ProductionList.js"
import setContractDefaults from "../utils/setContractDefaults.js"
const loadContract = require("core").loadContract

function applyConstraints(Production, prodAddr, constraints, from)
{
	return (Production.at(prodAddr).then((production) => {
		if (constraints.buyer === undefined)
			return production
		else
			return (production.buyer().then((productionBuyer) => {
				if (constraints.buyer === true && from === productionBuyer)
					return production
				else if (constraints.buyer === false &&  from !== productionBuyer)
					return production
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
	updateProductions(registry = this.props.registry, from = this.props.from) {
		this.setState({productionList: []})
		fetchProductions(registry, this.addProductions.bind(this), from, this.props.constraints)
	}
	componentWillMount() {
		this.updateProductions()
	}
	componentWillReceiveProps(nextProps) {
	    if(this.props.registry !== nextProps.registry || this.props.from !== nextProps.from)
	           this.updateProductions(nextProps.registry, nextProps.from);
	}
	addProductions(prods) {
		this.setState({productionList: this.state.productionList.concat(prods)})
	}
	render() {
		return <ProductionList productionList={this.state.productionList} />
	}
}
