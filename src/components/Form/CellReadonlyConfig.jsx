import CellBooleanPropConfig from "./CellBooleanPropConfig";
import React from "react";
const CellReadonlyConfig = ({ data }) => {
    return (<CellBooleanPropConfig data={data} prop={"disabled"} label={"Readonly"}/>);
};
export default CellReadonlyConfig;
