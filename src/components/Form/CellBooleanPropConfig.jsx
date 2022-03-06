import { Form, Switch } from "antd";
import React, { useCallback } from "react";
import { useCellDataProp } from "./hooks";
const CellBooleanPropConfig = ({ data, label, prop, }) => {
    const { update } = useCellDataProp(data, prop);
    const handleChange = useCallback((value) => {
        update(value);
    }, [update]);
    return (<Form.Item label={label}>
      <Switch checked={!!data[prop]} onChange={handleChange}/>
    </Form.Item>);
};
export default CellBooleanPropConfig;
