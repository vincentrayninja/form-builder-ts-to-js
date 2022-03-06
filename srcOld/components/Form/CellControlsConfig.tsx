import React from "react";
import CellBooleanPropConfig from "./CellBooleanPropConfig";
import { CellData } from "./schema";

const CellControlsConfig = ({ data }: { data }): JSX.Element => {
  return (
    <CellBooleanPropConfig data={data} prop={"controls"} label={"Controls"} />
  );
};

export default CellControlsConfig;
