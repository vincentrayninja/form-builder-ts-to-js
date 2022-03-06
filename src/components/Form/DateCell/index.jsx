import React, { forwardRef, useCallback, useMemo } from "react";
import { DatePicker } from "antd";
import { FormGroup } from "../Designer/FormGroup";
import moment from "moment";
import CellControls from "../CellControls";
import { Controller } from "react-hook-form";
const elementStyle = { width: "100%" };
export const DateCell = forwardRef(({ data, layout, onChange, control }, ref) => {
    const handleChange = useCallback((date) => onChange(date ? date.format("YYYY-MM-DD HH:mm:ss") : null), [onChange]);
    const label = useMemo(() => data.labeled ? <label title={data.label}>{data.label}</label> : <></>, [data.label, data.labeled]);
    return (<>
        <FormGroup ref={ref} required={!!data.required} warning={data.warning} layout={layout} warnable={data.warnable} label={label} element={control !== undefined ? (<Controller name={data.id} control={control} render={({ field }) => (<>
                    <DatePicker {...field} style={elementStyle} disabled={data.disabled} value={data.value ? moment(data.value) : null} placeholder={data.placeholder} onChange={(e) => {
        handleChange(e);
        field.onChange(e ? e.format("YYYY-MM-DD HH:mm:ss") : null);
    }}/>
                    {data.controls ? <CellControls data={data}/> : ""}
                  </>)}/>) : (<>
                <DatePicker style={elementStyle} disabled={data.disabled} value={data.value ? moment(data.value) : null} placeholder={data.placeholder} onChange={handleChange}/>
                {data.controls ? <CellControls data={data}/> : ""}
              </>)}/>
      </>);
});
