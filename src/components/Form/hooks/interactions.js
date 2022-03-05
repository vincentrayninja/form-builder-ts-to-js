import React, { useCallback } from "react";
import { CellData, ReducerActionProps } from "../schema";
import { getValue as fetchValue } from "../util";
import { Option } from "../../schema";

// export interface Interactions {
//   setValue: (id, value) => void;
//   setOption: (id, options) => void;
//   getValue: (id) => any;
//   set: (id, key, value) => void;
//   control: (id, key, value) => void;
// }

export default function useInteractions(dispatch, root) {
  const setValue = useCallback(
    (id, value) => {
      dispatch({
        type: "SET_VALUE",
        targetId: id,
        value,
      });
    },
    [dispatch]
  );
  const setOption = useCallback(
    (id, options) => {
      dispatch({
        type: "SET_OPTION",
        options: options,
        targetId: id,
      });
    },
    [dispatch]
  );
  const getValue = useCallback(
    (id) => {
      return fetchValue(root, id);
    },
    [root]
  );
  const set = useCallback(
    (id, key, value) => {
      dispatch({
        type: "SET",
        targetId: id,
        key,
        value,
      });
    },
    [dispatch]
  );
  const control = useCallback(
    (id, key, value) => {
      dispatch({
        type: "SET_CONTROL",
        targetId: id,
        key,
        value,
      });
    },
    [dispatch]
  );
  return { setValue, setOption, getValue, set, control };
}
