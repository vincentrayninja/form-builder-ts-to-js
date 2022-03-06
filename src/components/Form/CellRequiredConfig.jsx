import CellBooleanPropConfig from "./CellBooleanPropConfig";
import React from "react";
const CellRequiredConfig = ({ data }) => {
    return (<CellBooleanPropConfig data={data} prop={"required"} label={"Required"}/>);
};
export default CellRequiredConfig;
