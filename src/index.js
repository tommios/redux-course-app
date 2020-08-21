import "./styles.css";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { rootReducer } from "./redux/rootReducer";
import {
  increment,
  decrement,
  asyncIncrement,
  changeTheme,
} from "./redux/actions";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asyncBtn = document.getElementById("async");
const themeBtn = document.getElementById("theme");

// Пример создания собственного middleware:
//
// middleware - это обычная функция которая принимает в себя state,
//  эта функция должна вернуть функцию которая принимает в себя параметр next,
//   которая в свою очередь возвращает функцию которая принимает action:

// function logger(state) {
//   return function (next) {
//     return function (action) {
//       console.log("Previos State", state.getState());
//       console.log("Action", action);

//       const newState = next(action);

//       console.log("New State", state.getState());
//       return newState;
//     };
//   };
// }

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
//window.store = store; // for watch in console

addBtn.addEventListener("click", () => {
  store.dispatch(increment());
});

subBtn.addEventListener("click", () => {
  store.dispatch(decrement());
});

asyncBtn.addEventListener("click", () => {
  store.dispatch(asyncIncrement());
});

themeBtn.addEventListener("click", () => {
  const newTheme = document.body.classList.contains("light") ? "dark" : "light";
  store.dispatch(changeTheme(newTheme));
  //document.body.classList.toggle("dark");
});

// Подписываемся на изменения в store,
//  при каждом изменении store будет вызываться callback, который мы передадим
store.subscribe(() => {
  const state = store.getState();
  counter.textContent = state.counter;
  document.body.className = state.theme.value;

  [addBtn, subBtn, asyncBtn, themeBtn].forEach((btn) => {
    btn.disabled = state.theme.disabled;
  });
});

store.dispatch({ type: "INIT_APPLICATION" });
