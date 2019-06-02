import * as actions from '../../actions/UserActions'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
    const action_payload = {
      user_id: 5,
      categories: ['categories'],
      year_view: 1999,
      years: [1999]
    }
    const update_payload = {
      id: 5,
      categories: ['categories'],
      year_view: 1999,
      years: [1999]
    }
  it('should create an action to login', () => {
    const expectedAction = {
      type: types.LOGIN,
      payload: action_payload
    }
    expect(
        actions.login(
            action_payload.user_id, 
            action_payload.categories, 
            action_payload.year_view, 
            action_payload.years
        )
    ).toEqual(expectedAction)
  })

  it('should create an action to update user', () => {
    const expectedAction = {
      type: types.UPDATEUSER,
      payload: action_payload
    }
    expect(
        actions.updateUser(update_payload)).toEqual(expectedAction)
  })

  it('should create an action to logout', () => {
    const expectedAction = {
      type: types.LOGOUT,
    }
    expect(
        actions.logout()).toEqual(expectedAction)
  })
})

