import { axios } from "core";

export default {
  signIn: postData => axios.post("/signin", postData),
  signUp: postData => axios.post("/signup", postData),
  getUserData: () => axios.get("/user/get_data")
};
