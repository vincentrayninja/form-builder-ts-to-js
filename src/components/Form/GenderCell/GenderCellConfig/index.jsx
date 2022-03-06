import React from "react";
import { Form } from "antd";
import CellLabelConfig from "../../CellLabelConfig";
import CellRequiredConfig from "../../CellRequiredConfig";
import CellReadonlyConfig from "../../CellReadonlyConfig";
import CellIdConfig from "../../CellIdConfig";
import { labelCol } from "../../Designer/constant";
import CellControlsConfig from "../../CellControlsConfig";
export default function GenderCellConfig({ data, }) {
    return (<>
      <Form labelCol={labelCol}>
        <CellIdConfig data={data}/>
        <CellLabelConfig data={data}/>
        <CellRequiredConfig data={data}/>
        <CellReadonlyConfig data={data}/>
        <CellControlsConfig data={data}/>
      </Form>
    </>);
}
