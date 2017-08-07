const productions = (state = {}, action) => {
  switch (action.type) {
    case "SET_PRODUCTION":
      return {
        ...state,
        [action.production.address]: action.production
      };
    default:
      return state;
  }
};

export default productions;
