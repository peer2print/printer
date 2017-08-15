import Web3 from "web3";

import { web3ProviderURL } from "../config";

/*global web3*/

export default (typeof web3 !== "undefined"
  ? new Web3(web3.currentProvider)
  : new Web3(new Web3.providers.HttpProvider(web3ProviderURL)));
