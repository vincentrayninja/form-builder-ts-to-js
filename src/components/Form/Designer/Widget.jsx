import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
const StyledLi = styled.li`
  font-size: 12px;
  box-sizing: border-box;
  width: 100%;
  display: inline-block;
  cursor: move;
  border: 1px solid #a3a3a3;
  padding: 10px 20px;
  margin: auto;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: white;

  > * {
    margin-right: 4px;
    vertical-align: middle;
  }
`;
export function Widget({ widget }) {
    const [{ isDragging }, drag] = useDrag({
        item: {
            type: widget.type,
            createWidgetInstance: widget.createWidgetInstance,
        },
        collect: (monitor) => {
            return {
                isDragging: !!monitor.isDragging(),
            };
        },
    });
    return (<StyledLi key={widget.name} style={{ opacity: isDragging ? "0.5" : 1 }} ref={drag}>
      {widget.icon}
      <span>{widget.name}</span>
    </StyledLi>);
}
