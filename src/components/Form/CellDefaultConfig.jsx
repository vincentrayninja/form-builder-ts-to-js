import React from "react";
import CellTextPropConfig from "./CellTextPropConfig";
const CellDefaultConfig = ({ data }) => {
    return (<CellTextPropConfig data={data} label={"Defaults"} prop={"defaultValue"}/>);
};
export default CellDefaultConfig;
