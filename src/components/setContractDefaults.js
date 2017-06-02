function MissingFromException()
{
	this.message = "need 'from' option"
	this.name = "MissingFromException"
}

export default function setContractDefaults(contract, options) {
	if (!options || !options.from)
		throw new MissingFromException()
	contract.defaults({
		from: options.from,
		gas: 4712388,
		gasPrice: 100000000000
	})
}
