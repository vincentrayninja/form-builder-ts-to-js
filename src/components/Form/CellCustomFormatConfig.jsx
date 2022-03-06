import React from "react";
import CellTextPropConfig from "./CellTextPropConfig";
const CellCustomFormatConfig = ({ data, }) => {
    return (<CellTextPropConfig data={data} label={"CustomizeFormat"} prop={"customFormat"}/>);
};
export default CellCustomFormatConfig;
