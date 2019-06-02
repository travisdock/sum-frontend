
import { LOGIN, LOGOUT, UPDATEUSER } from '../constants/ActionTypes';

export function login(id, categories, year_view, years) {
  return {
    type: LOGIN,
    payload: {
      id: id,
      categories: categories,
      year_view: year_view,
      years: years
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
      id: user.id,
      categories: user.categories,
      year_view: user.year_view,
      years: user.years
    }
  }
}
