import {
  AiOutlineCalendar,
  AiOutlineCheckSquare,
  AiOutlineDownSquare,
  AiOutlineEdit,
  AiOutlineFontSize,
  AiOutlineOrderedList,
  AiOutlineTable,
  AiOutlineBorderVerticle,
  AiOutlineMan,
  AiTwotoneEnvironment,
  AiFillCopy,
} from "react-icons/ai";
import React from "react";
import { WidgetData } from "../schema";

export const WidgetGroups: { name; widgets: WidgetData[] }[] = [
  {
    name: "Basic",
    widgets: [
      {
        type: "input",
        icon: <AiOutlineEdit />,
        name: "Input",
      },
      {
        type: "textarea",
        icon: <AiOutlineEdit />,
        name: "Textarea",
      },
      {
        type: "select",
        icon: <AiOutlineDownSquare />,
        name: "Select",
      },
      {
        type: "datetime",
        icon: <AiOutlineCalendar />,
        name: "Datepicker",
      },
      {
        type: "checkbox",
        icon: <AiOutlineCheckSquare />,
        name: "Checkbox",
      },
      {
        type: "label",
        icon: <AiOutlineFontSize />,
        name: "Label",
      },
    ],
  },
  {
    name: "Layout",
    widgets: [
      { type: "grid", icon: <AiOutlineTable />, name: "Grid" },
      { type: "tab", icon: <AiOutlineTable />, name: "Tab" },
      { type: "pages", icon: <AiFillCopy />, name: "Multi Page" },
      {
        type: "list",
        icon: <AiOutlineOrderedList />,
        name: "List",
      },
      {
        type: "section",
        icon: <AiOutlineBorderVerticle />,
        name: "Section",
      },
    ],
  },
  {
    name: "Components",
    widgets: [
      {
        type: "gender",
        icon: <AiOutlineMan />,
        name: "Gender",
      },
      {
        type: "address",
        icon: <AiTwotoneEnvironment />,
        name: "Address",
      },
    ],
  },
];
