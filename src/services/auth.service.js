import axios from "axios";
import Cookies from 'universal-cookie';
// import cookieClient from 'react-cookie'
const API_URL = "http://127.0.0.1:8000/api";
const cookies = new Cookies();
// let cookie = cookieClient.load('jwt')
const signup = (email, password) => {
  return axios
    .post(API_URL + "/signup", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = async (email, password) => {
  // return axios
  //   .post(API_URL + "/login", {
  //     email,
  //     password,
  //   },
  //   {withCredentials: true}
  //   )
  //   .then((response) => {
  //     console.log(response.data.accessToken)
  //     if (response.data.accessToken) {
  //       localStorage.setItem("user", JSON.stringify(response.data));
  //       // cookieClient.save('jwt', response.data.accessToken, {path:'/'})
  //       // cookies.set('jwt', response.data.accessToken, { path: '/', httpOnly: true });
  //     }

  //     return response.data;
  //   });

    return await fetch(API_URL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.accessToken);
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        return data;
      });
    
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = async() => {
  const response = await fetch('http://127.0.0.1:8000/api/user',{
      headers:{'Content-Type': 'application/json', 'X-Requested-With':'XMLHttpRequest'},
      credentials:'include',
        })
  const content = await response.json();
  return content;
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;