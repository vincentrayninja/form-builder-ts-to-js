import { useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import { DesignerContext } from "../Form/Designer";
export function useVerticalDragDropMemberRef(index, move) {
    const ref = useRef(null);
    const [, drag] = useDrag({
        item: {
            type: "config",
            index: index,
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const [, drop] = useDrop({
        accept: "config",
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            move(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });
    drag(drop(ref));
    return ref;
}
export function useVerticalDragDropMemberEvent(data) {
    const designerDispatch = useContext(DesignerContext);
    return {
        onChange(index, label, value) {
            designerDispatch({
                type: "UPDATE",
                data: {
                    ...data,
                    options: update(data.options, {
                        [index]: {
                            label: { $set: label || "" },
                            value: { $set: value || "" },
                        },
                    }),
                },
            });
        },
        onRemove(index) {
            designerDispatch({
                type: "UPDATE",
                data: {
                    ...data,
                    options: update(data.options, {
                        $splice: [[index, 1]],
                    }),
                },
            });
        },
        move(from, to) {
            const dragItem = data.options[from];
            designerDispatch({
                type: "UPDATE",
                data: {
                    ...data,
                    options: update(data.options, {
                        $splice: [
                            [from, 1],
                            [to, 0, dragItem],
                        ],
                    }),
                },
            });
        },
    };
}
