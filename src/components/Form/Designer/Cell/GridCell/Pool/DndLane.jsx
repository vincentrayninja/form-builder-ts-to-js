import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { Lane } from "./Lane";
import { DesignerContext } from "../../../index";
import { createWidgetInstance } from "../../../util";
export const DndLane = function ({ cellDataList, direction, location, span = 24, customCells, control, }) {
    const dispatch = useContext(DesignerContext);
    const [{ isOver }, drop] = useDrop({
        accept: [
            "input",
            "grid",
            "section",
            "address",
            "textarea",
            "select",
            "gender",
            "datetime",
            "checkbox",
            "list",
            "instance",
            "label",
            "pages",
            "tab",
            ...(customCells || []).map((item) => item.type),
        ],
        drop: (item, monitor) => {
            if (isOver) {
                const clientOffset = monitor.getClientOffset();
                if (!clientOffset) {
                    return;
                }
                if (item.type === "instance") {
                    dispatch({
                        type: "MOVE",
                        id: item.id,
                        location: location,
                    });
                }
                else {
                    const instance = createWidgetInstance(item, customCells);
                    dispatch({
                        type: "ADD",
                        dragItem: instance,
                        location: location,
                    });
                }
            }
        },
        collect: (monitor) => {
            let isOver = monitor.isOver({ shallow: true });
            if (isOver && monitor.getItem().id === location.parentId) {
                isOver = false;
            }
            return { isOver: isOver };
        },
    });
    return (<Lane control={control} location={location} span={span} cellDataList={cellDataList} className={isOver ? " hovered" : ""} ref={drop} direction={direction} customCells={customCells}/>);
};
