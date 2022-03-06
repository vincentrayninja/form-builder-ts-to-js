import React, { forwardRef, useContext, useMemo, useState } from "react";
import { DnDCell } from "../../../DnDCell";
import { Cell } from "../../index";
import { InstanceContext } from "../../../../index";
import { Button, Col } from "antd";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import { useTimeoutFn } from "react-use";
export const Lane = forwardRef(({ cellDataList, direction, className, span = 24, customCells, location, control, }, ref) => {
    const instanceDispatch = useContext(InstanceContext);
    const [mouseOver, setMouseOver] = useState(false);
    const [, cancel, reset] = useTimeoutFn(() => {
        setMouseOver(false);
    }, 1000);
    const cells = useMemo(() => {
        return cellDataList.map((child, index) => {
            const props = {
                location,
                key: child.id,
                layout: direction,
                cellData: child,
                customCells,
                style: {
                    width: child.width,
                },
            };
            return instanceDispatch === null ? (<DnDCell {...props} index={index} control={control}/>) : (<Cell {...props} control={control}/>);
        });
    }, [
        cellDataList,
        customCells,
        direction,
        instanceDispatch,
        location,
    ]);
    return (<Col span={span} onMouseOver={() => {
        cancel();
        setMouseOver(true);
    }} onMouseOut={reset} className={`lane ${direction}${className || ""}`}>
               <div className="w-full h-full relative min-h-px-42" ref={ref}>
                 {cells}
                 {direction === "vertical" && mouseOver && (<Button onClick={() => instanceDispatch({
        type: "DELETE_LANE",
        ...location,
    })} className="absolute cursor-pointer -right-px-16 top-px-8" type={"link"} size={"small"} icon={<DeleteOutlined />}/>)}
               </div>
             </Col>);
});
