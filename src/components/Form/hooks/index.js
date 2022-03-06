import { useContext } from "react";
import { DesignerContext } from "../Designer";
import update from "immutability-helper";
export function useCellDataProp(data, prop) {
    const designerDispatch = useContext(DesignerContext);
    return {
        update(value) {
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
