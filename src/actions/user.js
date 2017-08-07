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

export const payCollateral = (requestAddress, amount) => (
  dispatch,
  getState
) => {
  if (getState().user.error) return;
  const user = getState().user.address;
  Contract("Production")
    .at(requestAddress)
    .then(productionInstance =>
      productionInstance.sendCollateral({ from: user, value: amount })
    );
};

export const finishProduct = requestAddress => (dispatch, getState) => {
  if (getState().user.error) return;
  const user = getState().user.address;
  Contract("Production")
    .at(requestAddress)
    .then(productionInstance =>
      productionInstance.productFinished({ from: user })
    );
};

export const confirmExchange = (requestAddress, amount) => (
  dispatch,
  getState
) => {
  console.log("trying to pay " + amount + " wei");
  if (getState().user.error) return;
  const user = getState().user.address;
  Contract("Production").at(requestAddress).then(productionInstance =>
    productionInstance.productExchanged({
      from: user,
      value: amount
    })
  );
};

export const approveRequest = requestAddress => (dispatch, getState) => {
  if (getState().user.error) return;
  const user = getState().user.address;
  Contract("Production", { from: user })
    .at(requestAddress)
    .then(productionInstance => productionInstance.approveRequest());
};

export const setNewProductionPrice = price => ({
  type: "SET_NEW_PRODUCTION_PRICE",
  price
});

export const setNewProductionDescription = description => ({
  type: "SET_NEW_PRODUCTION_DESCRIPTION",
  description
});

export const setUser = user => {
  return dispatch => {
    dispatch(setUserAction(user));
    dispatch(fetchBalance());
    dispatch(checkRegistry());
  };
};

const setUserAction = address => {
  return {
    type: "SET_USER",
    address
  };
};

const setProductionCreationError = error => {
  return {
    type: "SET_PRODUCTION_CREATION_ERROR",
    error
  };
};

const setUserError = error => {
  return {
    type: "SET_USER_ERROR",
    error
  };
};

const setBalance = balance => {
  return {
    type: "SET_BALANCE",
    balance
  };
};
