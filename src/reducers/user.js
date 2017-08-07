const user = (
  state = {
    address: "",
    balance: null,
    error: "Type your address",
    newProduction: { desription: "New request", price: null, error: null }
  },
  action
) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, address: action.address };
    case "SET_USER_ERROR":
      return { ...state, error: action.error };
    case "SET_BALANCE":
      return { ...state, balance: action.balance };
    case "SET_NEW_PRODUCTION_PRICE":
      return {
        ...state,
        newProduction: {
          ...state.newProduction,
          price: action.price
        }
      };
    case "SET_NEW_PRODUCTION_DESCRIPTION":
      return {
        ...state,
        newProduction: {
          ...state.newProduction,
          description: action.description
        }
      };
    case "SET_PRODUCTION_CREATION_ERROR":
      return {
        ...state,
        newProduction: {
          ...state.newProduction,
          error: action.error
        }
      };
    default:
      return state;
  }
};

export default user;
