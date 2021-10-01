import { combineReducers } from "redux";
import auth from "./reducers/auth";
import question from "./reducers/question";
const rootReducer = combineReducers({ auth, question });
export default rootReducer;
