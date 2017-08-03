export default (state = "", action) => {
  switch (action.type) {
    case "SET_REGISTRY":
      return action.registry;
    default:
      return state;
  }
};
