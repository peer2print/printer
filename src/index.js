import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import { updateRegistry } from "./actions";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

setInterval(() => store.dispatch(updateRegistry()), 5000);
