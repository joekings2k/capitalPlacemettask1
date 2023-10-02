import React, { useState } from "react";
import {  UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import axios from "axios";
import useAppContext from "src/hooks/useAppstate";
import Image from "./Image";

const { Dragger } = Upload;



const DragDropComp: React.FC = () => {
  const {state}=useAppContext()
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const props: UploadProps = {
    name: "file",
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "removed") setImagePreview(null);
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop() {
      
    },
  };

    
   const customRequest = async ({
     file,
     onSuccess,
     onError,
   }: any) => {
    const uploadUrl =
      "http://127.0.0.1:4010/api/55.552326520015875/programs/fuga/application-form";
      const blobURL = URL.createObjectURL(file);
     
     try {
       const formData = new FormData();
       formData.append("file", file);
       const requestBody = {
         data: {
           id: "08346c6d-e622-a288-f0f6-e74b28abb616",
           type: "dolore",
           attributes: {
             coverImage: blobURL,
             personalInformation: state.personalInfo.personalInformation,
           },
         },
       };
       const response = await axios.put(uploadUrl, requestBody, {
         headers: {
           "Content-Type": "application/json",
         },
       });       
       onSuccess(response.data, file);
     } catch (error) {
       onError(error);
     }
   };

    const handleFileChange = (file: RcFile | undefined) => {
      if (file) {
        // Create a preview URL for the selected image
        const blobURL = URL.createObjectURL(file);
        setImagePreview(blobURL);
      } else {
        setImagePreview(null);
      }
    };
  return (
    <Dragger
      {...props}
      customRequest={customRequest}
      style={{ border: "2px dashed black" }}
      beforeUpload={handleFileChange}
    >
      {imagePreview ? (
        <Image
          src={imagePreview}
          width="300px"
          height="300px"
        />
      ) : (
        <div>
          <p className="">
            <UploadOutlined style={{ fontSize: "2.5rem" }} />
          </p>
          <p style={{ fontSize: "0.95rem", fontWeight: "600" }}>
            Upload cover image
          </p>
          <p className="ant-upload-hint" style={{ marginBottom: "3.9rem" }}>
            16:9 ratio is recommended. Max image size 1mb
          </p>
        </div>
      )}
    </Dragger>
  );
  };

export default DragDropComp;
