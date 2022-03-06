import React, { useState } from "react";
import { AutoComplete, Form, Typography } from "antd";
import CellLabelConfig from "../CellLabelConfig";
import CellRequiredConfig from "../CellRequiredConfig";
import CellReadonlyConfig from "../CellReadonlyConfig";
import CellIdConfig from "../CellIdConfig";
import { labelCol } from "../Designer/constant";
import CellControlsConfig from "../CellControlsConfig";
const { Text } = Typography;
export default function DateCellConfig({ data, }) {
    const defaultValueOptions = [
        {
            label: (<>
          <Text>now: </Text>
          <Text type={"secondary"}>Current Time</Text>
        </>),
            text: "now",
            value: "now",
        },
    ];
    const [currentDefaultValueOptions, setCurrentDefaultValueOptions] = useState(defaultValueOptions);
    return (<>
      <Form labelCol={labelCol}>
        <CellIdConfig data={data}/>
        <CellLabelConfig data={data}/>
        <CellRequiredConfig data={data}/>
        <CellReadonlyConfig data={data}/>
        <CellControlsConfig data={data}/>
        <Form.Item label={"Default"}>
          <AutoComplete onSearch={(searchText) => {
        setCurrentDefaultValueOptions(defaultValueOptions.filter((item) => item.text.search(new RegExp(searchText, "i")) > -1));
    }}>
            {currentDefaultValueOptions.map((option) => (<AutoComplete.Option value={option.value} key={option.value}>
                {option.label}
              </AutoComplete.Option>))}
          </AutoComplete>
        </Form.Item>
      </Form>
    </>);
}
