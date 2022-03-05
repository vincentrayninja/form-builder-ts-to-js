import React from "react";
import { CellData } from "./schema";
import CellTextPropConfig from "./CellTextPropConfig";

const CellDefaultConfig = ({ data }: { data: CellData }): JSX.Element => {
  return (
    <CellTextPropConfig data={data} label={"Defaults"} prop={"defaultValue"} />
  );
};

export default CellDefaultConfig;
