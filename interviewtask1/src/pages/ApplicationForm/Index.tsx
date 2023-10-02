import Card from "src/components/Card";
import DragDropComp from "src/components/DragDropComp";
import { Layout } from "src/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import useAppContext from "src/hooks/useAppstate";
import { ActionType } from "src/context/AppContext";
import FieldComponent from "src/components/FieldComponent";
import QuestionType from "src/components/QuestionType";
import { PlusOutlined } from "@ant-design/icons";
import EditComponent from "src/components/EditComponent";
const ApplicationForm = () => {
  const { state, dispatch } = useAppContext();
  const [showQuestion, setShowQuestion] = useState(false);
  const [showQuestion1, setShowQuestion1] = useState(false);
  const [showQuestion2, setShowQuestion2] = useState(false);
  useEffect(() => {
    const getFormData = async () => {
      const response = await axios.get(
        "http://127.0.0.1:4010/api/507.11514903507924/programs/doloribus/application-form"
      );
      dispatch({
        type: ActionType.setpersonalInfo,
        payload: {
          personalInfo: response.data?.data?.attributes,
          profileQuestions:
            response.data?.data?.attributes?.profile.profileQuestions,
          personalQuestion:
            response.data?.data?.attributes?.personalInformation
              .personalQuestions,
          additionalQuestions:
            response.data?.data?.attributes?.customisedQuestions,
        },
      });
    };
    getFormData();
  }, []);
  console.log(state.additionalQuestions);
  

  let personalInfoElements = null;

  if (state?.personalInfo?.personalInformation) {
    const personalInfosElements = Object.keys(
      state.personalInfo.personalInformation
    ).filter((info) => info !== "personalQuestions");

    personalInfoElements = personalInfosElements.map((info) => (
      <FieldComponent
        key={info}
        label={info}
        checkedState={state.personalInfo.personalInformation[info].show}
        switchLabel="Internal"
      />
    ));
  }

  return (
    <Layout>
      <Card title="Upload cover image" mt="7rem">
        <div style={{ padding: "2.5rem" }}>
          <DragDropComp />
        </div>
      </Card>

      <Card title="Personal Information" mt="3.8rem">
        <div style={{ padding: "1.5rem" }}>
          {personalInfoElements ? personalInfoElements : <div>Loading ...</div>}

          {state.personalQuestion &&
            state.personalQuestion.map((question: any, index: number) => (
              <EditComponent
                key={index}
                questionTypeLabel={question?.type}
                questionLabel={question?.question}
                question={question}
                cardType="personal"
              />
            ))}
          <QuestionType
            cardType="personal"
            showQuestion={showQuestion}
            setShowQuestion={setShowQuestion}
          />
          <span
            style={{ display: "flex" }}
            onClick={() => setShowQuestion(true)}
          >
            <PlusOutlined style={{ fontSize: "1.5rem" }} />
            <p style={{ fontSize: "1rem", marginLeft: "0.8rem" }}>
              Add a question
            </p>
          </span>
        </div>
      </Card>

      <Card title="Profile" mt="3.8rem">
        <div style={{ padding: "1.5rem" }}>
          <FieldComponent label={"Education"} switchLabel="Mandatory" />
          <FieldComponent label={"Experience"} switchLabel="Mandatory" />
          <FieldComponent label={"Resume"} switchLabel="Mandatory" />
          {state.profileQuestions &&
            state.profileQuestions.map((question: any, index: number) => (
              <EditComponent
                key={index}
                questionTypeLabel={question?.type}
                questionLabel={question?.question}
                question={question}
                cardType="profile"
              />
            ))}
          <QuestionType
            cardType="profile"
            showQuestion={showQuestion1}
            setShowQuestion={setShowQuestion1}
          />
          <span
            style={{ display: "flex" }}
            onClick={() => setShowQuestion1(true)}
          >
            <PlusOutlined style={{ fontSize: "1.5rem" }} />
            <p style={{ fontSize: "1rem", marginLeft: "0.8rem" }}>
              Add a question
            </p>
          </span>
        </div>
      </Card>

      <Card title="Additional questions" mt="3.8rem">
        <div style={{ padding: "1.5rem" }}>
          {state.additionalQuestions &&
            state.additionalQuestions.map((question: any, index: number) => (
              <EditComponent
                key={index}
                questionTypeLabel={question?.type}
                questionLabel={question?.question}
                index={question.id}
                question={question}
                cardType="additional"
              />
            ))}
          <QuestionType
            cardType="additional"
            showQuestion={showQuestion2}
            setShowQuestion={setShowQuestion2}
          />
          <span
            style={{ display: "flex" }}
            onClick={() => setShowQuestion2(true)}
          >
            <PlusOutlined style={{ fontSize: "1.5rem" }} />
            <p style={{ fontSize: "1rem", marginLeft: "0.8rem" }}>
              Add a question
            </p>
          </span>
        </div>
      </Card>
    </Layout>
  );
};

export default ApplicationForm;
