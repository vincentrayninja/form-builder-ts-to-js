import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineMinusCircle } from "react-icons/ai";
import { Button, Col, Input, Row } from "antd";
import { useVerticalDragDropMemberRef } from "../../../hook";
export default function OptionConfig({ index, label, value, move, onRemove, onChange, }) {
    const ref = useVerticalDragDropMemberRef(index, move);
    const [Flabel, setFlabel] = useState(label);
    return (<>
      <div ref={ref}>
        <Row>
          <Col span={3}>
            <AiOutlineMenu style={{ cursor: "move" }}/>
            <br />
            <Button type={"link"} onClick={() => {
        onRemove(index);
    }} style={{ padding: "0" }}>
              <AiOutlineMinusCircle />
            </Button>
          </Col>
          <Col span={21}>
            <b>Label:</b>
            <Input onChange={(event) => {
        setFlabel(event.target.value);
        onChange(index, event.target.value, new Date().getTime().toString());
    }} value={label} size={"small"} style={{
        width: "100px",
        margin: "0 2px",
    }}/>
            <b>Value:</b>
            <Input onChange={(event) => {
        onChange(index, Flabel, event.target.value);
    }} value={value} size={"small"} style={{
        width: "100px",
        margin: "0 2px",
    }}/>
          </Col>
        </Row>
        <hr />
      </div>
    </>);
}
