import React from "react";
import { Form } from "antd";
import CellLabelConfig from "../../CellLabelConfig";
import CellRequiredConfig from "../../CellRequiredConfig";
import CellReadonlyConfig from "../../CellReadonlyConfig";
import CellOptionsConfig from "../../CellOptionsConfig";
import { labelCol } from "../../Designer/constant";
import CellIdConfig from "../../CellIdConfig";
import CellControlsConfig from "../../CellControlsConfig";
export default function SelectCellConfig({ data, }) {
    return (<>
      <Form labelCol={labelCol}>
        <CellIdConfig data={data}/>
        <CellLabelConfig data={data}/>
        <CellRequiredConfig data={data}/>
        <CellReadonlyConfig data={data}/>
        <CellControlsConfig data={data}/>
        <CellOptionsConfig data={data}/>
      </Form>
    </>);
}
