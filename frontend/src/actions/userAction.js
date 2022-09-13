import axios from "axios";
import { 
    LOGIN_FAIL,
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    CLEAR_ERRORS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
} from "../constants/userConstant"


// LOGIN
export const login = (email , password) => async(dispatch) => {
    try{
        dispatch({
            type: LOGIN_REQUEST
        });

        let link = `/api/v1/login`;
        const config = { headers: { "Content-Type" : "application/json"}};

        const {data} = await axios.post(link , {email , password} , config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user, 
        });

    } catch(error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message,
        })
    }
}


// REGISTER
export const register = (userData) => async(dispatch) => {
    try{
        dispatch({
            type: REGISTER_USER_REQUEST
        });

        let link = `/api/v1/register`;
        const config = { headers: { "Content-Type" : "application/json"}};

        const {data} = await axios.post(link , userData , config);

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user, 
        });

    } catch(error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Load User
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axios.get(`/api/v1/me`);
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };


// Get All USER
export const getAllUsers = () => async(dispatch) => {
    try{
        dispatch({
            type: ALL_USER_REQUEST
        });

        const {data} = await axios.get("/api/v1/admin/get/users");
        
        dispatch({
            type: ALL_USER_SUCCESS,
            payload: data.users,
        });

    } catch(error) {
        dispatch({
            type: ALL_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}


// Get User Details
export const getUserDetails = (userId) => async(dispatch) => {
    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        });

        const {data} = await axios.get(`/api/v1/admin/get/user/${userId}`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,
        });

    } catch(error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Logout User
export const logout = () => async(dispatch) => {
    try{
        dispatch({
            type: LOGOUT_SUCCESS,
        });

        const {data} = await axios.get(`/api/v1/logout`);

        dispatch({
            type: LOGOUT_SUCCESS,
            payload: data.user,
        });

    } catch(error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message,
        })
    }
}



// UPDATE Any USER
export const updateUser = (id) => async(dispatch) => {
    try{
        dispatch({
            type: UPDATE_USER_REQUEST
        });

        let link = `/api/v1/admin/update/attendance/${id}`;
        // const config = { headers: { "Content-Type" : "application/json"}};

        const {data} = await axios.put(link);

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success, 
        });

    } catch(error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// Clearing Errors
export const clearErrors = () => async(dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}