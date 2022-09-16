import axios from "axios";
import {SUBJECT_DELETE_FAIL, SUBJECT_DELETE_REQUEST,
SUBJECT_DELETE_SUCCESS, SUBJECT_LIST_FAIL, 
SUBJECT_LIST_REQUEST,
SUBJECT_LIST_SUCCESS,
SUBJECT_REGISTER_FAIL,
SUBJECT_REGISTER_REQUEST,
SUBJECT_REGISTER_SUCCESS} from "../constants/subjectconstants";

const subjectdetails = (subjectdetails) => async (dispatch, getState) => {
    try {
      dispatch({ type: SUBJECT_REGISTER_REQUEST, payload: subjectdetails });
      const {
        userSignin: { userInfo },
      } = getState();
  
      if (!subjectdetails._id) {
        const { data } = await axios.post("/api/subjects", subjectdetails, {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        });
        dispatch({ type: SUBJECT_REGISTER_SUCCESS, payload: data });
      } else {
        const { data } = await axios.put(
          "/api/subjects/" + subjectdetails._id,
          subjectdetails,
          {
            headers: {
              Authorization: "Bearer " + userInfo.token,
            },
          }
        );
        dispatch({ type: SUBJECT_REGISTER_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: SUBJECT_REGISTER_FAIL, payload: error.message });
    }
  };
  
  const listSubjects = () => async (dispatch) => {
    try {
      dispatch({ type: SUBJECT_LIST_REQUEST });
      const { data } = await axios.get("/api/subjects");
      console.log(data);
      dispatch({ type: SUBJECT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: SUBJECT_LIST_FAIL, payload: error.message });
    }
  };
  
  const deleteSubject = (subjectId) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      dispatch({ type: SUBJECT_DELETE_REQUEST, payload: subjectId });
      const { data } = await axios.delete("/api/subjects/" + subjectId, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: SUBJECT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: SUBJECT_DELETE_FAIL, payload: error.message });
    }
  };

export {subjectdetails, listSubjects, deleteSubject };  