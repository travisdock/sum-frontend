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
    default:
      return state;
  }
}
