import { loadContract } from "core";

import setContractDefaults from "./setContractDefaults";

export default (contractName, options) => {
  var Contract = loadContract(contractName);
  setContractDefaults(Contract, options);
  return Contract;
};
