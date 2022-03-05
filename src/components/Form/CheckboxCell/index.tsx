import React from "react";
import { CellProps } from "../schema";
import { FormGroup } from "../Designer/FormGroup";
import { Checkbox } from "antd";
import CellControls from "../CellControls";
import { Controller } from "react-hook-form";

export default function CheckboxCell({
  data,
  layout,
  onChange,
  control,
}: CellProps): JSX.Element {
  return (
    <>
      <FormGroup
        layout={layout}
        required={!!data.required}
        warnable={data.warnable}
        label={<label>{data.label}</label>}
        element={
          control !== undefined ? (
            <Controller
              name={data.id as any}
              control={control}
              render={({ field }) => (
                <>
                  <Checkbox.Group
                    options={data.options}
                    onChange={(checkedValues) => {
                      onChange(checkedValues);
                      field.onChange(checkedValues);
                    }}
                  />
                  {data.controls ? <CellControls data={data} /> : ""}
                </>
              )}
            />
          ) : (
            <>
              <Checkbox.Group
                options={data.options}
                onChange={(checkedValues) => onChange(checkedValues)}
              />
              {data.controls ? <CellControls data={data} /> : ""}
            </>
          )
        }
      />
    </>
  );
}
