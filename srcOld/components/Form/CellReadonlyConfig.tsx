import CellBooleanPropConfig from "./CellBooleanPropConfig";
import React from "react";
import { CellData } from "./schema";

const CellReadonlyConfig = ({ data }: { data }): JSX.Element => {
  return (
    <CellBooleanPropConfig data={data} prop={"disabled"} label={"Readonly"} />
  );
};

export default CellReadonlyConfig;
