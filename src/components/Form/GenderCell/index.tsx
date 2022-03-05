import React from "react";
import { Select } from "antd";
import { FormGroup } from "../Designer/FormGroup";
import { CellProps } from "../schema";
import { GenderCellData } from "./schema";
import CellControls from "../CellControls";
import { Controller } from "react-hook-form";

const { Option } = Select;

interface GenderCellProps extends CellProps {
  data: GenderCellData;
}

let options = [
  { label: "Male", value: "0", key: 1 },
  { label: "Female", value: "1", key: 2 },
  { label: "Other", value: "2", key: 3 },
];

export const GenderCell = ({
  data,
  layout,
  onChange,
  control,
}: GenderCellProps): JSX.Element => {
  return (
    <>
      <FormGroup
        required={!!data.required}
        warning={data.warning}
        layout={layout}
        warnable={data.warnable}
        label={
          data.labeled ? <label title={data.label}>{data.label}</label> : <></>
        }
        element={
          control === undefined ? (
            <>
              <Select
                placeholder={data.placeholder}
                disabled={data.disabled}
                style={{ width: "100%" }}
                onChange={(value) => onChange(value)}
              >
                {options.map((option) => (
                  <Option key={option.key} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
              {data.controls ? <CellControls data={data} /> : ""}
            </>
          ) : (
            <Controller
              name={data.id as any}
              control={control}
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    placeholder={data.placeholder}
                    disabled={data.disabled}
                    style={{ width: "100%" }}
                    onChange={(value) => {
                      onChange(value);
                      field.onChange(value);
                    }}
                  >
                    {options.map((option) => (
                      <Option key={option.key} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                  {data.controls ? <CellControls data={data} /> : ""}
                </>
              )}
            />
          )
        }
      />
    </>
  );
};
