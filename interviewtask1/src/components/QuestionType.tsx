import { Select } from "antd";
import InputComponent from "./InputComponent";
import { CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import { MultipleChoice, Video, YesNO } from "./QuestionTypeComponents";
import axios from "axios";
import useAppContext from "src/hooks/useAppstate";
import { ActionType } from "src/context/AppContext";
import { v4 as uuid } from "uuid";
interface props {
  showQuestion: boolean;
  cardType?: string;
  editValue?: string;
  editQuestionId?:string
  setShowQuestion: (value: boolean) => void;
}
const questionTypes: string[] = [
  "Paragraph",
  "Short answer",
  "Yes/No",
  "Dropdown",
  "Multiple choice",
  "Date",
  "Number",
  "File upload",
  "Video",
];

const QuestionType = ({
  showQuestion,
  cardType,
  setShowQuestion,
  editValue,
  editQuestionId,
}: props) => {
  const { state, dispatch } = useAppContext();
  const [questionType, setQuestionType] = useState(editValue);
  const [question, setQuestion] = useState<string>();

  const handleQuestionChange = (value: string) => {
    setQuestion(value);
  };
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setQuestionType(value);
  };

  const options = questionTypes.map((type) => ({
    value: type,
    label: type,
  }));
  const config = {
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
  };
  const handleSubmit = async () => {
    const url =
      "http://127.0.0.1:4010/api/992.7961813019758/programs/neque/application-form";

    
    if (editValue) {
      const updatedQuestion = {
        id: editQuestionId,
        type: questionType,
        question: question,
      };
      const requestBody = {
        data: {
          id: "08346c6d-e622-a288-f0f6-e74b28abb616",
          type: "dolore",
          attributes: {
            personalInformation: { ...state.personalInfo.personalInformation ,[state.personalInfo.personalInformation.personalQuestions]:updatedQuestion},
          },
        },
      };
      await axios.put(url, requestBody, config);

      dispatch({
        type: ActionType.editPersonalQuestion,
        payload:{id :editQuestionId,type:cardType,updatedQuestion} ,
      });
    } else {
      const updatedQuestion = {
        id: uuid(),
        type: questionType,
        question: question,
      };
      const updatedPersonalQuestions = [
        ...(state.personalQuestion || []), // Use the existing questions if available
        updatedQuestion,
      ];
      const requestBody = {
        data: {
          id: "08346c6d-e622-a288-f0f6-e74b28abb616",
          type: "dolore",
          attributes: {
            personalInformation: state.personalInfo.personalInformation,
            personalQuestions: updatedPersonalQuestions,
          },
        },
      };

       await axios.put(url, requestBody, config);
      dispatch({
        type: ActionType.setPersonalQuestions,
        payload: { type: cardType, questions: [updatedQuestion] },
      });
    }
    console.log(question)
    setShowQuestion(false);
    setQuestion("");
  };

  return (
    <div>
      {showQuestion && (
        <div style={{ marginTop: "2.5rem" }}>
          <Select
            className="custom-select"
            defaultValue={editValue ? editValue : ""}
            style={{ width: "100%", height: "2.3rem" }}
            onChange={handleChange}
            options={options}
          />
          <InputComponent
            label="Question"
            placeholder="Type here"
            value={question}
            onChange={(value) => handleQuestionChange(value)}
          />
          {(questionType === "Multiple choice" ||
            questionType === "Dropdown") && (
            <MultipleChoice questionType={questionType} />
          )}
          {questionType === "Video" && <Video />}
          {questionType === "Yes/No" && <YesNO />}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.5rem",
              alignItems: "center",
            }}
          >
            <span
              style={{ color: "#A80000", fontWeight: 900 }}
              onClick={() => setShowQuestion(false)}
            >
              <CloseOutlined /> {"  "} Delete question
            </span>
            <div
              style={{
                backgroundColor: "#087B2F",
                borderRadius: " 0.3125rem",
                color: "white",
                padding: "0.5rem 1.2rem ",
                cursor: "pointer",
              }}
              onClick={handleSubmit}
            >
              Save
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionType;
