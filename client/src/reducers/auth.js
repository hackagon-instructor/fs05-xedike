const initialState = {
  user: {},
  isAuthenticated: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        user: action.payload,
        isAuthenticated: true
      }

    default:
      break;
  }

  return state;
}

export default authReducer;