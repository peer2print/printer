import React from "react";
import "./App.css";
import RegistrySetter from "./components/RegistrySetter.js";
import CurrentUser from "./containers/CurrentUser";
import CurrentRegistry from "./containers/CurrentRegistry";
import RegistryCreator from "./components/RegistryCreator";
import {
  OwnProductions,
  OthersProductions
} from "./containers/productionLists";
import NewProduction from "./containers/NewProduction";

// You can use these addresses if you run `testrpc -d`
// Registry: 0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab
// Bob: 0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1
// Alice: 0xffcf8fdee72ac11b5c542428b35eef5769c409f0

export default () =>
  <div className="app">
    <div className="header module">
      <h1>Peer2Print</h1>
    </div>
    <div className="user top-module module">
      <h2>CURRENT USER</h2>
      <CurrentUser />
    </div>
    <div className="new-request top-module module">
      <h2>NEW REQUEST</h2>
      <NewProduction />
    </div>
    <div className="registry top-module module">
      <h2>REGISTRY</h2>
      <CurrentRegistry>
        <RegistrySetter />
        <RegistryCreator />
      </CurrentRegistry>
    </div>
    <div className="own-requests bottom-module module">
      <h2>OWN REQUESTS</h2>
      <OwnProductions />
    </div>
    <div className="others-requests bottom-module module">
      <h2>OTHERS REQUESTS</h2>
      <OthersProductions />
    </div>
  </div>;
