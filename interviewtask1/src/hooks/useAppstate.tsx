import { useContext } from "react";
import { DataValueContext } from "src/context/AppContext";

const useAppContext = () => {
  return useContext(DataValueContext);
};

export default useAppContext;
