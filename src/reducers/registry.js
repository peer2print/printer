export default (
  state = { address: "", error: "Type the registry address" },
  action
) => {
  switch (action.type) {
    case "SET_REGISTRY":
      return { ...state, address: action.address };
    case "SET_REGISTRY_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};
