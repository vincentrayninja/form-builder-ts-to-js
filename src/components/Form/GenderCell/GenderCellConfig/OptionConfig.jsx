import React from "react";
import { AiOutlineMenu, AiOutlineMinusCircle } from "react-icons/ai";
import { Button, Input } from "antd";
import { useVerticalDragDropMemberRef } from "../../../hook";
export default function OptionConfig({ index, label, move, onRemove, onChange, }) {
    const ref = useVerticalDragDropMemberRef(index, move);
    return (<>
      <div ref={ref}>
        <AiOutlineMenu style={{ cursor: "move" }}/>
        <Input onChange={(event) => {
        onChange(index, event.target.value);
    }} value={label} size={"small"} style={{
        width: "120px",
        margin: "0 4px",
    }}/>
        <Button type={"link"} onClick={() => {
        onRemove(index);
    }} style={{ padding: "0" }}>
          <AiOutlineMinusCircle />
        </Button>
      </div>
    </>);
}
