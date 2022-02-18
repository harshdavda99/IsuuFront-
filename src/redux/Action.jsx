import { ActionTypes } from "../redux/Actiotypes";
import axios from "axios";
import {API} from '../../../Issue-pannel-main/src/api'

const getUsers = (users) => ({
  type: ActionTypes.GET_USERS,
  payload: users,              //stores the data to users......
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`${API}posts/bugs`)   // if we use get then payload is given to the parameter passed in function
      .then((response) => {
        dispatch(getUsers(response.data));
      })
      .catch((error) => console.log(error));
  };
};
const sihnupUsers = (user) => ({
  type: ActionTypes.SIGN_UP,
  payload: user,               //stores the data to users......
});
// export default sihnupUsers;

export const signUsers = () => {
  return function (dispatch) {
    axios
      .get(`${API}posts/dl`)   // if we use get then payload is given to the parameter passed in function
      .then((response) => {
        dispatch(sihnupUsers(response.data));
      })
      .catch((error) => console.log(error));
  };
};