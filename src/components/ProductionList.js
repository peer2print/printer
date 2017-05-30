import React from 'react'

import ProductionViewer from "./ProductionViewer.js"

export default function ProductionList(props) {
  const prods = props.prodList;
  console.log("prod in productionlist comp: "+prods)
  const listItems = prods.map((prod) =>
    <li key={prod.address}><ProductionViewer prod={prod} /></li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
