
import { LOGIN, LOGOUT, UPDATEUSER } from '../constants/ActionTypes';

export function login(resp) {
  return {
    type: LOGIN,
    payload: {
      user_id: resp.id,
      categories: resp.categories,
      year_view: resp.year_view,
      years: resp.years
    }
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function updateUser(user) {
  return {
    type: UPDATEUSER,
    payload: {
      user_id: user.id,
      categories: user.categories,
      year_view: user.year_view,
      years: user.years
    }
  }
}
