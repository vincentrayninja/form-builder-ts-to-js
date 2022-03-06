import React, { forwardRef, useCallback, useContext, useMemo, } from "react";
import { GridCell } from "./GridCell";
import { SectionCell } from "./SectionCell";
import { AddressCell } from "./AddressCell";
import { InstanceContext } from "../../index";
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
export const Cell = forwardRef(({ cellData, layout = "horizontal", style, onClick, className, customCells, children, location, register, control, }, ref) => {
    // todo: should prevent from remove required cell
    const instanceDispatch = useContext(InstanceContext);
    const designerDispatch = useContext(DesignerContext);
    const data = useMemo(() => ({
        required: false,
        warnable: false,
        layout: "default",
        labeled: true,
        ...cellData,
    }), [cellData]);
    const interactions = useContext(InteractContext);
    const onChange = useCallback((value, valueObject) => {
        const targetId = location && layout === "vertical"
            ? `${location.parentId}.${location.index}.${data.id}`
            : data.id;
        const command = {
            type: "SET_VALUE",
            targetId,
            value: value,
        };
        if (instanceDispatch) {
            instanceDispatch(command);
        }
        else {
            designerDispatch(command);
        }
        const unstagedValues = {};
        data.onChange?.(value, {
            ...interactions,
            /**
             * Wrapper to replace the result of default getValue with unstaged values
             * @param id: e.g., name, details.0.name, details.name
             */
            getValue(id) {
                for (const unstagedId in unstagedValues) {
                    if (!Object.prototype.hasOwnProperty.call(unstagedValues, unstagedId)) {
                        continue;
                    }
                    const unstagedValue = unstagedValues[unstagedId];
                    if (id === unstagedId) {
                        return unstagedValue;
                    }
                    const unstagedIds = unstagedId.split(".");
                    if (unstagedIds.length === 3 &&
                        id === `${unstagedIds[0]}.${unstagedIds[2]}`) {
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
            setValue(id, value) {
                unstagedValues[id] = value;
                interactions.setValue(id, value);
            },
        }, valueObject, location);
    }, [
        data,
        designerDispatch,
        instanceDispatch,
        interactions,
        layout,
        location,
    ]);
    const props = useMemo(() => ({
        onChange,
        data,
        layout,
    }), [data, layout, onChange]);
    return (<>
                    <div ref={ref} style={{ ...style, position: "relative" }} className={`instance ${!instanceDispatch && data.active ? " active " : " "}${className || ""}`} onClick={onClick}>
                      {children}
                      {data.type === "input" ? (<InputCell {...props} register={register} control={control}/>) : data.type === "textarea" ? (<TextAreaCell {...props} control={control}/>) : data.type === "grid" ? (<GridCell data={data} customCells={customCells} control={control}/>) : data.type === "section" ? (<SectionCell data={data} customCells={customCells} control={control}/>) : data.type === "address" ? (<AddressCell data={data} customCells={customCells}/>) : data.type === "list" ? (<GridCell data={data} direction={"vertical"} customCells={customCells} control={control}/>) : data.type === "select" ? (<SelectCell {...props} data={data} control={control}/>) : data.type === "gender" ? (<GenderCell {...props} data={data} control={control}/>) : data.type === "datetime" ? (<DateCell {...props} control={control}/>) : data.type === "checkbox" ? (<CheckboxCell {...props} control={control}/>) : data.type === "label" ? (<LabelCell {...props}/>) : data.type === "switch" ? (<SwitchCell {...props} control={control}/>) : data.type === "pages" ? (<PageCell {...props} data={data} customCells={customCells} control={control}/>) : data.type === "tab" ? (<TabCell {...props} data={data} customCells={customCells} control={control}/>) : ((customCells &&
        customCells.some((item) => item.type === data.type) &&
        React.createElement(customCells.filter((item) => item.type === data.type)[0].cell, props)) || (<>
                            <span>{`Not found: ${data.type} of ${customCells
        ?.map((item) => item.type)
        .join(", ")}`}</span>
                          </>))}
                    </div>
                  </>);
});
