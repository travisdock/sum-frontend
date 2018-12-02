export default function reducer(
  state = {
    current_user: ''
  },
  action
) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state, current_user: action.payload, load: false
      }
    case "LOGOUT":
      return {
        ...state, current_user: '', load: true
      }
    case "UPDATEUSER":
      console.log("reducer", action.payload)
      return {
        ...state, current_user: action.payload
      }
    default:
      return state;
  }
}
