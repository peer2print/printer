export default function setContractDefaults(contract, options) {
  contract.defaults({
    from: (options && options.from) || undefined,
    gas: 4712388,
    gasPrice: 100000000000
  });
}
