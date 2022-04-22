import { combineReducers } from "redux";

import squaresReducer from "./squaresSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import modalsReducer from "./modalsSlice";
import usersReducer from "./usersSlice";

export default combineReducers({
  squares: squaresReducer,
  auth: authReducer,
  user: userReducer,
  modals: modalsReducer,
  users: usersReducer,
});
