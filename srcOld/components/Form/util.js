import { forEach } from "./Designer/util";
import React from "react";

export const InteractContext = React.createContext(null);

export function getValues(cell) {
  let result = {};
  const func = function (data) {
    if (data.lanes) {
      data.lanes.forEach((lane) => {
        lane.cellDataList.forEach((element) => {
          switch (element.type) {
            case "grid":
            case "section":
            case "address":
            case "tab":
              func(element);
              break;
            case "pages":
              func(element);
              break;
            case "list":
              result[element.id] = [];
              element.lanes.forEach((childLane) => {
                let isEmpty = true;
                let detail = {};
                childLane.cellDataList.forEach((listElement) => {
                  if (listElement.value) {
                    isEmpty = false;
                    detail[listElement.id] = {
                      value: listElement.value,
                      controls: listElement?.controlData,
                    };
                  }
                });
                if (!isEmpty) {
                  detail = { ...detail, ...childLane.hiddenValues };
                  result[element.id].push(detail);
                }
              });
              break;
            default:
              result[element.id] = {
                value: element.value,
                controls: element?.controlData,
              };
              break;
          }
        });
        result = { ...result, ...lane.hiddenValues };
      });
    }
  };
  func(cell);
  return result;
}

/**
 * Get value from cell data by id
 * @param root: root cell data
 * @param id: e.g., name, details.0.name, details.name
 */
export function getValue(root, id) {
  let value = null;
  const strings = id.split(".");
  const id1 = strings[0];
  const func = function (data) {
    if (data.lanes) {
      for (const lane of data.lanes) {
        for (const element of lane.cellDataList) {
          switch (element.type) {
            case "grid":
            case "section":
            case "address":
            case "tab":
              func(element);
              break;
            case "pages":
              func(element);
              break;
            default:
              if (element.id === id1) {
                if (element.type === "list") {
                  if (strings.length === 3) {
                    const index = parseInt(strings[1]);
                    const id2 = strings[2];
                    const row = element.lanes[index];
                    for (const item of row.cellDataList) {
                      if (item.id === id2) {
                        value = item.value;
                        return true;
                      }
                    }
                  } else {
                    value = [];
                    const id2 = strings[1];
                    for (const row of element.lanes) {
                      for (const item of row.cellDataList.filter(
                        (item) => item.id === id2
                      )) {
                        value.push(item.value);
                      }
                    }
                    return true;
                  }
                } else {
                  value = element.value;
                  return true;
                }
              }
              break;
          }
        }
      }
    }
    return false;
  };
  func(root);
  return value;
}

export function set(root, id, key, value) {
  const strings = id.split(".");
  const id1 = strings[0];
  const func = function (data) {
    if (data.lanes) {
      for (const lane of data.lanes) {
        for (const element of lane.cellDataList) {
          switch (element.type) {
            case "grid":
            case "section":
            case "address":
            case "tab":
              func(element);
              break;
            case "pages":
              func(element);
              break;
            default:
              if (element.id === id1) {
                if (element.type === "list") {
                  const index = parseInt(strings[1]);
                  const id2 = strings[2];
                  const row = element.lanes[index];
                  for (const item of row.cellDataList) {
                    if (item.id === id2) {
                      item[key] = value;
                      return true;
                    }
                  }
                } else {
                  element[key] = value;
                  return true;
                }
              }
              break;
          }
        }
      }
    }
    return false;
  };
  func(root);
}

function formatValue(value, type) {
  if (type === "datetime") {
    return value.substr(0, 19).replace("T", " ");
  } else {
    return value;
  }
}

export function setData(root, form) {
  const master = { ...form };
  root.lanes[0].hiddenValues = master;
  for (const cellData of root.lanes[0].cellDataList) {
    delete master[cellData.id];
    forEach(cellData, (item) => {
      const value = form[cellData.id];
      if (
        item.type !== "list" &&
        item.type !== "grid" &&
        item.type !== "section" &&
        item.type !== "address" &&
        item.type !== "pages" &&
        item.type !== "tab"
      ) {
        cellData.value = value ? formatValue(value, cellData.type) : null;
      } else if (item.type === "list" && value) {
        for (const row of value) {
          const detail = { ...row };
          item.lanes.push({
            ...item.lanes[0],
            cellDataList: item.lanes[0].cellDataList.map((x) => {
              delete detail[x.id];
              const y = {
                ...x,
              };
              const value = row[x.id];
              y.value = value ? formatValue(value, y.type) : null;
              return y;
            }),
            hiddenValues: detail,
          });
        }
        if (item.lanes.length > 1) {
          item.lanes?.splice(0, 1);
        }
      }
    });
  }
}

export function validateFormat(cellData) {
  const isText = cellData.type === "input" || cellData.type === "textarea";
  if (
    isText &&
    cellData.value &&
    cellData.format &&
    cellData.format !== "none"
  ) {
    let pattern;
    if (cellData.format === "custom") {
      pattern = cellData.customFormat || "";
    } else if (cellData.format === "mobile") {
      pattern = "^1\\d{10}$";
    } else if (cellData.format === "email") {
      pattern = "^\\S+@\\S+$";
    } else {
      throw `Incorrect format type: ${cellData.format}.`;
    }
    if (!cellData.value.match(pattern)) {
      return false;
    }
  }
  return true;
}

export function validateRequired(cellData) {
  return !cellData.required || cellData.value;
}

export function setControlValues(root, id, key, value) {
  const strings = id.split(".");
  const id1 = strings[0];
  const func = function (data) {
    if (data.lanes) {
      for (const lane of data.lanes) {
        for (const element of lane.cellDataList) {
          switch (element.type) {
            case "grid":
            case "section":
            case "address":
            case "tab":
              func(element);
              break;
            case "pages":
              func(element);
              break;
            default:
              if (element.id === id1) {
                if (element.type === "list") {
                  const index = parseInt(strings[1]);
                  const id2 = strings[2];
                  const row = element.lanes[index];
                  for (const item of row.cellDataList) {
                    if (item.id === id2) {
                      item.controlData = {
                        ...item.controlData,
                        [key]: value,
                      };
                      return true;
                    }
                  }
                } else {
                  element.controlData = {
                    ...element.controlData,
                    [key]: value,
                  };
                  return true;
                }
              }
              break;
          }
        }
      }
    }
    return false;
  };
  func(root);
}
