import React, { useContext, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DesignerContext } from "./index";
import { createWidgetInstance } from "./util";
import { Cell } from "./Cell";
import DeleteTwoTone from "@ant-design/icons/DeleteTwoTone";
export const DnDCell = function ({ cellData, index, layout = "horizontal", className, customCells, location, style, control, }) {
    const data = {
        required: false,
        warnable: false,
        layout: "default",
        labeled: true,
        ...cellData,
    };
    const ref = useRef(null);
    const designerDispatch = useContext(DesignerContext);
    const [dropClassName, setDropClassName] = useState("");
    const [{ isOver }, drop] = useDrop({
        accept: [
            "instance",
            "input",
            "textarea",
            "select",
            "gender",
            "checkbox",
            "datetime",
            "grid",
            "section",
            "address",
            "list",
            "label",
            "pages",
            "tab",
            ...(customCells || []).map((item) => item.type),
        ],
        hover: (item, monitor) => {
            if (!ref.current ||
                !monitor.isOver({ shallow: true }) ||
                monitor.getItem().id === cellData.id ||
                !monitor.getClientOffset()) {
                setDropClassName("");
                return;
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            const coord = clientOffset;
            if (layout === "horizontal") {
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const hoverClientY = coord.y - hoverBoundingRect.top;
                setDropClassName(hoverClientY > hoverMiddleY
                    ? " drop-over-downward"
                    : " drop-over-upward");
            }
            else {
                const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
                const hoverClientX = coord.x - hoverBoundingRect.left;
                setDropClassName(hoverClientX > hoverMiddleX
                    ? " drop-over-rightward"
                    : " drop-over-leftward");
            }
        },
        collect: (monitor) => {
            return {
                isOver: monitor.isOver({ shallow: true }),
            };
        },
        drop(item, monitor) {
            if (!ref.current) {
                return;
            }
            if (!monitor.isOver({ shallow: true })) {
                return;
            }
            let position;
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            if (!clientOffset) {
                return;
            }
            if (layout === "horizontal") {
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const hoverClientY = clientOffset.y - hoverBoundingRect.top;
                position = hoverClientY > hoverMiddleY ? "down" : "up";
            }
            else {
                const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
                const hoverClientX = clientOffset.x - hoverBoundingRect.left;
                position = hoverClientX > hoverMiddleX ? "down" : "up";
            }
            if (item.type === "instance") {
                designerDispatch({
                    type: "POSITIONED_MOVE",
                    id: monitor.getItem().id,
                    position: position,
                    dropItemId: cellData.id,
                });
            }
            else {
                const instance = createWidgetInstance(item, customCells);
                designerDispatch({
                    type: "POSITIONED_ADD",
                    position: position,
                    dropItemId: cellData.id,
                    dragItem: instance,
                });
            }
        },
    });
    const [{ isDragging }, drag] = useDrag({
        item: { type: "instance", id: cellData.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        begin: () => {
            designerDispatch({
                type: "ACTIVE",
                id: cellData.id,
            });
        },
    });
    drag(drop(ref));
    return (<>
             <Cell control={control} location={location} customCells={customCells} className={`${isOver ? dropClassName : ""} ${className || ""}`} onClick={(event) => {
        event.stopPropagation();
        designerDispatch({
            type: "ACTIVE",
            id: cellData.id,
        });
        designerDispatch({
            type: "EDIT",
            id: cellData.id,
        });
    }} ref={ref} style={{ opacity: isDragging ? "0.5" : 1, ...style }} cellData={data} layout={layout}>
               {data.active ? (<div style={{
        position: "absolute",
        top: 0,
        right: "4px",
        zIndex: 1,
    }}>
                   <DeleteTwoTone className="cursor-pointer" onClick={() => designerDispatch({
        type: "DELETE",
        id: cellData.id,
    })}/>
                 </div>) : undefined}
             </Cell>
           </>);
};
