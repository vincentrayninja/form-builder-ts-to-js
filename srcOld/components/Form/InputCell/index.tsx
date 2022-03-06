import React, { useCallback, useMemo } from "react";
import { Input } from "antd";
import { CellProps } from "../schema";
import { FormGroup } from "../Designer/FormGroup";
import CellControls from "../CellControls";
import { Controller, useForm } from "react-hook-form";

const InputCell = ({
  data,
  layout,
  onChange,
  control,
}: CellProps): JSX.Element => {
  const label = useMemo(
    () =>
      data.labeled ? <label title={data.label}>{data.label}</label> : <></>,
    [data.label, data.labeled]
  );

  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );
  // console.log("data.id", typeof data);
  const element = useMemo(
    () =>
      control === undefined ? (
        <>
          <Input
            disabled={data.disabled}
            value={data.value}
            placeholder={data.placeholder}
            onChange={handleChange}
          />

          {data.controls ? <CellControls data={data} /> : ""}
        </>
      ) : (
        <Controller
          name={data.id as any}
          control={control}
          render={({ field }) => (
            <>
              <Input
                {...field}
                disabled={data.disabled}
                value={data.value}
                placeholder={data.placeholder}
                onChange={(e) => {
                  handleChange(e);
                  field.onChange(e);
                }}
              />

              {data.controls ? <CellControls data={data} /> : ""}
            </>
          )}
        />
      ),
    [data.disabled, data.placeholder, data.value, data.controls, handleChange]
  );

  return (
    <>
      <FormGroup
        required={typeof data.required === "function" ? true : data.required}
        warning={data.warning}
        layout={layout}
        warnable={data.warnable}
        label={label}
        element={element}
      />
    </>
  );
};
export default InputCell;
