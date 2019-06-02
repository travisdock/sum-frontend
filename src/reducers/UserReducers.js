import { LOGIN, LOGOUT, UPDATEUSER } from '../constants/ActionTypes';

export default function reducer(
  state = {
    current_user: ''
  },
  action
) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state, current_user: action.payload, load: false
      }
    case LOGOUT:
      return {
        ...state, current_user: '', load: true
      }
    case UPDATEUSER:
      return {
        ...state, current_user: action.payload
      }
    default:
      return state;
  }
}
