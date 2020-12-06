import axios from "axios";
import Store from "../store";

const API_URL = "http://localhost:8080/api/user/";

class UserService {
  login(user) {
    //btoa: Basic64 encryption
    const headers = {
      authorization: "Basic " + btoa(user.username + ":" + user.password)
    };

    return axios.get(API_URL + "login", { headers: headers }).then(response => {
      localStorage.setItem("currentUser", JSON.stringify(response.data));
      console.log(response.data);
      Store.dispatch("updateUser", response.data);
      return response.data;
    });
  }

  logOut() {
    return axios.post(API_URL + "logout", {}).then(() => {
      localStorage.removeItem("currentUser");
      Store.dispatch("updateUser", null);
    });
  }

  register(user) {
    return axios.post(API_URL + "registration", JSON.stringify(user), {
      headers: { "Content-Type": "application/json; charset=UTF-8" }
    });
  }
}

export default new UserService();
