import { Interactions } from "../hooks/interactions";
import { Option } from "../../schema";

export type CellDataValue = any;

export interface CellDataValueObject {
  [key]: CellDataValue;
}

export interface CellData {
  defaultValue?;
  disabled?: boolean;
  active?: boolean;
  // options?;
  value?: CellDataValue;
  id;
  type: CellDataType | string;
  // lanes?: LaneData[];
  // tabs?[];
  label?;
  placeholder?;
  labeled?: boolean;
  warnable?: boolean;
  warning?;
  required?: boolean | (() => boolean);
  onClick?: () => void;
  onChange?: (
    value: CellDataValue,
    interactions,
    valueObject?: CellDataValueObject,
    location?: SwimlaneLocation
  ) => void;
  width? | number;
  unique?: boolean;
  controls?: boolean;
  [key];
}

export interface LanedCellData extends CellData {
  lanes: LaneData[];
}

export interface TabCellData extends LanedCellData {
  tabs[];
}

export interface ControledData extends LanedCellData {
  control: controlData;
}

export interface WidgetData {
  type;
  icon: JSX.Element;
  name;
  mode?: "copy" | "move";
  createWidgetInstance?: () => CellData;
}

export interface SwimlaneLocation {
  parentId;
  index: number;
}

export interface LaneData {
  cellDataList: CellData[];
  span?: number;
  hiddenValues?: { [key]: CellDataValue };
}

export interface controlData {
  comment?;
  action?;
  attachment?: File;
}

export interface CellLocation {
  parentId;
  laneIndex: number;
  index: number;
}

export interface ConstrainViolation {
  id;
  message;
  value: CellDataValue;
  description: "required" | "format";
}

export interface CellProps {
  data: CellData;
  layout?: "vertical" | "horizontal";
  register?;
  control?;
  onChange: (value: CellDataValue, valueObject?: CellDataValueObject) => void;
}

export interface DispatchActiveProps {
  id;
  type: "ACTIVE";
}

export interface DispatchEditProps {
  id;
  type: "EDIT";
}

export interface DispatchSetValueProps {
  type: "SET_VALUE";
  targetId;
  value;
}

export interface DispatchSetOptionProps {
  targetId;
  type: "SET_OPTION";
  options;
}

export interface DispatchValidateProps {
  type: "VALIDATE";
}

export interface DispatchInitProps {
  type: "INIT";
  data: CellData;
}

// Move to a swimlane with position
export interface DispatchPositionedMoveProps {
  type: "POSITIONED_MOVE";
  id;
  position: "up" | "down";
  dropItemId;
}

// Move to a swimlane without position
export interface DispatchMoveProps {
  type: "MOVE";
  id;
  location: SwimlaneLocation;
}

// Add to a swimlane with position
export interface DispatchPositionedAddProps {
  type: "POSITIONED_ADD";
  position: "up" | "down";
  dragItem: CellData;
  dropItemId;
}

// Add to a swimlane without position(append to last)
export interface DispatchAddProps {
  type: "ADD";
  dragItem: CellData;
  location: SwimlaneLocation;
}

export interface DispatchUpdateProps {
  type: "UPDATE";
  data: CellData;
  id?;
}

export interface DispatchDeleteActiveProps {
  type: "DELETE_ACTIVE";
}

export interface DispatchDeleteProps {
  type: "DELETE";
  id;
}

export interface DispatchSetProps {
  type: "SET";
  targetId;
  value;
  key;
}

export interface DispatchSetControlProps {
  type: "SET_CONTROL";
  targetId;
  value;
  key;
}

export interface DispatchDeleteLaneProps {
  type: "DELETE_LANE";
  parentId;
  index: number;
}

export type CellDataType =
  | "textarea"
  | "select"
  | "gender"
  | "datetime"
  | "grid"
  | "section"
  | "address"
  | "list"
  | "tab"
  | "checkbox"
  | "label"
  | "switch"
  | "input";

export type ReducerActionProps =
  | DispatchPositionedMoveProps
  | DispatchPositionedAddProps
  | DispatchActiveProps
  | DispatchEditProps
  | DispatchMoveProps
  | DispatchAddProps
  | DispatchUpdateProps
  | DispatchDeleteActiveProps
  | DispatchDeleteProps
  | DispatchSetValueProps
  | DispatchSetProps
  | DispatchValidateProps
  | DispatchInitProps
  | DispatchSetOptionProps
  | DispatchSetControlProps
  | DispatchDeleteLaneProps;
