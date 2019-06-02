import * as actions from '../../actions/UserActions'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
    const response = {
      id: 5,
      categories: ['categories'],
      year_view: 1999,
      years: [1999]
    }
    const payload = {
      user_id: 5,
      categories: ['categories'],
      year_view: 1999,
      years: [1999]
    }
  it('should create an action to login', () => {
    const expectedAction = {
      type: types.LOGIN,
      payload: payload
    }
    expect(actions.login(response)).toEqual(expectedAction)
  })

  it('should create an action to update user', () => {
    const expectedAction = {
      type: types.UPDATEUSER,
      payload: payload
    }
    expect(
        actions.updateUser(response)).toEqual(expectedAction)
  })

  it('should create an action to logout', () => {
    const expectedAction = {
      type: types.LOGOUT,
    }
    expect(
        actions.logout()).toEqual(expectedAction)
  })
})

