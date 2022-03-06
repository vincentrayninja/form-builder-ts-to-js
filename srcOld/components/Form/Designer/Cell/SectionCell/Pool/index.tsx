import React, { forwardRef, useCallback, useContext, useMemo } from "react";
import { Button, Col, Row, Collapse } from "antd";
import styled from "styled-components";
import update from "immutability-helper";
import { CellData, LaneData, LanedCellData } from "../../../../schema";
import { InstanceContext } from "../../../../index";
import { DndLane } from "./DndLane";
import { Lane } from "./Lane";
import "./index.css";
import { CustomCell } from "../../index";
import { FormGroup } from "../../../FormGroup";

interface PoolProps {
  direction?: "horizontal" | "vertical";
  cellData: LanedCellData;
  customCells?: CustomCell[];
  control?: any;
}

const InstanceListHeaderItem = styled(Col)`
  padding: 0 10px;
  white-space: nowrap;
  width: 100%;
  overflow-x: auto;

  > div {
    width: 200px;
    display: inline-block;
  }
`;

export const Pool = forwardRef(
  (
    { direction = "horizontal", cellData, customCells, control }: PoolProps,
    ref
  ) => {
    const { Panel } = Collapse;
    const instanceDispatch = useContext(InstanceContext);
    const isDesigner = instanceDispatch === null;
    const getLane = useCallback(
      (lane: LaneData, index: number) => {
        const props = {
          key: `${cellData.id}-${index}`,
          direction: direction,
          cellDataList: lane.cellDataList,
          location: {
            parentId.id,
            index: index,
          },
          span: lane.span,
          customCells: customCells,
        };
        return isDesigner ? (
          <DndLane {...props} />
        ) : (
          <Lane {...props} control={control} />
        );
      },
      [cellData.id, customCells, direction, isDesigner]
    );
    //  console.log("cellData", cellData);
    const lanes = useMemo(
      () => cellData.lanes.map((lane, index) => getLane(lane, index)),
      [cellData.lanes, getLane]
    );

    return (
      <>
        <Collapse accordion>
          <Panel header={cellData.label} key={cellData.id}>
            <Row ref={ref} className={"lanes"}>
              {direction === "horizontal" ? (
                <>{lanes}</>
              ) : (
                <FormGroup
                  required={!!cellData.required}
                  warning={cellData.warning}
                  warnable={cellData.warnable}
                  element={
                    <>
                      {!isDesigner && (
                        <InstanceListHeaderItem span={24}>
                          {cellData.lanes[0].cellDataList.map((item) => (
                            <div style={{ width: item.width }} key={item.id}>
                              {item.required && (
                                <span style={{ color: "red" }}>*</span>
                              )}
                              <span>{item.label}</span>
                            </div>
                          ))}
                        </InstanceListHeaderItem>
                      )}
                      {lanes}
                      {!isDesigner && direction === "vertical" && (
                        <Button
                          size={"small"}
                          onClick={() =>
                            instanceDispatch({
                              type: "UPDATE",
                              data: update(cellData, {
                                lanes: {
                                  $push: [
                                    update(cellData.lanes[0], {
                                      cellDataList: {
                                        $apply: (x[]) =>
                                          x.map((y) => ({
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
                            })
                          }
                          type={"link"}
                        >
                          Add Line
                        </Button>
                      )}
                    </>
                  }
                  label={<span>{cellData.label}</span>}
                />
              )}
            </Row>{" "}
          </Panel>
        </Collapse>
      </>
    );
  }
);
