// import React from 'react';

import * as actions from '../../actions/UserActions'
import * as types from '../../constants/ActionTypes'

describe('actions', () => {
    const payload = {
        id: 5,
        categories: ['categories'],
        year_view: 1999,
        years: [1999]
      }
  it('should create an action to login', () => {
    const expectedAction = {
      type: types.LOGIN,
      payload
    }
    expect(
        actions.login(
            payload.id, 
            payload.categories, 
            payload.year_view, 
            payload.years
        )
    ).toEqual(expectedAction)
  })

  it('should create an action to update user', () => {
    const expectedAction = {
      type: types.UPDATEUSER,
      payload
    }
    expect(
        actions.updateUser(payload)).toEqual(expectedAction)
  })

  it('should create an action to logout', () => {
    const expectedAction = {
      type: types.LOGOUT,
    }
    expect(
        actions.logout()).toEqual(expectedAction)
  })
})

