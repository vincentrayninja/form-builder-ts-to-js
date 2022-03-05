import React, {
  CSSProperties,
  forwardRef,
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
} from "react";
import {
  CellData,
  CellProps as ActualCellProps,
  DispatchSetValueProps,
  LanedCellData,
  SwimlaneLocation,
  TabCellData,
} from "../../schema";
import { GridCell } from "./GridCell";
import { SectionCell } from "./SectionCell";
import { AddressCell } from "./AddressCell";
import { InstanceContext } from "../../index";
import { Interactions } from "../../hooks/interactions";
import { InteractContext } from "../../util";
import { TabCell } from "./TabCell";
import { PageCell } from "./PageCell";
import { DesignerContext } from "../index";
import { TextAreaCell } from "../../TextAreaCell";
import InputCell from "../../InputCell";
import { SwitchCell } from "../../SwitchCell";
import { LabelCell } from "../../LabelCell/LabelCell";
import { DateCell } from "../../DateCell";
import { SelectCell } from "../../SelectCell";
import { GenderCell } from "../../GenderCell";
import CheckboxCell from "../../CheckboxCell";
import { SelectCellData } from "../../SelectCell/schema";
import { GenderCellData } from "../../GenderCell/schema";

export interface CustomCell {
  type;
  cell: FunctionComponent<ActualCellProps>;
  config?: FunctionComponent<{
    data: CellData;
    onChange: (data: CellData) => void;
  }>;
  icon?: JSX.Element;
  name?;
  createWidgetInstance?: () => CellData;
}
interface CellProps {
  cellData: CellData;
  layout?: "vertical" | "horizontal";
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?;
  customCells?: CustomCell[];
  children?: JSX.Element;
  location?: SwimlaneLocation;
  register?;
  control?;
}
export const Cell = forwardRef(
  (
    {
      cellData,
      layout = "horizontal",
      style,
      onClick,
      className,
      customCells,
      children,
      location,
      register,
      control,
    }: CellProps,
    ref
  ) => {
    // todo: should prevent from remove required cell
    const instanceDispatch = useContext(InstanceContext);
    const designerDispatch = useContext(DesignerContext);
    const data = useMemo(
      (): CellData => ({
        required: false,
        warnable: false,
        layout: "default",
        labeled: true,
        ...cellData,
      }),
      [cellData]
    );
    const interactions = useContext<Interactions>(InteractContext);
    const onChange = useCallback(
      (value: unknown, valueObject) => {
        const targetId =
          location && layout === "vertical"
            ? `${location.parentId}.${location.index}.${data.id}`
            : data.id;
        const command: DispatchSetValueProps = {
          type: "SET_VALUE",
          targetId,
          value: value,
        };
        if (instanceDispatch) {
          instanceDispatch(command);
        } else {
          designerDispatch(command);
        }

        const unstagedValues = {};
        data.onChange?.(
          value,
          {
            ...interactions,
            /**
             * Wrapper to replace the result of default getValue with unstaged values
             * @param id: e.g., name, details.0.name, details.name
             */
            getValue(id): unknown | unknown[] {
              for (const unstagedId in unstagedValues) {
                if (
                  !Object.prototype.hasOwnProperty.call(
                    unstagedValues,
                    unstagedId
                  )
                ) {
                  continue;
                }

                const unstagedValue = unstagedValues[unstagedId];

                if (id === unstagedId) {
                  return unstagedValue;
                }

                const unstagedIds = unstagedId.split(".");

                if (
                  unstagedIds.length === 3 &&
                  id === `${unstagedIds[0]}.${unstagedIds[2]}`
                ) {
                  const values = interactions.getValue(id);
                  // replace stage value with unstaged value
                  values.splice(parseInt(unstagedIds[1]), 1, unstagedValue);
                  return values;
                }
              }
              return interactions.getValue(id);
            },
            /**
             * Wrapper to save value to unstaged values
             * @param id: e.g., name, details.0.name, details.name
             * @param value: value of component
             */
            setValue(id, value: unknown): void {
              unstagedValues[id] = value;
              interactions.setValue(id, value);
            },
          },
          valueObject,
          location
        );
      },
      [data, designerDispatch, instanceDispatch, interactions, layout, location]
    );
    const props = useMemo(
      () => ({
        onChange,
        data,
        layout,
      }),
      [data, layout, onChange]
    );
    return (
      <>
        <div
          ref={ref}
          style={{ ...style, position: "relative" }}
          className={`instance ${
            !instanceDispatch && data.active ? " active " : " "
          }${className || ""}`}
          onClick={onClick}
        >
          {children}
          {data.type === "input" ? (
            <InputCell {...props} register={register} control={control} />
          ) : data.type === "textarea" ? (
            <TextAreaCell {...props} control={control} />
          ) : data.type === "grid" ? (
            <GridCell
              data={data as LanedCellData}
              customCells={customCells}
              control={control}
            />
          ) : data.type === "section" ? (
            <SectionCell
              data={data as LanedCellData}
              customCells={customCells}
              control={control}
            />
          ) : data.type === "address" ? (
            <AddressCell
              data={data as LanedCellData}
              customCells={customCells}
            />
          ) : data.type === "list" ? (
            <GridCell
              data={data as LanedCellData}
              direction={"vertical"}
              customCells={customCells}
              control={control}
            />
          ) : data.type === "select" ? (
            <SelectCell
              {...props}
              data={data as SelectCellData}
              control={control}
            />
          ) : data.type === "gender" ? (
            <GenderCell
              {...props}
              data={data as GenderCellData}
              control={control}
            />
          ) : data.type === "datetime" ? (
            <DateCell {...props} control={control} />
          ) : data.type === "checkbox" ? (
            <CheckboxCell {...props} control={control} />
          ) : data.type === "label" ? (
            <LabelCell {...props} />
          ) : data.type === "switch" ? (
            <SwitchCell {...props} control={control} />
          ) : data.type === "pages" ? (
            <PageCell
              {...props}
              data={data as TabCellData}
              customCells={customCells}
              control={control}
            />
          ) : data.type === "tab" ? (
            <TabCell
              {...props}
              data={data as TabCellData}
              customCells={customCells}
              control={control}
            />
          ) : (
            (customCells &&
              customCells.some((item) => item.type === data.type) &&
              React.createElement(
                customCells.filter((item) => item.type === data.type)[0].cell,
                props
              )) || (
              <>
                <span>{`Not found: ${data.type} of ${customCells
                  ?.map((item) => item.type)
                  .join(", ")}`}</span>
              </>
            )
          )}
        </div>
      </>
    );
  }
);
