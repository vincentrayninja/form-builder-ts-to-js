import React, { useContext } from "react";
import PageConfig from "./PageConfig";
import update from "immutability-helper";
import { Button, Form } from "antd";
import { DesignerContext } from "../../../index";
import { labelCol } from "../../../constant";
export default function PageCellConfig({ data, }) {
    const designerDispatch = useContext(DesignerContext);
    return (<Form labelCol={labelCol}>
      <Form.Item label={"Tab"}>
        <>
          {data &&
        data.tabs &&
        data.tabs.map((tab, index) => (<PageConfig key={"tab-config-" + index} index={index} name={tab} onRename={(name) => {
            designerDispatch({
                type: "UPDATE",
                data: {
                    ...data,
                    tabs: update(data.tabs, {
                        [index]: { $set: name },
                    }),
                },
            });
        }} onRemove={() => {
            designerDispatch({
                type: "UPDATE",
                data: {
                    ...data,
                    tabs: update(data.tabs, {
                        $splice: [[index, 1]],
                    }),
                    lanes: update(data.lanes, {
                        $splice: [[index, 1]],
                    }),
                },
            });
        }} move={(from, to) => {
            const dragItem = data.tabs[from];
            designerDispatch({
                type: "UPDATE",
                data: {
                    ...data,
                    tabs: update(data.tabs, {
                        $splice: [
                            [from, 1],
                            [to, 0, dragItem],
                        ],
                    }),
                    lanes: update(data.lanes, {
                        $splice: [
                            [from, 1],
                            [to, 0, data.lanes[from]],
                        ],
                    }),
                },
            });
        }}/>))}
          <Button type={"link"} onClick={() => {
        const copy = { ...data };
        copy.lanes.push({ cellDataList: [], span: 0 });
        copy.tabs?.push("NewPage");
        designerDispatch({
            type: "UPDATE",
            data: copy,
        });
    }}>
            Add
          </Button>
        </>
      </Form.Item>
    </Form>);
}
