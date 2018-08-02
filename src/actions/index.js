

export function login(user_id, categories) {
  return {
    type: 'LOGIN',
    payload: {
      user_id: user_id,
      categories: categories
    }
  }
}

export function logout() {
  return {
    type: 'LOGOUT',
  }
}
