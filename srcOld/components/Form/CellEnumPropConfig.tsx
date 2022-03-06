import { Form, Select } from "antd";
import React, { useCallback } from "react";
import { CellData } from "./schema";
import { useCellDataProp } from "./hooks";

const CellTextPropConfig = ({
  data,
  label,
  prop,
  options,
}: {
  data;
  prop;
  label;
  options: { value; label }[];
}): JSX.Element => {
  const { update } = useCellDataProp(data, prop);
  const handleChange = useCallback(
    (value) => {
      update(value);
    },
    [update]
  );
  return (
    <Form.Item label={label}>
      <Select onChange={handleChange} placeholder={"None"} value={data.format}>
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            {option.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CellTextPropConfig;
