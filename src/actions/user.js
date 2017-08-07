import { web3, Contract } from "../utils";
import { checkRegistry } from ".";

const fetchBalance = () => (dispatch, getState) => {
  const user = getState().user.address;
  if (web3.isAddress(user)) {
    try {
      dispatch(setBalance(web3.eth.getBalance(user)));
      dispatch(setUserError(null));
    } catch (error) {
      dispatch(setUserError("Failed to fetch balance: " + error));
    }
  } else {
    dispatch(setUserError("Invalid address"));
  }
};

export const createNewProduction = newProduction => (dispatch, getState) => {
  if (getState().registry.error) return;
  const user = getState().user.address;
  Contract("Production", { from: user })
    .new(
      getState().user.newProduction.description,
      getState().user.newProduction.price
    )
    .then(productionInstance => {
      const registry = getState().registry.address;
      Contract("ProductionRegistry", { from: user })
        .at(registry)
        .then(registryInstance => {
          registryInstance
            .addProduction(productionInstance.address)
            .then(() => dispatch(setProductionCreationError(null)));
        });
    })
    .catch(error =>
      dispatch(
        setProductionCreationError("Failed to create production: " + error)
      )
    );
};

const thunkCallOnProduction = (functionName, address, value) => (
  dispatch,
  getState
) => {
  if (getState().user.error) return;
  const user = getState().user.address;
  Contract("Production")
    .at(address)
    .then(productionInstance =>
      productionInstance[functionName]({ from: user, value: value })
    );
};

export const approveRequest = (address, amount) =>
  thunkCallOnProduction("approveRequest", address, amount);
export const payCollateral = (address, amount) =>
  thunkCallOnProduction("sendCollateral", address, amount);
export const finishProduct = address =>
  thunkCallOnProduction("productFinished", address);
export const confirmExchange = (address, amount) =>
  thunkCallOnProduction("productExchanged", address, amount);

export const setUser = user => {
  return dispatch => {
    dispatch(setUserAction(user));
    dispatch(fetchBalance());
    dispatch(checkRegistry());
  };
};

const basicAction = (type, argName) => arg => {
  return {
    type: type,
    [argName]: arg
  };
};

const setUserAction = basicAction("SET_USER", "address");
const setProductionCreationError = basicAction(
  "SET_PRODUCTION_CREATION_ERROR",
  "error"
);
const setUserError = basicAction("SET_USER_ERROR", "error");
const setBalance = basicAction("SET_BALANCE", "balance");
export const setNewProductionPrice = basicAction(
  "SET_NEW_PRODUCTION_PRICE",
  "price"
);
export const setNewProductionDescription = basicAction(
  "SET_NEW_PRODUCTION_DESCRIPTION",
  "description"
);
