export default function reducer(
  state = {
    default: ''
  },
  action
) {
  switch (action.type) {
    case "DO_SOMETHING":
      return {
        state
      }
    default:
      return state;
  }
}
