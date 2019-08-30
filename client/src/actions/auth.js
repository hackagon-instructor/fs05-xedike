import axios from 'axios';

export const createUser = (data) => {
  return (dispatch) => {
    axios.post('http://localhost:8888/api/users', data)
      .then(res => {
        console.log(res.data)
      })
  }
}