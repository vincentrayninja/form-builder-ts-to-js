import React, { forwardRef } from "react";
export const LabelCell = forwardRef(({ data }, ref) => (<div style={{ height: 42, padding: "0 10px" }} ref={ref}>
    <label style={{ lineHeight: "42px" }} title={data.label}>
      {data.label || " "}
    </label>
  </div>));
