

export function login(user_id, categories, year_view, years) {
  return {
    type: 'LOGIN',
    payload: {
      user_id: user_id,
      categories: categories,
      year_view: year_view,
      years: years
    }
  }
}

export function logout() {
  return {
    type: 'LOGOUT',
  }
}

export function updateCategories(categories) {
  return {
    type: 'UPDATECATS',
    payload: {
      categories: categories
    }
  }
}
