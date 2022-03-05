import React from "react";
import { CellData } from "../schema";
import { Form } from "antd";
import CellLabelConfig from "../CellLabelConfig";
import CellIdConfig from "../CellIdConfig";
import { labelCol } from "../Designer/constant";

interface LabelCellConfigProps {
  data: CellData;
}

export default function LabelCellConfig({ data }: LabelCellConfigProps) {
  return (
    <>
      <Form labelCol={labelCol}>
        <CellIdConfig data={data} />
        <CellLabelConfig data={data} />
      </Form>
    </>
  );
}
