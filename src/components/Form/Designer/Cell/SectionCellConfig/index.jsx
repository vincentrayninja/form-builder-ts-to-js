import React, { useContext } from "react";
import { Form } from "antd";
import { DesignerContext } from "../../index";
import { labelCol } from "../../constant";
import CellIdConfig from "../../../CellIdConfig";
import CellLabelConfig from "../../../CellLabelConfig";
export default function SectionCellConfig({ data, }) {
    const designerDispatch = useContext(DesignerContext);
    return (<Form labelCol={labelCol}>
      <Form.Item label={"Section"}>
        <>
          {data &&
        data.lanes &&
        data.lanes.map((lane, index) => (<>
                <CellIdConfig data={data}/>
                <CellLabelConfig data={data}/>
                
              </>))}
          
        </>
      </Form.Item>
    </Form>);
}
