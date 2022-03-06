import React, { useContext } from "react";
import { Form } from "antd";
import { DesignerContext } from "../../index";
import { labelCol } from "../../constant";
export default function AddressCellConfig({ data, }) {
    const designerDispatch = useContext(DesignerContext);
    return (<Form labelCol={labelCol}>
      <Form.Item label={"Address"}>
        <>
          {data &&
        data.lanes &&
        data.lanes.map((lane, index) => (<>
                
              </>))}
          
        </>
      </Form.Item>
    </Form>);
}
