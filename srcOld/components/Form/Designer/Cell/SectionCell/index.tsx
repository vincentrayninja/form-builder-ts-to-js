import React from "react";
import { Pool } from "./Pool";
import { CustomCell } from "../index";
import { LanedCellData } from "../../../schema";

interface SectionCellProps {
  data: LanedCellData;
  direction?: "horizontal" | "vertical";
  customCells?: CustomCell[];
  control?;
}

export const SectionCell = ({
  data,
  direction,
  customCells,
  control,
}: SectionCellProps): JSX.Element => {
  return (
    <Pool
      control={control}
      cellData={data}
      direction={direction}
      customCells={customCells}
    />
  );
};
