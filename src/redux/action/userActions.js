import axios from "axios";

export const GET_USERS_SUCCESSFULLY = "GET_USERS_SUCCESSFULLY";
export const GET_USERS_FAILED = "BOOKING_REQUEST_FAILED";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const UPDATE_USER_SUCCESSFULLY = "UPDATE_USER_SUCCESSFULLY";



export const getUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get(`http://localhost:8000/api/user`, {
      headers,
    });
    dispatch(getUsersSuccess(response.data.data));
  } catch (error) {
    const errorMessage = error.response.data.message;
    dispatch(getUsersFailure(errorMessage));
  }
};

export const updateUser = (userId,name,email,status,gender) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  dispatch({ type: "UPDATE_USER_FAILURE_TOAST", isCreatedFailure: false });
  dispatch({ type: "UPDATE_USER_SUCCESSFULLY_TOAST", isCreatedSuccess: false });
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.put(
      `http://localhost:8000/api/user/${userId}`,
      { name,email,gender,status },
      { headers }
    );
      dispatch(updateUserSuccessfully(response.data.message)); 
      dispatch({ type: "UPDATE_USER_FAILURE_TOAST", isCreatedFailure: false });
      dispatch({ type: "UPDATE_USER_SUCCESSFULLY_TOAST", isCreatedSuccess: true });  
  } catch (error) {
    dispatch({ type: "UPDATE_USER_FAILURE_TOAST", isCreatedFailure: true });
    dispatch({ type: "UPDATE_USER_SUCCESSFULLY_TOAST", isCreatedSuccess: false });  
    const errorMessage = error.response.data.message;
    dispatch(updateUserFailure(errorMessage));
  }
};

export function getUsersSuccess(data) {
  return {
    type: GET_USERS_SUCCESSFULLY,
    payload: data,
  };
}
export function getUsersFailure(data) {
  return {
    type: GET_USERS_FAILED,
    payload: data,
  };
}

export function updateUserSuccessfully(message) {
  return {
    type: UPDATE_USER_SUCCESSFULLY,
    message: message,
  };
}

export function updateUserFailure(data) {
  return {
    type: UPDATE_USER_FAILURE,
    payload: data,
  };
}

