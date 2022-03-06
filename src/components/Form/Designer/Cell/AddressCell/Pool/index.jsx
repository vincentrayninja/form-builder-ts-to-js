import React, { forwardRef, useCallback, useContext, useMemo } from "react";
import { Button, Col, Row } from "antd";
import styled from "styled-components";
import update from "immutability-helper";
import { InstanceContext } from "../../../../index";
import { DndLane } from "./DndLane";
import { Lane } from "./Lane";
import "./index.css";
import { FormGroup } from "../../../FormGroup";
const InstanceListHeaderItem = styled(Col) `
  padding: 0 10px;
  white-space: nowrap;
  width: 100%;
  overflow-x: auto;

  > div {
    width: 200px;
    display: inline-block;
  }
`;
export const Pool = forwardRef(({ direction = "horizontal", cellData, customCells }, ref) => {
    const instanceDispatch = useContext(InstanceContext);
    const isDesigner = instanceDispatch === null;
    const getLane = useCallback((lane, index) => {
        const props = {
            key: `${cellData.id}-${index}`,
            direction: direction,
            cellDataList: lane.cellDataList,
            location: {
                parentId: cellData.id,
                index: index,
            },
            span: lane.span,
            customCells: customCells,
        };
        return isDesigner ? <DndLane {...props}/> : <Lane {...props}/>;
    }, [cellData.id, customCells, direction, isDesigner]);
    let newCellData = {
        ...cellData,
        lanes: [
            {
                span: 24,
                cellDataList: [
                    {
                        type: "input",
                        id: "email",
                        active: false,
                        label: "Email",
                        required: true,
                        disabled: false,
                        unique: true,
                        format: "email",
                    },
                    {
                        type: "input",
                        id: "name",
                        active: false,
                        label: "Name",
                        required: true,
                        defaultValue: "",
                        format: "none",
                    },
                    {
                        type: "checkbox",
                        id: "color",
                        active: false,
                        label: "Color",
                        options: [
                            { label: "Red", value: "red" },
                            { label: "White", value: "white" },
                        ],
                        required: true,
                        disabled: true,
                    },
                    {
                        type: "gender",
                        id: "gender",
                        active: true,
                        label: "Gender",
                        options: [],
                        required: true,
                        disabled: false,
                    },
                ],
            },
        ],
    };
    console.log("cellData", cellData, "newCellData", newCellData);
    const lanes = useMemo(() => newCellData.lanes.map((lane, index) => getLane(lane, index)), [newCellData.lanes, getLane]);
    return (<>
        <p>Address</p>
        <Row ref={ref} className={"lanes"}>
          {direction === "horizontal" ? (<>{lanes}</>) : (<FormGroup required={!!newCellData.required} warning={newCellData.warning} warnable={newCellData.warnable} element={<>
                  {!isDesigner && (<InstanceListHeaderItem span={24}>
                      {newCellData.lanes[0].cellDataList.map((item) => (<div key={item.id}>
                          {item.required && (<span style={{ color: "red" }}>*</span>)}
                          <span>{item.label}</span>
                        </div>))}
                    </InstanceListHeaderItem>)}
                  {lanes}
                  {!isDesigner && direction === "vertical" && (<Button size={"small"} onClick={() => instanceDispatch({
        type: "UPDATE",
        data: update(cellData, {
            lanes: {
                $push: [
                    update(cellData.lanes[0], {
                        cellDataList: {
                            $apply: (x) => x.map((y) => ({
                                ...y,
                                value: null,
                            })),
                        },
                        hiddenValues: {
                            $apply: () => ({}),
                        },
                    }),
                ],
            },
        }),
    })} type={"link"}>
                      Add Line
                    </Button>)}
                </>} label={<span>{cellData.label}</span>}/>)}
        </Row>
      </>);
});
