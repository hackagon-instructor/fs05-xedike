import axios from 'axios';

export const createUser = (data, callback) => {
  return (dispatch) => {
    axios.post('http://localhost:8888/api/users', data)
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        dispatch({
          type: "GET_ERRORS",
          payload: err.response.data
        })
      })
  }
}