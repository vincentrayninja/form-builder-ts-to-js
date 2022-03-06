import React, { useCallback, useState } from "react";
import { Form, Input } from "antd";
import { useCellDataProp } from "./hooks";
const CellIdConfig = ({ data }) => {
    const { update } = useCellDataProp(data, "id");
    const [internalValue, setInternalValue] = useState(data["id"]);
    const handleChange = useCallback((event) => {
        setInternalValue(event.target.value);
    }, []);
    const handleBlur = useCallback((event) => {
        if (!event.target.value) {
            return;
        }
        update(event.target.value);
    }, [update]);
    return (<Form.Item label={"ID"}>
      <Input value={internalValue} onChange={handleChange} onBlur={handleBlur}/>
    </Form.Item>);
};
export default CellIdConfig;
