import React from "react";
import CellBooleanPropConfig from "./CellBooleanPropConfig";
const CellControlsConfig = ({ data }) => {
    return (<CellBooleanPropConfig data={data} prop={"controls"} label={"Controls"}/>);
};
export default CellControlsConfig;
