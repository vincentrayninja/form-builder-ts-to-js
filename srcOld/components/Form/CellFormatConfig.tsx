import React from "react";
import CellEnumPropConfig from "./CellEnumPropConfig";
import { InputCellData } from "./InputCell/schema";

const options = [
  {
    value: "none",
    label: "None",
  },
  {
    value: "mobile",
    label: "Mobile",
  },
  {
    value: "email",
    label: "Email",
  },
  {
    value: "custom",
    label: "Custom",
  },
];

const CellFormatConfig = ({ data }: { data }): JSX.Element => {
  return (
    <CellEnumPropConfig
      options={options}
      data={data}
      label={"Format"}
      prop={"format"}
    />
  );
};

export default CellFormatConfig;
