import { createAction, createReducer } from '@reduxjs/toolkit';

export const startUpload = createAction('auth/startUpload');
export const endUpload = createAction('auth/endUpload');
export const setProgress = createAction('auth/setProgress');

const initialState = {
  progress: 0,
  isUploading: false,
};

export default createReducer(initialState, {
  [startUpload]: state => {
    return {
      ...state,
      isUploading: true,
      progress: 0,
    };
  },
  [endUpload]: state => {
    return {
      ...state,
      isUploading: false,
      progress: 0,
    };
  },
  [setProgress]: (state, action) => {
    return {
      ...state,
      progress: action.payload,
    };
  },
});
