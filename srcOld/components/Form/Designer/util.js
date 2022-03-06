import {
  CellData,
  CellLocation,
  LanedCellData,
  ReducerActionProps,
} from "../schema";
import {
  set,
  validateFormat,
  validateRequired,
  setControlValues,
} from "../util";
import { DragItem } from "./DnDCell";
import { CustomCell } from "./Cell";
import { InputCellData } from "../InputCell/schema";
import { message } from "antd";

export function clone(src) {
  const copy = JSON.parse(JSON.stringify(src));
  forEach(src, (src) => {
    forEach(copy, (dest) => {
      if (dest.id === src.id) {
        if (typeof src.required === "function") {
          dest.required = src.required;
        }
        if (src.onChange) {
          dest.onChange = src.onChange;
        }
        if (src.onClick) {
          dest.onClick = src.onClick;
        }
      }
    });
  });
  return copy;
}

/**
 * Clone and iterate nested CellData
 * @param root
 * @param handler
 */
export function cloneAndForEach(
  root,
  handler
) {
  const copy = clone(root);
  forEach(copy, handler);
  return copy;
}

/**
 * Iterate nested CellData
 * @param root
 * @param handler
 */
export function forEach(
  root,
  handler
) {
  const recursion = function (data) {
    if (data.lanes) {
      for (const lane of data.lanes) {
        for (let i = 0; i < lane.cellDataList.length; i++) {
          const cellData = lane.cellDataList[i];
          handler(cellData, i, lane.cellDataList);
          if (
            cellData.type === "grid" ||
            cellData.type === "section" ||
            cellData.type === "address" ||
            cellData.type === "list" ||
            cellData.type === "pages" ||
            cellData.type === "tab"
          ) {
            recursion(cellData);
          }
        }
      }
    }
  };
  handler(root, null, null);
  recursion(root);
}

export function filter(
  root,
  predicate: (item) => boolean
)[];
export function filter(root, type)[];
export function filter(
  root,
  predicate: ((item) => boolean)
)[] {
  const result[] = [];
  forEach(root, (value) => {
    if (
      (typeof predicate === "function" && predicate(value)) ||
      (typeof predicate === "string" && value.type === predicate)
    ) {
      result.push(value);
    }
  });
  return result;
}

export function locate(
  root,
  matchFunc: (value, index: number, array[]) => boolean
): [CellLocation, CellData[], CellData] | null {
  let location: [CellLocation, CellData[], CellData] | null = null;
  const func = function (
    data
  ): [CellLocation, CellData[], CellData] | null {
    if (data.lanes) {
      for (const lane of data.lanes) {
        for (let i = 0; i < lane.cellDataList.length; i++) {
          const cellData = lane.cellDataList[i];
          if (matchFunc(cellData, i, lane.cellDataList)) {
            location = [
              {
                parentId: data.id,
                laneIndex: data.lanes?.indexOf(lane),
                index: i,
              },
              lane.cellDataList,
              cellData,
            ];
            break;
          }
          if (
            cellData.type === "grid" ||
            cellData.type === "section" ||
            cellData.type === "address" ||
            cellData.type === "list" ||
            cellData.type === "pages" ||
            cellData.type === "tab"
          ) {
            func(cellData);
          }
        }
      }
    }
    return location;
  };
  return func(root);
}

export function deleteActive(rootCellData) {
  const location = locate(
    rootCellData,
    (item) => item.active !== undefined && item.active
  );
  if (location) {
    const [cellLocation, list] = location;
    list.splice(cellLocation.index, 1);
  }
}

export function getCellDataList(
  root,
  parentId,
  index: number
)[] | null {
  let list[] | null = null;
  const func = function (data) {
    if (data.id === parentId) {
      return (data).lanes[index].cellDataList;
    }
    if (data.lanes) {
      for (const lane of data.lanes) {
        for (const cellData of lane.cellDataList) {
          if (
            cellData.type === "grid" ||
            cellData.type === "section" ||
            cellData.type === "address" ||
            cellData.type === "list" ||
            cellData.type === "pages" ||
            cellData.type === "tab"
          ) {
            if (cellData.id === parentId) {
              list = (cellData).lanes[index].cellDataList;
            } else {
              func(cellData);
            }
          }
        }
      }
    }
    return list;
  };
  return func(root);
}

function drop(
  root,
  cell,
  dropItemId,
  position: "up" | "down"
) {
  const [dropLocation, dropList] = locate(
    root,
    (item) => item.id === dropItemId
  )!;
  if (position === "up") {
    dropList.splice(dropLocation.index, 0, cell);
  } else {
    dropList.splice(dropLocation.index + 1, 0, cell);
  }
  active(root, cell.id);
}

export function reducer(state, action: ReducerActionProps) {
  if (!action.type) {
    return state;
  }
  if (action.type === "INIT") {
    return action.data;
  }
  const copy = clone(state);
  if (action.type === "POSITIONED_MOVE") {
    const [dragLocation, dragList, dragCell] = locate(
      copy,
      (item) => item.id === action.id
    )!;
    const location = locate(copy, (item) => item.id === action.dropItemId);
    if (location) {
      dragList.splice(dragLocation.index, 1);
      drop(copy, dragCell, action.dropItemId, action.position);
    }
  } else if (action.type === "POSITIONED_ADD") {
    const location = locate(copy, (item) => item.id === action.dropItemId);
    if (location) {
      drop(copy, action.dragItem, action.dropItemId, action.position);
    }
  } else if (action.type === "ADD") {
    const cells = getCellDataList(
      copy,
      action.location.parentId,
      action.location.index
    )!;
    cells.push(action.dragItem);
    active(copy, action.dragItem.id);
  } else if (action.type === "UPDATE") {
    const [location, list] = locate(
      copy,
      (data) => data.id === (action.id || action.data.id)
    )!;
    list.splice(location.index, 1, action.data);
  } else if (action.type === "MOVE") {
    const [location, list, cell] = locate(
      copy,
      (item) => item.id === action.id
    )!;
    list.splice(location.index, 1);
    const cellDataList = getCellDataList(
      copy,
      action.location.parentId,
      action.location.index
    );
    cellDataList?.push(cell);
    active(copy, cell.id);
  } else if (action.type === "DELETE") {
    const [location, list] = locate(copy, (item) => item.id === action.id)!;
    list.splice(location.index, 1);
  } else if (action.type === "ACTIVE") {
    active(copy, action.id);
  } else if (action.type === "DELETE_ACTIVE") {
    deleteActive(copy);
  } else if (action.type === "SET") {
    set(copy, action.targetId, action.key, action.value);
  } else if (action.type === "SET_VALUE") {
    set(copy, action.targetId, "value", action.value);
  } else if (action.type === "SET_OPTION") {
    set(copy, action.targetId, "options", action.options);
  } else if (action.type === "VALIDATE") {
    return cloneAndForEach(state, function (cellData) {
      if (!validateRequired(cellData)) {
        cellData.warning = `${cellData.label} is required.`;
        cellData.warnable = true;
      } else if (!validateFormat(cellData)) {
        cellData.warning = `${cellData.label} is incorrect.`;
        cellData.warnable = true;
      } else {
        cellData.warnable = false;
        cellData.warning = "";
      }
    });
  } else if (action.type === "DELETE_LANE") {
    const location = locate(copy, (value) => value.id === action.parentId);
    if (location) {
      if (location[2].lanes.length > 1) {
        location[2].lanes.splice(action.index, 1);
      } else {
        message.error(`Delete the last line.`);
      }
    }
  } else if (action.type === "SET_CONTROL") {
    setControlValues(copy, action.targetId, action.key, action.value);
  }
  return copy;
}

export function getActive(root) | null {
  const location = locate(
    root,
    (item) => item.active !== undefined && item.active
  );
  return location ? location[2] : null;
}

export function active(root, id) {
  forEach(root, function (cellData) {
    cellData.active = id === cellData.id;
  });
}

export function createWidgetInstance(
  item: DragItem,
  customCells?: CustomCell[]
) {
  if (item.createWidgetInstance) {
    return item.createWidgetInstance();
  } else if (customCells) {
    const find = customCells.find(
      (customCell) => customCell.type === item.type
    );
    if (find && find.createWidgetInstance) {
      return find.createWidgetInstance();
    }
  }
  return createBasicWidgetInstance(item.type);
}

export function createBasicWidgetInstance(type) {
  const cellData = {
    type: type,
    id: type + new Date().getTime(),
    active: false,
    label: type,
  };
  if (cellData.type === "grid") {
    cellData.lanes = [
      { span: 12, cellDataList: [] },
      { span: 12, cellDataList: [] },
    ];
  } else if (cellData.type === "section") {
    cellData.lanes = [{ span: 24, cellDataList: [] }];
  } else if (cellData.type === "address") {
    cellData.lanes = [{ span: 24, cellDataList: [] }];
  } else if (cellData.type === "pages") {
    cellData.lanes = [
      { span: 24, cellDataList: [] },
      { span: 0, cellDataList: [] },
    ];
    cellData.tabs = ["Page 1", "Page 2"];
  } else if (cellData.type === "tab") {
    cellData.lanes = [
      { span: 24, cellDataList: [] },
      { span: 0, cellDataList: [] },
    ];
    cellData.tabs = ["Tab 1", "Tab 2"];
  } else if (cellData.type === "list") {
    cellData.label = "List";
    cellData.lanes = [{ cellDataList: [], span: 100 }];
  } else if (cellData.type === "select") {
    cellData.options = [];
  } else if (cellData.type === "gender") {
    cellData.options = [];
  }
  return cellData;
}
