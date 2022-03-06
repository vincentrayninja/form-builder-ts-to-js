import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useRef, useState, } from "react";
import { Button, Modal, Space } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { clone, cloneAndForEach, getActive, reducer } from "./util";
import { WidgetGroups } from "../constants/WidgetGroups";
import { DnDCell } from "./DnDCell";
import GridCellConfig from "./Cell/GridCellConfig";
import SectionCellConfig from "./Cell/SectionCellConfig";
import AddressCellConfig from "./Cell/AddressCellConfig";
import styled from "styled-components";
import WidgetGroup from "./WidgetGroup";
import LabelCellConfig from "../LabelCell/LabelCellConfig";
import { AiOutlineEdit } from "react-icons/all";
import { WhiteHeader, WhiteLayout } from "../Layout";
import DefaultCellConfig from "./DefaultCellConfig";
import useInteractions from "../hooks/interactions";
import Form from "../index";
import { InteractContext } from "../util";
import TabCellConfig from "./Cell/TabCell/TabCellConfig";
import PageCellConfig from "./Cell/PageCell/PageCellConfig";
import "./index.css";
import CheckboxCellConfig from "../CheckboxCell/CheckboxCellConfig";
import SelectCellConfig from "../SelectCell/SelectCellConfig";
import GenderCellConfig from "../GenderCell/GenderCellConfig";
import DateCellConfig from "../DateCell/DateCellConfig";
import { contentStyle, layoutStyle, rightSiderStyle } from "./style";
import InputCellConfig from "../InputCell/InputCellConfig";
import { useForm } from "react-hook-form";
import FullHeightBorderedLayout from "../../layout/FullHeightBorderedLayout";
import LeftSide from "../../layout/LeftSide";
import WhiteContent from "../../layout/WhiteContent";
import WhiteSider from "../../layout/WhiteSider";
import Grid from "@material-ui/core/Grid";

const rootCellData = {
  type: "grid",
  id: "11270307",
  lanes: [{ span: 24, cellDataList: [] }],
  active: false,
};
export const DesignerContext = React.createContext({});
// const LeftSider = styled(WhiteSider).attrs({
//     width: 280,
// }) `
//   padding: 10px;
//   border-right: 1px solid #d3d3d3;
//   height: 100%;
//   overflow-y: auto;
// `;
// const FullHeightBorderedLayout = styled(WhiteLayout) `
//   border: 1px solid #d3d3d3;
//   height: calc(100% - 1px);
// `;
const ToolBar = styled(WhiteHeader)`
  padding: 0 10px;
  text-align: right;
  border-bottom: 1px solid #a3a3a3;
`;
export const Designer = forwardRef(
  (
    {
      customCells,
      availableCustomCells,
      toolbar = true,
      defaultCellData,
      builtinCellDataTypes,
      onChange,
      style,
    },
    ref
  ) => {
    const {
      control,
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log("data", data);
    const [data, designerDispatch] = useReducer(
      reducer,
      defaultCellData || rootCellData
    );
    const [previewDialogVisible, setPreviewDialogVisible] = useState(false);
    const [previewData, setPreviewData] = useState(null);
    const previewRef = useRef();
    const delFunction = useCallback((event) => {
      if (event.keyCode === 46 || (event.ctrlKey && event.keyCode === 8)) {
        designerDispatch({ type: "DELETE_ACTIVE" });
      }
    }, []);
    const finalAvailableCells = useMemo(() => {
      return availableCustomCells || customCells;
    }, [availableCustomCells, customCells]);
    useEffect(() => {
      document.addEventListener("keyup", delFunction, false);
      return () => document.removeEventListener("keyup", delFunction, false);
    }, [delFunction]);
    useEffect(() => onChange?.(data), [data, onChange]);
    useImperativeHandle(ref, () => ({
      preview() {
        setPreviewDialogVisible(true);
        setPreviewData(clone(data));
      },
      reset() {
        designerDispatch({
          type: "INIT",
          data: rootCellData,
        });
      },
      load(data) {
        designerDispatch({
          type: "INIT",
          data: data,
        });
      },
      get() {
        return cloneAndForEach(data, (item) => {
          item.value = undefined;
          item.active = false;
        });
      },
    }));
    const active = getActive(data);
    const interactions = useInteractions(designerDispatch, data);
    const widgetGroups = useMemo(() => {
      if (!builtinCellDataTypes) {
        return WidgetGroups;
      }
      return WidgetGroups.map((group) => ({
        name: group.name,
        widgets: group.widgets.filter(
          (widget) => builtinCellDataTypes.indexOf(widget.type) > -1
        ),
      })).filter((group) => group.widgets.length > 0);
    }, [builtinCellDataTypes]);
    return (
      <>
        <DesignerContext.Provider value={designerDispatch}>
          <InteractContext.Provider value={interactions}>
            <DndProvider backend={HTML5Backend}>
              <FullHeightBorderedLayout style={style}>
                <LeftSide>
                  {widgetGroups.map((g) => (
                    <WidgetGroup key={g.name} name={g.name} list={g.widgets} />
                  ))}
                  {finalAvailableCells && (
                    <WidgetGroup
                      key={"Custom"}
                      name={"Custom"}
                      list={[
                        ...finalAvailableCells.map((cell) => {
                          return {
                            type: cell.type,
                            name: cell.name || "Custom",
                            icon: cell.icon || <AiOutlineEdit />,
                            createWidgetInstance: cell.createWidgetInstance,
                          };
                        }),
                      ]}
                    />
                  )}
                </LeftSide>
                <WhiteContent>
                  <WhiteLayout style={layoutStyle}>
                    {toolbar && (
                      <ToolBar>
                        <Space>
                          <Button
                            onClick={() => {
                              designerDispatch({
                                type: "INIT",
                                data: rootCellData,
                              });
                            }}
                          >
                            Reset
                          </Button>
                          <Button
                            onClick={() => {
                              setPreviewDialogVisible(true);
                              setPreviewData(clone(data));
                            }}
                          >
                            Preview
                          </Button>
                          <Button
                            onClick={() => {
                              alert(JSON.stringify(data));
                              console.log(
                                "Save Form---->",
                                JSON.stringify(data)
                              );
                            }}
                          >
                            Save
                          </Button>
                        </Space>
                      </ToolBar>
                    )}

                    <Grid style={contentStyle}>
                      <DnDCell
                        className={"root"}
                        cellData={data}
                        index={0}
                        customCells={customCells}
                      />
                    </Grid>
                  </WhiteLayout>
                </WhiteContent>
                <WhiteSider style={rightSiderStyle}>
                  {active ? (
                    active.type === "grid" ? (
                      <GridCellConfig data={active} />
                    ) : active.type === "section" ? (
                      <SectionCellConfig data={active} />
                    ) : active.type === "address" ? (
                      <AddressCellConfig data={active} />
                    ) : active.type === "tab" ? (
                      <TabCellConfig data={active} />
                    ) : active.type === "pages" ? (
                      <PageCellConfig data={active} />
                    ) : active.type === "datetime" ? (
                      <DateCellConfig data={active} />
                    ) : active.type === "select" ? (
                      <SelectCellConfig data={active} />
                    ) : active.type === "gender" ? (
                      <GenderCellConfig data={active} />
                    ) : active.type === "checkbox" ? (
                      <CheckboxCellConfig data={active} />
                    ) : active.type === "label" ? (
                      <LabelCellConfig data={active} />
                    ) : active.type === "input" ? (
                      <InputCellConfig data={active} />
                    ) : (
                      (customCells &&
                        customCells.some((item) => item.type === active.type) &&
                        customCells.filter(
                          (item) => item.type === active.type
                        )[0].config &&
                        React.createElement(
                          customCells.filter(
                            (item) => item.type === active.type
                          )[0].config,
                          {
                            data: active,
                            onChange: function (data) {
                              designerDispatch({
                                type: "UPDATE",
                                data: data,
                              });
                            },
                          }
                        )) || <DefaultCellConfig data={active} />
                    )
                  ) : (
                    <></>
                  )}
                </WhiteSider>
              </FullHeightBorderedLayout>
            </DndProvider>
          </InteractContext.Provider>
        </DesignerContext.Provider>
        <Modal
          width={1000}
          title={"Preview"}
          visible={previewDialogVisible}
          onCancel={() => setPreviewDialogVisible(false)}
          footer={[
            <Button
              key={"save"}
              onClick={() => {
                const result = previewRef.current.getData();
                alert(JSON.stringify(result));
                console.log("form response---->", result);
              }}
            >
              Save
            </Button>,
            <Button
              key={"validate"}
              onClick={() => previewRef.current.validate()}
            >
              Validate
            </Button>,
          ]}
        >
          {previewData && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Form
                control={control}
                customCells={customCells}
                ref={previewRef}
                data={cloneAndForEach(previewData, (data) => {
                  data.value = data.defaultValue || data.value;
                })}
                key={previewData.id}
              />
            </form>
          )}
        </Modal>
      </>
    );
  }
);
