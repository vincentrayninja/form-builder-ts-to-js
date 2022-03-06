import React from "react";
import { Form } from "antd";
import CellLabelConfig from "../CellLabelConfig";
import CellRequiredConfig from "../CellRequiredConfig";
import CellReadonlyConfig from "../CellReadonlyConfig";
import CellOptionsConfig from "../CellOptionsConfig";
import CellIdConfig from "../CellIdConfig";
import { labelCol } from "../Designer/constant";
import { SelectCellData } from "../SelectCell/schema";
import CellControlsConfig from "../CellControlsConfig";

interface CheckboxCellConfigProps {
  data: SelectCellData;
}

export default function CheckboxCellConfig({
  data,
}: CheckboxCellConfigProps): JSX.Element {
  return (
    <>
      <Form labelCol={labelCol}>
        <CellIdConfig data={data} />
        <CellLabelConfig data={data} />
        <CellRequiredConfig data={data} />
        <CellReadonlyConfig data={data} />
        <CellControlsConfig data={data} />
        <CellOptionsConfig data={data} />
      </Form>
    </>
  );
}
