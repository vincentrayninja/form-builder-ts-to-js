import React from "react";
import { Pool } from "./Pool";
export const GridCell = ({ data, direction, customCells, control, }) => {
    return (<Pool cellData={data} direction={direction} customCells={customCells} control={control}/>);
};
