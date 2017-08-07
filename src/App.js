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
  <div className="App">
    <h1>Peer2Print</h1>
    <h2>CURRENT USER</h2>
    <CurrentUser />
    <h2>REGISTRY</h2>
    <CurrentRegistry>
      <RegistrySetter />
      <RegistryCreator />
    </CurrentRegistry>
    <h2>NEW REQUEST</h2>
    <NewProduction />
    <h2>OWN PRODUCTIONS</h2>
    <OwnProductions />
    <h2>OTHERS PRODUCTIONS</h2>
    <OthersProductions />
  </div>;
