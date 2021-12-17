import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // set an Alert
  const setAlert = (msg, type, timeout = 3000) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    });
    // Remove Alert After 3 secondes
    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), timeout);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
