import {
  CLASS_REGISTER_FAIL,
  CLASS_REGISTER_SUCCESS,
  CLASS_REGISTER_REQUEST,
  CLASS_LIST_FAIL,
  CLASS_LIST_REQUEST,
  CLASS_LIST_SUCCESS,
  CLASS_DELETE_FAIL,
  CLASS_DELETE_REQUEST,
  CLASS_DELETE_SUCCESS,
  DIVISION_DELETE_FAIL,
  DIVISION_DELETE_SUCCESS,
  DIVISION_DELETE_REQUEST,
  DIVISION_LIST_FAIL,
  DIVISION_LIST_REQUEST,
  DIVISION_LIST_SUCCESS,
  DIVISION_REGISTER_FAIL,
  DIVISION_REGISTER_REQUEST,
  DIVISION_REGISTER_SUCCESS,
} from "../constants/classconstants";

function classRegisterReducer(state = { classdetails: {} }, action) {
  switch (action.type) {
    case CLASS_REGISTER_REQUEST:
      return { loading: true };
    case CLASS_REGISTER_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case CLASS_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function classListReducer(state = { classinfo: [] }, action) {
  switch (action.type) {
    case CLASS_LIST_REQUEST:
      return { loading: true, classinfo: [] };
    case CLASS_LIST_SUCCESS:
      return { loading: false, classinfo: action.payload };
    case CLASS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function classDeleteReducer(state = { classinfo: {} }, action) {
  switch (action.type) {
    case CLASS_DELETE_REQUEST:
      return { loading: true };
    case CLASS_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case CLASS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function divisionRegisterReducer(state = { divisiondetails: {} }, action) {
  switch (action.type) {
    case DIVISION_REGISTER_REQUEST:
      return { loading: true };
    case DIVISION_REGISTER_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case DIVISION_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function divisionListReducer(state = { divisioninfo: [] }, action) {
  switch (action.type) {
    case DIVISION_LIST_REQUEST:
      return { loading: true, divisioninfo: [] };
    case DIVISION_LIST_SUCCESS:
      return { loading: false, divisioninfo: action.payload };
    case DIVISION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function divisionDeleteReducer(state = { divisioninfo: {} }, action) {
  switch (action.type) {
    case DIVISION_DELETE_REQUEST:
      return { loading: true };
    case DIVISION_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case DIVISION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  classRegisterReducer,
  classListReducer,
  classDeleteReducer,
  divisionDeleteReducer,
  divisionListReducer,
  divisionRegisterReducer,
};
