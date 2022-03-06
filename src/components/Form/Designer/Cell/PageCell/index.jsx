import React, { useCallback, useContext, useState } from "react";
import { Pool } from "../GridCell/Pool";
import styled from "styled-components";
import { DesignerContext } from "../../index";
import update from "immutability-helper";
import { InstanceContext } from "../../../index";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
const Tab = styled("div") `
  /* display: inline-block; */
  padding: 10px 10px 10px 10px;
  font-weight: bold;
  /* min-width: 40px; */
  height: 40px;
  width: 40px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #bdbcbc;
  border-radius: 50%;
  margin: 2px;
`;
const ActiveTab = styled(Tab) `
  /* border-bottom: 2px solid darkgreen; */
  background-color: #00c3ffe1;
  color: white;
`;
const Tabs = styled("div") `
  /* border-bottom: 1px solid #d3d3d3; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IndexName = styled("p") `
  position: relative;
  top: -3px;
`;
const disable = {
    backgroundColor: "#d1ceceb2",
    cursor: "not-allowed",
};
const PageHeader = styled("p") `
  border-bottom: 1px solid #c0c0c0;
  margin: 10px 10px 2px 10px;
  font-weight: bold;
`;
export const PageCell = ({ data, customCells, control, }) => {
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
             <TabComponent data={data} tabIndex={tabIndex} handleSwitch={handleSwitch}/>
             <PageHeader>{data.tabs[tabIndex]}</PageHeader>
             <Pool cellData={data} customCells={customCells} control={control}/>
             <TabComponent data={data} tabIndex={tabIndex} handleSwitch={handleSwitch}/>
           </>);
};
function TabComponent({ data, tabIndex, handleSwitch }) {
    return (<Tabs>
      {data.lanes?.map((lane, index) => {
        if (index === tabIndex) {
            return (<>
              {tabIndex > 0 ? (<Tab key={index} onClick={() => handleSwitch(tabIndex - 1)}>
                  <AiOutlineDoubleLeft />
                </Tab>) : (<Tab key={index} style={disable}>
                  <AiOutlineDoubleLeft />
                </Tab>)}
              <ActiveTab>
                <IndexName>{index + 1}</IndexName>
              </ActiveTab>
              {data.lanes?.length > tabIndex + 1 ? (<Tab key={index} onClick={() => handleSwitch(tabIndex + 1)}>
                  <AiOutlineDoubleRight />
                </Tab>) : (<Tab key={index} style={disable}>
                  <AiOutlineDoubleRight />
                </Tab>)}
            </>);
        }
    })}
    </Tabs>);
}
