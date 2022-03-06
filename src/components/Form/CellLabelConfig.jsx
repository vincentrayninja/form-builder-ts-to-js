import React from "react";
import CellTextPropConfig from "./CellTextPropConfig";
const CellLabelConfig = ({ data }) => {
    return <CellTextPropConfig data={data} label={"Title"} prop={"label"}/>;
};
export default CellLabelConfig;
