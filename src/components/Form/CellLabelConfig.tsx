import React from "react";
import { CellData } from "./schema";
import CellTextPropConfig from "./CellTextPropConfig";

const CellLabelConfig = ({ data }: { data: CellData }): JSX.Element => {
  return <CellTextPropConfig data={data} label={"Title"} prop={"label"} />;
};

export default CellLabelConfig;
