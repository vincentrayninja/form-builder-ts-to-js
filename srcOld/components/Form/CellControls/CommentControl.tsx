import React, { useContext } from "react";
import { Input, Upload, Button } from "antd";
import { AiOutlineToTop } from "react-icons/ai";
import { Interactions } from "../hooks/interactions";
import { InteractContext } from "../util";
const CommentControl = ({ controls, id, controlData }) => {
  const interactions = useContext<Interactions>(InteractContext);

  const changeHandler = React.useCallback(
    (e) => {
      interactions.control(
        id,
        controls.comment ? "comment" : "action",
        e.target.value
      );
    },
    [controls, id, interactions]
  );

  const uploadHandler = React.useCallback(
    (info) => {
      let fileList = [...info.fileList];
      fileList = fileList.slice(-5);
      fileList.forEach(function (file, index) {
        let reader = new FileReader();
        reader.onload = (e) => {
          file.base64 = e?.target?.result;
          interactions.control(id, "attachment", file.base64);
        };
        reader.readAsDataURL(file.originFileObj);
      });
      return true;
    },
    [controls, id, interactions]
  );
  return (
    <>
      {controls.attachment ? (
        <Upload onChange={uploadHandler}>
          <Button icon={<AiOutlineToTop />} size="small">
            &nbsp;Click to Upload
          </Button>
        </Upload>
      ) : (
        <Input
          value={controls.comment ? controlData?.comment : controlData?.action}
          placeholder={`Drop your ${
            controls.comment ? "comment" : "action"
          }...`}
          onChange={changeHandler}
        />
      )}
    </>
  );
};

export default React.memo(CommentControl);
