import React, { useState } from 'react'
import { Switch ,Checkbox } from "antd";
import axios from "axios"
import useAppContext from 'src/hooks/useAppstate';
interface props {
  label: string;
  switchLabel?: string;
  checkedState?:boolean|undefined;
}


const FieldComponent = ({ label, switchLabel,checkedState }: props) => {
  console.log(checkedState)
  const [isChecked, setIsChecked] = useState<boolean | null |undefined>(checkedState);
  const {state}=useAppContext()
  const handleChange= async(e:any)=>{

     const internalUse =e.target.checked
    const Url =
      "http://127.0.0.1:4010/api/55.552326520015875/programs/fuga/application-form";

    const updatedData = {
      data: {
        id: "08346c6d-e622-a288-f0f6-e74b28abb616",
        type: "dolore",
        attributes: {
          personalInformation: {
            [label]:{
              internalUse:internalUse
            },
            ...state.personalInfo.personalInformation,
          }
        },
      },
    };
    await axios.put(Url, updatedData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  
   
  }
  const onChange = async(checked: boolean) => {
     const Url =
       "http://127.0.0.1:4010/api/55.552326520015875/programs/fuga/application-form";

     const updatedData = {
       data: {
         id: "08346c6d-e622-a288-f0f6-e74b28abb616",
         type: "dolore",
         attributes: {
           personalInformation: {
             [label]: {
               show: checked,
             },
             ...state.personalInfo.personalInformation,
           },
         },
       },
     };
     await axios.put(Url, updatedData, {
       headers: {
         "Content-Type": "application/json",
       },
     });
  
    setIsChecked(checked);
  };

  return (
    <div style={{ position: "relative" }}>
      <p style={{ marginBottom: "1.3rem" ,fontWeight:900 }}>{label}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
          position: "absolute",
          top: -33,
          right: 0,
        }}
      >
        <Checkbox className="newcheck" style={{}} onChange={(e)=>{handleChange(e)}}>
          {switchLabel}
        </Checkbox>
        <span
          style={{ display: "flex", alignItems: "center", padding: "0.5rem" }}
        >
          <Switch
            defaultChecked={checkedState}
            onChange={onChange}
            style={{
              backgroundColor: isChecked ? "white" : "green",
              marginRight: "0.5rem",
            }}
            size="small"
          />
          <p>{isChecked ? "Hide" : "Show"}</p>
        </span>
      </div>

      <hr />
    </div>
  );
};

export default FieldComponent