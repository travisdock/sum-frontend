import reducer from '../../reducers/UserReducers'
import * as types from '../../constants/ActionTypes'

describe('todos reducer', () => {
  const payload = {
    id: 5,
    categories: ['categories'],
    year_view: 1999,
    years: [1999]
  }
  const defaultState = {
    current_user: ''
  }

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState)
  })

  it('should handle LOGIN', () => {
    expect(
      reducer(undefined, {
        type: types.LOGIN,
        payload: payload
      })
    ).toEqual(
      {
        ...defaultState,
        current_user: payload,
        load: false
      }
    )

    expect(
      reducer(
        { current_user: 5 },
        {
          type: types.LOGIN,
          payload: payload
        }
      )
    ).toEqual(
      {
        current_user: payload,
        load: false
      }
    )
  })

  it('should handle LOGOUT', () => {
    expect(
      reducer(undefined, {
        type: types.LOGOUT
      })
    ).toEqual(
      {
        ...defaultState,
        current_user: '',
        load: true
      }
    )

    expect(
      reducer(
        { current_user: 5 },
        {
          type: types.LOGOUT
        }
      )
    ).toEqual(
      {
        current_user: '',
        load: true
      }
    )
  })

  it('should handle UPDATEUSER', () => {
    expect(
      reducer(undefined, {
        type: types.UPDATEUSER,
        payload: payload
      })
    ).toEqual(
      {
        ...defaultState,
        current_user: payload,
      }
    )

    expect(
      reducer(
        { current_user: 5 },
        {
          type: types.UPDATEUSER,
          payload: payload
        }
      )
    ).toEqual(
      {
        current_user: payload,
      }
    )
  })
})
