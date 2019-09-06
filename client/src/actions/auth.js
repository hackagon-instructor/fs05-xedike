import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setHeaders from '../helpers/setHeaders';

export const createUser = (data, callback) => {
  return (dispatch) => {
    axios.post('http://localhost:8888/api/users', data)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: "GET_ERRORS",
          payload: {}
        })
      })
      .catch(err => {
        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data
        })
      })
  }
}

export const login = (data) => {
  return (dispatch) => {
    axios.post('http://localhost:8888/api/users/login', data)
      .then(res => {
        const { token } = res.data;
        // dua jwt len localstorage
        localStorage.setItem('token', token);

        // decode --> dispatch auth reducer
        const decoded = jwtDecode(token);
        dispatch({
          type: "SET_CURRENT_USER",
          payload: decoded
        })

        // set params token header cua nhung request
        setHeaders({ token })
      })
      .catch(console.log)
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch({ type: "LOGOUT" })
    setHeaders({})
  }
}