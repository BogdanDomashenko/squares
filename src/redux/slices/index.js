import { combineReducers } from "redux";

import squaresReducer from "./squaresSlice";
import userReducer from "./userSlice";

export default combineReducers({
  squares: squaresReducer,
  user: userReducer,
});
