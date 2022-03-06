import React from "react";
import CellTextPropConfig from "./CellTextPropConfig";
const CellOnChangeConfig = ({ data }) => {
    return (<CellTextPropConfig data={data} label={"OnChange"} prop={"rawOnChange"}/>);
};
export default CellOnChangeConfig;
