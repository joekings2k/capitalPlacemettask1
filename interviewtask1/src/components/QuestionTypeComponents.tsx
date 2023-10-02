import { useState } from "react";
import InputComponent from "./InputComponent";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { Select } from "antd";

interface MultipleChoiceProps{
  questionType?:string;
}
export const YesNO =()=>{
return (
  <div style={{marginTop:"1rem"}}>
    <Checkbox>Disqualify candidate if the answer is no</Checkbox>
  </div>
);
}

export const MultipleChoice =({questionType}:MultipleChoiceProps)=>{
  const [inputCount, setInputCount] = useState(1);
  const [inputValues, setInputValues] = useState([""]);

    const handleAddInput = () => {
      setInputCount(inputCount + 1);
      setInputValues([...inputValues, ""]);
    };
     const handleInputChange = (index:number, value:string) => {
       const newInputValues = [...inputValues];
       newInputValues[index] = value;
       setInputValues(newInputValues);
       console.log(newInputValues)
     };
      
  return (
    <div style={{}}>
      {inputValues.map((value, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <InputComponent
            key={index}
            placeholder="Type here"
            type="text"
            value={value}
            icons="Y"
            width="22rem"
            onChange={(e) => handleInputChange(index, e)}
          />
          {index === inputValues.length - 1 && (
            <PlusOutlined
              style={{
                fontSize: "1.5rem",
                marginLeft: "1.5rem",
                marginTop: "1.2rem",
              }}
              onClick={handleAddInput}
            />
          )}
        </div>
      ))}
      <Checkbox style={{ marginTop: "1.2rem" }}>
        {" "}
        Enable "Other" option
      </Checkbox>
      {questionType === "Multiple choice" && (
        <InputComponent
          placeholder="Enter number of choice allowed here"
          label="Max choice allowed"
          type="number"
        />
      )}
    </div>
  );
}

export const Video =()=>{
   const handleChange = (value: string) => {
     console.log(`selected ${value}`);
     
   };
  return (
    <div>
      <InputComponent placeholder="Description" height="5.5rem" />
      <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
        <InputComponent placeholder="Max duration of video" />

        <Select
          className="custom-select"
          placeholder="in (sec/min)"
          style={{
            width: "100%",
            height: "2.3rem",
            marginTop: "1.2rem",
            marginLeft: "0.5rem",
          }}
          onChange={handleChange}
          options={[
            { value: "sec", label: "Sec" },
            { value: "min", label: "Min" },
          ]}
        />
      </div>
    </div>
  );
}