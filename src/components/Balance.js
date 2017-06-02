import React, { Component } from 'react'

var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

export default class Balance extends Component {
	constructor(props) {
		super(props)
		this.state = {balance: null}
		this.updateBalance = this.updateBalance.bind(this)
		web3.eth.filter('latest').watch(this.updateBalance)
	}
	updateBalance(address) {
		var balance = "error"
		try {
			balance = web3.eth.getBalance(address || this.props.address).toNumber()
		} catch (exception) {
			console.log("failed to update balance: "+exception)
		}
		this.setState({balance: balance})
	}
	render() { return (
		<div>
			Balance: {web3.fromWei(this.state.balance)} Ether
		</div>
    )}
	componentWilMount() {
		this.updateBalance()
	}
	componentWillReceiveProps(nextProps) {
	    if(this.props.address !== nextProps.address)
	           this.updateBalance(nextProps.address);
	}
}
