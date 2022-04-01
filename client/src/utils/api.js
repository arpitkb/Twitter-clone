import axios from "axios";
import store from "../redux/store";
import { LOGOUT } from "../redux/actions/types";

// creating an instance of axios
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// auto logount using intercept

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 401) {
//       store.dispatch({
//         type: LOGOUT,
//       });
//     }
//     return Promise.reject(err);
//   }
// );

export default api;
