import { combineReducers } from "redux";

import squaresReducer from "./squaresSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";

export default combineReducers({
  squares: squaresReducer,
  auth: authReducer,
  user: userReducer,
});
