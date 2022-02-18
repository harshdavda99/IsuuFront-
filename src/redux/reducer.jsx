import { ActionTypes } from "../redux/Actiotypes";

const initialState = {
  users: [],
  user: [],
  loading: true,
};

const userReducers = (state = { initialState }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DATA:          //payload not required as just addind data
      return {
        ...state,
        loading: false,
      };
    case ActionTypes.GET_USERS:         //payload is required as we want to used data from store so key is required...
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case ActionTypes.SIGN_UP:           //payload is required as we want to used data from store so key is required...
      return {
        ...state,
        user:action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducers;
