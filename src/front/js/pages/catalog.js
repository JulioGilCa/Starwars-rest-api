import React from "react";
import People from "../pages/people";
import Planets from "../pages/planets";
import Vehicles from "./vehicles";


const Catalog = () => {
	return (
		<div>
			<People />
			<Planets />
			<Vehicles />
		</div>
	);
};

export default Catalog;