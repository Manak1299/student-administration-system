import { SUBJECT_DELETE_FAIL,
 SUBJECT_DELETE_REQUEST,
SUBJECT_DELETE_SUCCESS, SUBJECT_LIST_FAIL, SUBJECT_LIST_REQUEST, SUBJECT_LIST_SUCCESS,SUBJECT_REGISTER_FAIL, SUBJECT_REGISTER_REQUEST,SUBJECT_REGISTER_SUCCESS} from "../constants/subjectconstants";


function subjectRegisterReducer(state = { subjectdetails: {} }, action) {
    switch (action.type) {
      case SUBJECT_REGISTER_REQUEST:
        return { loading: true };
      case SUBJECT_REGISTER_SUCCESS:
        return { loading: false, success: true, product: action.payload };
      case SUBJECT_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function subjectListReducer(state = {subjectinfo: [] }, action) {
    switch (action.type) {
      case SUBJECT_LIST_REQUEST:
        return { loading: true, subjectinfo: [] };
      case SUBJECT_LIST_SUCCESS:
        return { loading: false, subjectinfo: action.payload };
      case SUBJECT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  function subjectDeleteReducer(state = { subjectinfo: {} }, action) {
    switch (action.type) {
      case SUBJECT_DELETE_REQUEST:
        return { loading: true };
      case SUBJECT_DELETE_SUCCESS:
        return { loading: false, product: action.payload, success: true };
      case SUBJECT_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  }
  
  export { subjectDeleteReducer, subjectListReducer, subjectRegisterReducer}