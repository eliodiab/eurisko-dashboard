import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import articlesReducer from "./articlesReducer";

const rootReducer = () => combineReducers({
    login: loginReducer,
    dashboard: articlesReducer,
});

export default rootReducer;