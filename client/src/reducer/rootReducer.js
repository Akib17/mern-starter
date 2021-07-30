import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from "./postReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    post: postReducer
});

export default rootReducer;