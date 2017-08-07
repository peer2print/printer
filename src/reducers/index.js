import user from "./user";
import balance from "./balance";
import registry from "./registry";
import productions from "./productions";
import { combineReducers } from "redux";

const reducer = combineReducers({
  user,
  balance,
  registry,
  productions,
  registryUpdateError: (state = "No updates yet", action) => {
    switch (action.type) {
      case "SET_REGISTRY_UPDATE_ERROR":
        return action.error;
      default:
        return state;
    }
  }
});

export default reducer;
