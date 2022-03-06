import React from "react";
import CellTextPropConfig from "./CellTextPropConfig";
import { InputCellData } from "./InputCell/schema";

const CellCustomFormatConfig = ({ data }: { data }): JSX.Element => {
  return (
    <CellTextPropConfig
      data={data}
      label={"CustomizeFormat"}
      prop={"customFormat"}
    />
  );
};

export default CellCustomFormatConfig;
