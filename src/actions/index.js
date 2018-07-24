

export function login(user_id, categories) {
  return {
    type: 'LOGIN',
    payload: {
      user_id: user_id,
      categories: categories
    }
  }
}

// const url = 'http://localhost:3001/api/v1/categories/${user_id}'
// return
//   fetch(url)
//     .then(resp => resp.json())
//     .then(resp => {
//       return {
//         type: 'LOGIN',
//         payload: {
//           user_id: user_id,
//           categories: resp
//         }
//       }
//     })
