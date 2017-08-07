import { web3 } from "../utils";

export default productionInstance => {
  const keys = [
    "description",
    "price",
    "buyer",
    "seller",
    "state",
    "minimumCollateral",
    "exchangeConfirmations"
  ];
  return Promise.all(
    keys.map(key => productionInstance[key].call())
  ).then(attributes => {
    const object = {};
    for (let i = 0; i < keys.length; i++) object[keys[i]] = attributes[i];
    /*specific code*/
    object.address = productionInstance.address;
    object.description = web3.toUtf8(object.description);
    object.state = "" + object.state;
    object.balance = web3.eth.getBalance(object.address);
    /*end of specific code*/
    return object;
  });
};
