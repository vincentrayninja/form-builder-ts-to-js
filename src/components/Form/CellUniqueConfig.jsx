import CellBooleanPropConfig from "./CellBooleanPropConfig";
import React from "react";
const CellUniqueConfig = ({ data }) => {
    return <CellBooleanPropConfig data={data} prop={"unique"} label={"Unique"}/>;
};
export default CellUniqueConfig;
