import { Contract, web3 } from "../utils";

export const setRegistry = registry => (dispatch, getState) => {
  dispatch(setRegistryAction(registry));
  dispatch(checkRegistry());
};

export const checkRegistry = () => (dispatch, getState) => {
  const registry = getState().registry.address;
  if (!web3.isAddress(registry)) {
    dispatch(setRegistryError("Invalid registry address"));
    return;
  }
  const user = getState().user.address;
  if (!web3.isAddress(user)) {
    dispatch(setRegistryError("Invalid user address"));
    return;
  }
  Contract("ProductionRegistry", {
    from: user
  })
    .at(registry)
    .then(instance => {
      dispatch(setRegistryError(null));
    })
    .catch(error => {
      dispatch(setRegistryError("" + error));
    });
};

const setRegistryAction = registry => {
  return {
    type: "SET_REGISTRY",
    address: registry
  };
};

export const createRegistry = () => (dispatch, getState) => {
  const user = getState().user.address;
  if (!web3.isAddress(user)) {
    dispatch(setRegistryError("Invalid user address"));
    return;
  }
  Contract("ProductionRegistry", { from: user })
    .new()
    .then(registryInstance => {
      dispatch(setRegistryAction(registryInstance.address));
      dispatch(setRegistryError(null));
    })
    .catch(error =>
      dispatch(setRegistryError("Failed to create registry: " + error))
    );
};

const setRegistryError = message => ({
  type: "SET_REGISTRY_ERROR",
  error: message
});

const setProduction = production => ({
  type: "SET_PRODUCTION",
  production
});

const setRegistryUpdateError = error => ({
  type: "SET_REGISTRY_UPDATE_ERROR",
  error
});

const convertProductionContractToObject = productionInstance => {
  const keys = ["description", "price", "buyer", "seller"];
  return Promise.all(
    keys.map(key => productionInstance[key].call())
  ).then(attributes => {
    const object = {};
    for (let i = 0; i < keys.length; i++) object[keys[i]] = attributes[i];
    /*specific code*/
    object.address = productionInstance.address;
    object.description = web3.toUtf8(object.description);
    /*end of specific code*/
    return object;
  });
};

export const updateRegistry = () => (dispatch, getState) => {
  if (getState().registry.error) return;
  const user = getState().user.address;
  Contract("ProductionRegistry", { from: user })
    .at(getState().registry.address)
    .then(registry =>
      registry.getProductionsCount
        .call()
        .then(size => {
          const productionAddressPromises = [];
          for (let i = 0; i < size; i++)
            productionAddressPromises.push(registry.productions.call(i));
          return Promise.all(productionAddressPromises);
        })
        .then(productionAddresses => {
          const Production = Contract("Production", { from: user });
          return Promise.all(
            productionAddresses.map(productionAddresses =>
              Production.at(productionAddresses)
            )
          );
        })
        .then(productionInstances =>
          productionInstances.map(productionInstance =>
            convertProductionContractToObject(
              productionInstance
            ).then(productionObject => {
              if (
                JSON.stringify(productionObject) !==
                JSON.stringify(getState().productions[productionObject.address])
              )
                dispatch(setProduction(productionObject));
            })
          )
        )
    )
    .then(() => {
      if (getState().registryUpdateError)
        dispatch(setRegistryUpdateError(null));
    })
    .catch(error =>
      dispatch(
        setRegistryUpdateError("Failed to update productions list: " + error)
      )
    );
};
