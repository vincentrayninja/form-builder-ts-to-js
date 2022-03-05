import { Form, Switch } from "antd";
import React, { useCallback } from "react";
import { CellData } from "./schema";
import { useCellDataProp } from "./hooks";

const CellCustomControlConfig = ({
  data,
  label,
  prop,
}: {
  data: CellData;
  prop;
  label;
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
      <Switch checked={!!data[prop]} onChange={handleChange} />
    </Form.Item>
  );
};

export default CellCustomControlConfig;
