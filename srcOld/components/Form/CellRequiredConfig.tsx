import CellBooleanPropConfig from "./CellBooleanPropConfig";
import React from "react";
import { CellData } from "./schema";

const CellRequiredConfig = ({ data }: { data }): JSX.Element => {
  return (
    <CellBooleanPropConfig data={data} prop={"required"} label={"Required"} />
  );
};

export default CellRequiredConfig;
