import React from "react";
import People from "./people";
import Planets from "./planets";
import Vehicles from "./vehicles";


const Catalog = () => {
	return (
		<div className="back_catalog">
			<People />
			<Planets />
			<Vehicles />
		</div>
	);
};

export default Catalog;