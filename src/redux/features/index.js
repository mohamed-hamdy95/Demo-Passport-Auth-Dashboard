import authReducer from './auth.slice';
import uploadReducer from './upload.slice';

const rootReducer = {
  auth: authReducer,
  upload: uploadReducer,
};

export default rootReducer;
