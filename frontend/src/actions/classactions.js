import axios from "axios";
import {
  CLASS_REGISTER_FAIL,
  CLASS_REGISTER_SUCCESS,
  CLASS_REGISTER_REQUEST,
  CLASS_LIST_REQUEST,
  CLASS_LIST_SUCCESS,
  CLASS_LIST_FAIL,
  CLASS_DELETE_FAIL,
  CLASS_DELETE_REQUEST,
  CLASS_DELETE_SUCCESS,
  DIVISION_DELETE_FAIL,
  DIVISION_DELETE_REQUEST,
  DIVISION_DELETE_SUCCESS,
  DIVISION_LIST_FAIL,
  DIVISION_LIST_REQUEST,
  DIVISION_LIST_SUCCESS,
  DIVISION_REGISTER_FAIL,
  DIVISION_REGISTER_REQUEST,
  DIVISION_REGISTER_SUCCESS,
} from "../constants/classconstants";

/* const classdetails = () => async (dispatch) => {
  dispatch({
    type: CLASS_REGISTER_REQUEST,
    payload: { classno, division },
  });
  try {
    const { data } = await Axios.post("/api/class/", {
      classno,
      division,
    });
    dispatch({ type: CLASS_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CLASS_REGISTER_FAIL, payload: error.message });
  }
};

 */
const classdetails = (classdetails) => async (dispatch, getState) => {
  try {
    dispatch({ type: CLASS_REGISTER_REQUEST, payload: classdetails });
    const {
      userSignin: { userInfo },
    } = getState();

    if (!classdetails._id) {
      const { data } = await axios.post("/api/classes", classdetails, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: CLASS_REGISTER_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        "/api/classes/" + classdetails._id,
        classdetails,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      dispatch({ type: CLASS_REGISTER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: CLASS_REGISTER_FAIL, payload: error.message });
  }
};

const listClasses = () => async (dispatch) => {
  try {
    dispatch({ type: CLASS_LIST_REQUEST });
    const { data } = await axios.get("/api/classes");
    console.log(data);
    dispatch({ type: CLASS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CLASS_LIST_FAIL, payload: error.message });
  }
};

const deleteClass = (classId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: CLASS_DELETE_REQUEST, payload: classId });
    const { data } = await axios.delete("/api/classes/" + classId, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: CLASS_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: CLASS_DELETE_FAIL, payload: error.message });
  }
};

const divisiondetails = (divdetails) => async (dispatch, getState) => {
  try {
    dispatch({ type: DIVISION_REGISTER_REQUEST, payload: divdetails });
    const {
      userSignin: { userInfo },
    } = getState();

    if (!divdetails._id) {
      const { data } = await axios.post("/api/divisions", divdetails, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: DIVISION_REGISTER_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        "/api/divisions/" + divdetails._id,
        divdetails,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      dispatch({ type: DIVISION_REGISTER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: DIVISION_REGISTER_FAIL, payload: error.message });
  }
};

const listdivision = () => async (dispatch) => {
  try {
    dispatch({ type: DIVISION_LIST_REQUEST });
    const { data } = await axios.get("/api/divisions");
    console.log(data);
    dispatch({ type: DIVISION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DIVISION_LIST_FAIL, payload: error.message });
  }
};

const deletedivision = (divId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: DIVISION_DELETE_REQUEST, payload: divId });
    const { data } = await axios.delete("/api/divisions/" + divId, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: DIVISION_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: DIVISION_DELETE_FAIL, payload: error.message });
  }
};

export {
  classdetails,
  listClasses,
  deleteClass,
  divisiondetails,
  listdivision,
  deletedivision,
};
