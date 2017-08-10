import "../node_modules/bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import persistState from "redux-localstorage";
import { Provider } from "react-redux";

import registerServiceWorker from "./registerServiceWorker";
import App from "./App";
import reducer from "./reducers";
import { updateRegistry, cleanRegistry } from "./actions";

import "./index.css";

const enhancer = compose(
  applyMiddleware(thunk),
  applyMiddleware(logger),
  persistState(/*paths, config*/)
);

const store = createStore(reducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

setInterval(() => store.dispatch(updateRegistry()), 5000);
setInterval(() => store.dispatch(cleanRegistry()), 5000);
