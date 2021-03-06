import { Form, Input } from "antd";
import React, { useCallback, useState } from "react";
import { useCellDataProp } from "./hooks";
const CellTextPropConfig = ({ data, label, prop, }) => {
    const { update } = useCellDataProp(data, prop);
    const [internalValue, setInternalValue] = useState(data[prop]);
    const handleChange = useCallback((event) => {
        setInternalValue(event.target.value);
    }, []);
    const handleBlur = useCallback((event) => {
        update(event.target.value);
    }, [update]);
    return (<Form.Item label={label}>
      <Input value={internalValue} onChange={handleChange} onBlur={handleBlur}/>
    </Form.Item>);
};
export default CellTextPropConfig;
