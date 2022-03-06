import React, { useCallback, useContext, useState } from "react";
import { Pool } from "../GridCell/Pool";
import styled from "styled-components";
import { DesignerContext } from "../../index";
import update from "immutability-helper";
import { InstanceContext } from "../../../index";
const Tab = styled("div") `
  display: inline-block;
  padding: 10px 20px;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
  cursor: pointer;
`;
const ActiveTab = styled(Tab) `
  border-bottom: 2px solid darkgreen;
  color: orangered;
`;
const Tabs = styled("div") `
  border-bottom: 1px solid #d3d3d3;
`;
export const TabCell = ({ data, customCells, control }) => {
    const designerDispatch = useContext(DesignerContext);
    const instanceDispatch = useContext(InstanceContext);
    const isDesigner = instanceDispatch === null;
    const dispatch = !isDesigner ? instanceDispatch : designerDispatch;
    const [tabIndex, setTabIndex] = useState(data.lanes.findIndex((item) => item.span === 24));
    const handleSwitch = useCallback((index) => {
        setTabIndex(index);
        dispatch({
            type: "UPDATE",
            data: update(data, {
                lanes: {
                    $apply: (x) => (x || []).map((y) => ({
                        ...y,
                        span: data.lanes?.indexOf(y) === index ? 24 : 0,
                    })),
                },
            }),
        });
    }, [data, dispatch]);
    return (<>
      <Tabs>
        {data.lanes?.map((lane, index) => {
        if (index === tabIndex) {
            return <ActiveTab>{data.tabs[index]}</ActiveTab>;
        }
        return (<Tab key={index} onClick={() => handleSwitch(index)}>
              {data.tabs[index]}
            </Tab>);
    })}
      </Tabs>
      <Pool cellData={data} customCells={customCells} control={control}/>
    </>);
};
