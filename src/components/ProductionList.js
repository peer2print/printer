import React from 'react'

import ProductionViewer from "./ProductionViewer.js"

export default function ProductionList(props) {
	const prods = props.prodList;
	const listItems = prods.map((prod) => {
			if (prod)
				return <li key={prod.address}><ProductionViewer prod={prod} /></li>
			else
				return null
		}
	);
	return (
		<ul>{listItems}</ul>
	);
}
