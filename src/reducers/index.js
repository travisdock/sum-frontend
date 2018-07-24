export default function reducer(
  state = {
    current_user: ''
  },
  action
) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state, current_user: action.payload
      }
    case "LOGOUT":
      return {
        ...state, current_user: ''
      }
    default:
      return state;
  }
}
