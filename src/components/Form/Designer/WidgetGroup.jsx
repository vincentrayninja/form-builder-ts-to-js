import React, { Fragment } from "react";
import { Widget } from "./Widget";
export default function ({ name, list }) {
    return (<>
      <Fragment key={name}>
        <div>{name}</div>
        <ul style={{
        width: "100%",
        listStyle: "none",
        padding: 0,
    }}>
          {list.map((w) => {
        return <Widget key={w.name} widget={w}/>;
    })}
        </ul>
      </Fragment>
    </>);
}
