const productions = (state = {}, action) => {
  switch (action.type) {
    case "SET_PRODUCTION":
      return {
        ...state,
        [action.production.address]: action.production
      };
    case "REMOVE_PRODUCTION":
      return Object.keys(state).reduce((result, key) => {
        if (key !== action.address) result[key] = state[key];
        return result;
      }, {});
    default:
      return state;
  }
};

export default productions;
