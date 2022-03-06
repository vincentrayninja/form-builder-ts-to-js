import React from "react";
import { Pool } from "./Pool";
import { CustomCell } from "../index";
import { LanedCellData } from "../../../schema";

interface AddressCellProps {
  data: LanedCellData;
  direction?: "horizontal" | "vertical";
  customCells?: CustomCell[];
}

export const AddressCell = ({
  data,
  direction,
  customCells,
}: AddressCellProps): JSX.Element => {
  return (
    <>
      <p>Working</p>
      <Pool cellData={data} direction={direction} customCells={customCells} />
    </>
  );
};
