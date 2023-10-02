import { useReducer, createContext } from "react";

export enum ActionType {
  setpersonalInfo = "setPersonalInfo",
  setPersonalQuestions="setPersonalQuestions",
  editPersonalQuestion = "editPersonalQuestion",
}
interface Action {
  type: ActionType;
  payload?: any;
}
interface Appdata {

  personalInfo: any | null;
  personalQuestion:any|null;
  profileQuestions:any|null;
  additionalQuestions:any|null;
 
}
interface Props {
  children: React.ReactNode;
}


const initialState: Appdata = {
  personalInfo:null,
  personalQuestion:null,
  profileQuestions:null,
  additionalQuestions:null,
};
const reducer = (state: Appdata, action: Action) => {
  const { type } = action;
  switch (type) {
    case ActionType.setpersonalInfo:
      return {
        ...state,
        personalInfo: action.payload.personalInfo,
        profileQuestions:action.payload.profileQuestions,
        personalQuestion:action.payload.personalQuestion,
        additionalQuestions:action.payload.additionalQuestions
      };
    case ActionType.setPersonalQuestions:
      if (action.payload.type === "personal"){
        return {
          ...state,
          personalQuestion: [
            ...(state.personalQuestion || []),
            ...action.payload.questions,
          ],
        };
      }else if (action.payload.type ==="profile"){
        return {
          ...state,
          profileQuestions: [
            ...(state.profileQuestions || []),
            ...action.payload.questions,
          ],
        };
      }else if (action.payload.type === "additional"){
        return {
          ...state,
          additionalQuestions: [
            ...(state.additionalQuestions || []),
            ...action.payload.questions,
          ],
        };
      }
      return state
    case ActionType.editPersonalQuestion:
      if (action.payload.type ==="personal"){
        const questionIndex = state.personalQuestion.findIndex(
          (question: any) => question.id === action.payload.id
        );
        if (questionIndex !== -1) {
          const updatedQuestions = [...state.personalQuestion];
          updatedQuestions[questionIndex] = action.payload.updatedQuestion;

          return {
            ...state,
            personalQuestion: updatedQuestions,
          };
        }
      }else if (action.payload.type === "profile"){
        const questionIndex = state.profileQuestions.findIndex(
          (question: any) => question.id === action.payload.id
        );
        if (questionIndex !== -1) {
          const updatedQuestions = [...state.profileQuestions];
          updatedQuestions[questionIndex] = action.payload.updatedQuestion;

          return {
            ...state,
            profileQuestions: updatedQuestions,
          };
        }
      }else if (action.payload.type === "additional") {
        const questionIndex = state.additionalQuestions.findIndex(
          (question: any) => question.id === action.payload.id
        );
        if (questionIndex !== -1) {
          const updatedQuestions = [...state.additionalQuestions];
          updatedQuestions[questionIndex] = action.payload.updatedQuestion;

          return {
            ...state,
            additionalQuestions: updatedQuestions,
          };
        }
      }
      
      return state; 

    default:
      return state;
  }
};

const DataValueContext = createContext<{
  state: Appdata;
  dispatch: React.Dispatch<any>;
}>({ state: initialState, dispatch: () => {} });

const DataValueProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataValueContext.Provider value={{ state, dispatch }}>
      {children}
    </DataValueContext.Provider>
  );
};

export { DataValueContext, DataValueProvider };
