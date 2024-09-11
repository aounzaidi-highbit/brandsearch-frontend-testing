import axios from "axios";
axios.defaults.baseURL = "https://myapi.brandsearchengine.com/api/";

class Account {
  constructor() {
    this.result = [];
    this.user = null;
  }
  LoginApi = (credentials) => {
    const res = async () => {
      const resp = await axios
        .post(`auth/login/`, credentials)
        .catch(function (error) {
          console.log(error);
        });
      return resp;
    };
    return res();
  };
}
export default new Account();
