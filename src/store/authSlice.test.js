// src/redux/authSlice.test.js
import authReducer, { login, logout } from './authSlice';

describe('authSlice', () => {
  const initialState = {
    isLoggedIn: false,
    token: null,
    userId: null,
  };

  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle login', () => {
    const action = {
      type: login.type,
      payload: {
        token: 'some-token',
        userId: 'some-user-id',
      },
    };
    const expectedState = {
      isLoggedIn: true,
      token: 'some-token',
      userId: 'some-user-id',
    };
    expect(authReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle logout', () => {
    const loggedInState = {
      isLoggedIn: true,
      token: 'some-token',
      userId: 'some-user-id',
    };
    const action = { type: logout.type };
    expect(authReducer(loggedInState, action)).toEqual(initialState);
  });
});
