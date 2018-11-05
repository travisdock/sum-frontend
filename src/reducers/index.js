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
    case "UPDATECATS":
      return {
        ...state, current_user: { ...state.current_user, categories: action.payload.categories }
      }
    default:
      return state;
  }
}
