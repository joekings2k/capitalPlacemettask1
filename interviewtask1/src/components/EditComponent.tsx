import {EditOutlined} from "@ant-design/icons"
import { useState } from "react";
import QuestionType from "./QuestionType";

interface props {
  questionTypeLabel: string;
  questionLabel:string;
  index?:number;
  question?:any;
  cardType?:string;
}
const EditComponent = ({questionTypeLabel,questionLabel,index,question,cardType}:props) => {
  const [isEditing,setIsEditing] = useState<boolean|null>(false)
  return (
    <div>
      {isEditing ? (
        <div>
          <QuestionType
            showQuestion={isEditing}
            setShowQuestion={setIsEditing}
            editValue={question?.type}
            editQuestionId={question?.id}
            cardType={cardType}
          />
        </div>
      ) : (
        <div>
          <p
            style={{
              color: "#979797",
              fontSize: "0.8rem",
              fontWeight: 600,
              marginBottom: "0rem",
            }}
          >
            {questionTypeLabel}
          </p>
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            <p>{questionLabel}</p>{" "}
            <EditOutlined onClick={() => setIsEditing(true)} />
          </span>

          <hr style={{ borderTop: " 1px solid #C4C4C4" }} />
        </div>
      )}
    </div>
  );
}

export default EditComponent