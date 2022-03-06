import React, { useEffect, useState } from "react";
import "./App.css";
import { Designer } from "./components/Form/Designer";
import Form from "./components/Form";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetValidations } from "./components/Healper";
import Header from "./components/layout/Header";

function App() {
  const FormFormation2 = {
    type: "grid",
    id: "11270307",
    lanes: [
      {
        span: 24,
        cellDataList: [
          {
            type: "pages",
            id: "pages1645687000867",
            active: false,
            label: "pages",
            lanes: [
              {
                span: 24,
                cellDataList: [
                  {
                    type: "section",
                    id: "section1645687006596",
                    active: true,
                    label: "section",
                    lanes: [
                      {
                        span: 24,
                        cellDataList: [
                          {
                            type: "textarea",
                            id: "textarea1645687017089",
                            active: false,
                            label: "textarea",
                            disabled: false,
                            required: true,
                          },
                          {
                            type: "input",
                            id: "input1645687013711",
                            active: false,
                            label: "input",
                            required: true,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              { span: 0, cellDataList: [] },
            ],
            tabs: ["Page 1", "Page 2"],
          },
        ],
      },
    ],
    active: false,
  };
  const [schemaFormValid, setSchemaFormValid] = useState([]);
  useEffect(() => {
    setSchemaFormValid(GetValidations(FormFormation2.lanes));
  }, []);
  useEffect(() => {
    const makeSchema = schemaFormValid.map((s) => {
      return { [s]: yup.string().required() };
    });
    console.log("key-->here", makeSchema);
  }, [schemaFormValid]);
  let schema = yup.object().shape({
    textarea1645687017089: yup.string().required(),
    input1645687013711: yup.string().required(),
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => console.log("data", data);
  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        {/* <div
          style={{ border: "1px solid #d3d3d3", padding: 20, width: "100%" }}
        >
          {JSON.stringify(errors)}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form register={register} control={control} data={FormFormation2} />
          </form>
        </div> */}

        <h2 style={{ marginTop: 30 }}>Form Builder</h2>
        <Designer />
      </div>
    </>
  );
}
export default App;
