import React from 'react'
import { Input } from "antd";
import { UnorderedListOutlined } from '@ant-design/icons';
interface props{
  label?:string;
  placeholder:string;
  value ?:string | number;
  icons?:string;
  type?:string ;
  width?:string;
  height?:string;
  onChange ?:(value:any)=>void;
}
const InputComponent = ({label,placeholder,value,icons,type,width,height,onChange}:props) => {
  return (
    <div>
      <p
        style={{
          fontSize: "1.25rem",
          fontWeight: 600,
          marginBottom: "0.3rem",
          marginLeft: icons ? "2rem" : "",
          transition: "ease-out 0.2s",
        }}
      >
        {label}
      </p>
      <span
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icons && (
          <UnorderedListOutlined
            style={{ fontSize: "1.5rem", marginRight: "0.5rem" }}
          />
        )}
        <Input
          placeholder={placeholder}
          value={value}
          style={{
            borderRadius: "0px",
            height:height?height: "2.3rem",
            width: width ? width : "100%",
          }}
          type={type}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
      </span>
    </div>
  );
}

export default InputComponent