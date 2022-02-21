import { combineReducers } from "redux";

import squaresReducer from "./squaresSlice";

export default combineReducers({
  squares: squaresReducer,
});
