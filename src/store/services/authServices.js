import axios from "axios";

export const loginService = (user) => {
  const response = axios.post("https://unptitfive-server.herokuapp.com/user/login", {
    ...user
  }, {
    withCredentials: true
  });
  console.log(response);
  return response;
}

export const registerService = (user) => {
  const response = axios.post('https://unptitfive-server.herokuapp.com/user/register', {
    ...user
  });
  return response;
}