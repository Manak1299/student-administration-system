import axios from "axios";
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
const infoformdetails = (infoformdetails) => async (dispatch, getState) => {
  try {
    dispatch({ type: INFOFORM_REGISTER_REQUEST, payload: infoformdetails });
    const {
      userSignin: { userInfo },
    } = getState();

    if (!infoformdetails._id) {
      const { data } = await axios.post("/api/studentinfo", infoformdetails, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: INFOFORM_REGISTER_SUCCESS, payload: data });
    } else {
      const { data } = await axios.put(
        "/api/studentinfo/" + infoformdetails._id,
        infoformdetails,
        {
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }
      );
      dispatch({ type: INFOFORM_REGISTER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: INFOFORM_REGISTER_FAIL, payload: error.message });
  }
};

const listinfoform = () => async (dispatch) => {
  try {
    dispatch({ type: INFOFORM_LIST_REQUEST });
    const { data } = await axios.get("/api/studentinfo");
    
    console.log(data);
    dispatch({ type: INFOFORM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: INFOFORM_LIST_FAIL, payload: error.message });
  }
};

const deleteInfo = (infoId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: INFOFORM_DELETE_REQUEST, payload: infoId });
    const { data } = await axios.delete("/api/studentinfo/" + infoId, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: INFOFORM_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: INFOFORM_DELETE_FAIL, payload: error.message });
  }
};


export { infoformdetails, listinfoform, deleteInfo };
