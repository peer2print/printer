import Web3 from "web3";
import config from "../config";
import setContractDefaults from "../utils/setContractDefaults.js";
import { loadContract } from "core";

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(config.web3ProviderURL));

const fetchBalance = (address, dispatch) => {
  try {
    web3.eth.getBalance(address).then(balance => {
      dispatch(setBalance(balance));
    });
  } catch (error) {
    dispatch(setBalance("" + error));
  }
};

export const setRegistry = registry => {
  return dispatch => {
    try {
      var ProductionRegistry = loadContract("ProductionRegistry");
      setContractDefaults(ProductionRegistry, { from: this.props.from });
      ProductionRegistry.at(this.state.address).then(instance => {
        dispatch(setRegistryAction(instance.address));
      });
    } catch (error) {
      dispatch(setRegistryAction("" + error));
    }
  };
};

export const setUser = user => {
  return dispatch => {
    dispatch(setUserAction(user));
    fetchBalance(user, dispatch);
  };
};

const setUserAction = user => {
  return {
    type: "SET_USER",
    user
  };
};

const setBalance = balance => {
  return {
    type: "SET_BALANCE",
    balance
  };
};

const setRegistryAction = registry => {
  return {
    type: "SET_REGISTRY",
    registry
  };
};
