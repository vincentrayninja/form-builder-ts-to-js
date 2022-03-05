import React from "react";
import { Form } from "antd";
import CellLabelConfig from "../../CellLabelConfig";
import CellRequiredConfig from "../../CellRequiredConfig";
import CellReadonlyConfig from "../../CellReadonlyConfig";
import CellIdConfig from "../../CellIdConfig";
import { labelCol } from "../../Designer/constant";
import { GenderCellData } from "../schema";
import CellControlsConfig from "../../CellControlsConfig";

interface GenderCellConfigProps {
  data: GenderCellData;
}

export default function GenderCellConfig({
  data,
}: GenderCellConfigProps): JSX.Element {
  return (
    <>
      <Form labelCol={labelCol}>
        <CellIdConfig data={data} />
        <CellLabelConfig data={data} />
        <CellRequiredConfig data={data} />
        <CellReadonlyConfig data={data} />
        <CellControlsConfig data={data} />
      </Form>
    </>
  );
}
