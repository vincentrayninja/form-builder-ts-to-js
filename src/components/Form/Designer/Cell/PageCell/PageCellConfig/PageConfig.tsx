import React from "react";
import { AiOutlineMenu, AiOutlineMinusCircle } from "react-icons/ai";
import { Button, Input } from "antd";
import { useVerticalDragDropMemberRef } from "../../../../../hook";

interface DragItem {
  index: number;
  type;
}

interface PageConfigProps {
  index: number;
  name;
  move: (from: number, to: number) => void;
  onRemove: () => void;
  onRename: (tab) => void;
}

export default function PageConfig({
  index,
  name,
  move,
  onRemove,
  onRename,
}: PageConfigProps) {
  const ref = useVerticalDragDropMemberRef(index, move);
  return (
    <>
      <div ref={ref}>
        <AiOutlineMenu style={{ cursor: "move" }} />
        <Input
          onChange={(event) => onRename(event.target.value)}
          value={name}
          size={"small"}
          style={{
            width: "60px",
            margin: "0 4px",
          }}
        />
        <Button type={"link"} onClick={onRemove} style={{ padding: "0" }}>
          <AiOutlineMinusCircle />
        </Button>
      </div>
    </>
  );
}
