import React from "react";
import { Form } from "antd";
import CellLabelConfig from "../CellLabelConfig";
import CellIdConfig from "../CellIdConfig";
import { labelCol } from "../Designer/constant";
export default function LabelCellConfig({ data }) {
    return (<>
      <Form labelCol={labelCol}>
        <CellIdConfig data={data}/>
        <CellLabelConfig data={data}/>
      </Form>
    </>);
}
