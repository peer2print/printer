import React from "react";
import ProductionViewer from "./ProductionViewer.js";

export default function ProductionList({
  productions,
  user,
  updateError,
  approveRequest,
  payCollateral,
  finishProduct,
  confirmExchange
}) {
  const listItems = Object.keys(productions).map(address => {
    const production = productions[address];
    if (production)
      return (
        <li key={address}>
          <ProductionViewer
            production={production}
            user={user}
            approveRequest={() => approveRequest(address)}
            payCollateral={() =>
              payCollateral(address, Number(production.minimumCollateral) + 1)}
            finishProduct={() => finishProduct(address)}
            confirmExchange={() => {
              confirmExchange(
                address,
                Number(production.price) - Number(production.balance)
              );
            }}
          />
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
