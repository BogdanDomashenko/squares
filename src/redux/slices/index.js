import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import squaresReducer from "./squaresSlice";
import userReducer from "./userSlice";

export default combineReducers({
  squares: squaresReducer,
  user: userReducer,
});
