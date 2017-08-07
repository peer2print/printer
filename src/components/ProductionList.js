import React from "react";
import ProductionViewer from "./ProductionViewer.js";

export default function ProductionList({ productions, updateError }) {
  const listItems = Object.keys(productions).map(address => {
    const production = productions[address];
    console.log("rendering");
    console.log(production);
    if (production)
      return (
        <li key={address}>
          <ProductionViewer production={production} />
        </li>
      );
    else return null;
  });
  return (
    <div>
      {updateError || "Synced"}
      <ul>
        {listItems}
      </ul>
    </div>
  );
}
