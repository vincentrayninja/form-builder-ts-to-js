import React from "react";
import { Select } from "antd";
import { FormGroup } from "../Designer/FormGroup";
import CellControls from "../CellControls";
import { Controller } from "react-hook-form";
const { Option } = Select;
export const SelectCell = ({ data, layout, onChange, control, }) => {
    return (<>
      <FormGroup required={!!data.required} warning={data.warning} layout={layout} warnable={data.warnable} label={data.labeled ? <label title={data.label}>{data.label}</label> : <></>} element={control !== undefined ? (<Controller name={`${data.id}`} control={control} render={({ field }) => (<>
                  <Select {...field} placeholder={data.placeholder} disabled={data.disabled} style={{ width: "100%" }} onChange={(value) => {
        field.onChange(value);
        onChange(value);
    }}>
                    {data.options.map((option) => (<Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>))}
                  </Select>
                  {data.controls ? <CellControls data={data}/> : ""}
                </>)}/>) : (<>
              <Select placeholder={data.placeholder} disabled={data.disabled} style={{ width: "100%" }} onChange={onChange}>
                {data.options.map((option) => (<Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>))}
              </Select>
              {data.controls ? <CellControls data={data}/> : ""}
            </>)}/>
    </>);
};
