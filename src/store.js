import reducer from "./reducers";
import thunk from "redux-thunk";
import persistState from "redux-localstorage";
import { compose, createStore, applyMiddleware } from "redux";

const enhancer = compose(
  applyMiddleware(thunk),
  persistState(/*paths, config*/)
);

const store = createStore(reducer, enhancer);
console.log("Loaded store");

export default store;
