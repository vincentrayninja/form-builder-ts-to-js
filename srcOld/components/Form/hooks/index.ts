import { useContext } from "react";
import { DesignerContext } from "../Designer";
import update from "immutability-helper";
import { CellData } from "../schema";

export function useCellDataProp(data, prop): { update(value: unknown) } {
  const designerDispatch = useContext(DesignerContext);
  return {
    update(value: unknown) {
      designerDispatch({
        type: "UPDATE",
        data: update(data, {
          [prop]: { $set: value },
        }),
        id: data.id,
      });
    },
  };
}
