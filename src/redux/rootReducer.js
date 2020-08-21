import {
  ASYNC_INCREMENT,
  INCREMENT,
  DECREMENT,
  CHANGE_THEME,
  ENABLE_BUTTONS,
  DISABLE_BUTTONS,
} from "./types";
import { combineReducers } from "redux";

function counterReducer(state = 0, action) {
  if (action.type === INCREMENT) return state + 1;
  else if (action.type === DECREMENT) return state - 1;
  else if (action.type === ASYNC_INCREMENT) return state + 1;

  return state;
}

const initialThemeValue = {
  value: "light",
  disabled: false,
};

function themeReducer(state = initialThemeValue, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, value: action.payload };
    case ENABLE_BUTTONS:
      return { ...state, disabled: false };
    case DISABLE_BUTTONS:
      return { ...state, disabled: true };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer,
});
