import user from "./user";
import balance from "./balance";
//import registry from './registry'
//import productions from './productions'
import { combineReducers } from "redux";

const reducer = combineReducers({
  user,
  balance
  //registry,
  //productions
});

export default reducer;
