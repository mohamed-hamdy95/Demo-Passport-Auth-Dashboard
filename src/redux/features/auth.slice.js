import { createAction, createReducer } from '@reduxjs/toolkit';

export const startAuth = createAction('auth/startAuth');
export const authUserSuccess = createAction('auth/authUserSuccess');
export const authFail = createAction('auth/authFail');
export const logoutUser = createAction('auth/logoutUser');
export const checkAuth = createAction('auth/checkAuth');

const initialState = {
  currentUser: null,
  isAuth: !!JSON.parse(localStorage.getItem('isAuth')),
  loading: false,
  errors: {},
};

export default createReducer(initialState, {
  [startAuth]: state => {
    return {
      ...state,
      loading: true,
      errors: {},
    };
  },
  [authUserSuccess]: (state, action) => {
    return {
      ...state,
      loading: false,
      isAuth: true,
      currentUser: action.payload,
    };
  },
  [logoutUser]: state => {
    return {
      ...state,
      currentUser: null,
      loading: false,
      isAuth: false,
    };
  },
  [authFail]: (state, action) => {
    return {
      ...state,
      loading: false,
      errors: action.payload,
    };
  },
});
