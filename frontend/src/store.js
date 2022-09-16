import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Cookie from "js-cookie";

import {
  userSigninReducer,
  userRegisterReducer,
} from "./reducers/userreducers";

import {
  classRegisterReducer,
  classListReducer,
  classDeleteReducer,
  divisionDeleteReducer,
  divisionListReducer,
  divisionRegisterReducer,
} from "./reducers/classreducers";

import{
  subjectDeleteReducer,subjectListReducer,subjectRegisterReducer
} from "./reducers/subjectreducers";
import {
  infoformRegisterReducer,
  infoformListReducer,
  infoDeleteReducer
} from "./reducers/infoformreducers";
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = { userSignin: { userInfo } };
const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  classSave: classRegisterReducer,
  classList: classListReducer,
  classDelete: classDeleteReducer,
  divisionSave: divisionRegisterReducer,
  divisionList: divisionListReducer,
  divisionDelete: divisionDeleteReducer,
  infoformSave: infoformRegisterReducer,
  infoformList: infoformListReducer,
  infoDelete : infoDeleteReducer,
  subjectSave: subjectRegisterReducer,
  subjectList: subjectListReducer,
  subjectDelete: subjectDeleteReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
