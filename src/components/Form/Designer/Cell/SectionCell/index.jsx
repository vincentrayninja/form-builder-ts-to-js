import React from "react";
import { Pool } from "./Pool";
export const SectionCell = ({ data, direction, customCells, control, }) => {
    return (<Pool control={control} cellData={data} direction={direction} customCells={customCells}/>);
};
