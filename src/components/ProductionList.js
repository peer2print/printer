import React from 'react'
import ProductionViewer from "./ProductionViewer.js"

export default function ProductionList(props) {
	const productions = props.productionList;
	const listItems = productions.map((production) => {
			if (production)
				return <li key={production.address}><ProductionViewer production={production} /></li>
			else
				return null
		}
	);
	return (
		<ul>{listItems}</ul>
	);
}
