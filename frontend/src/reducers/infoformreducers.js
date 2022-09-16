import {
  INFOFORM_REGISTER_FAIL,
  INFOFORM_REGISTER_REQUEST,
  INFOFORM_REGISTER_SUCCESS,
  INFOFORM_LIST_FAIL,
  INFOFORM_LIST_REQUEST,
  INFOFORM_LIST_SUCCESS,
  INFOFORM_DELETE_FAIL,
  INFOFORM_DELETE_REQUEST,
  INFOFORM_DELETE_SUCCESS
} from "../constants/infoformconstants";

function infoformRegisterReducer(state = { infoformdetails: {} }, action) {
  switch (action.type) {
    case INFOFORM_REGISTER_REQUEST:
      return { loading: true };
    case INFOFORM_REGISTER_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case INFOFORM_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function infoformListReducer(state = { studentinfo: [] }, action) {
  switch (action.type) {
    case INFOFORM_LIST_REQUEST:
      return { loading: true, studentinfo: [] };
    case INFOFORM_LIST_SUCCESS:
      return { loading: false, studentinfo: action.payload };
    case INFOFORM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function infoDeleteReducer(state = { studentinfo: {} }, action) {
  switch (action.type) {
    case INFOFORM_DELETE_REQUEST:
      return { loading: true };
    case INFOFORM_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case INFOFORM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}



export { infoformRegisterReducer, infoformListReducer, infoDeleteReducer };
