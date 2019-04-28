import axios from "axios";

export function doLogin(email, password){
  return(dispatch)=>{
    return axios.post(process.env.REACT_APP_API_URL + "/auth/login", {
        "email": email,
        "password": password
    }, {
      headers: {
        "Content-Type": "application/json"
      },
      data: {}
    }).then((response)=>{
      dispatch(Login(response.data));
    })
  }
}

export function Login(response){
  return{
      type : "LOGIN",
      name : "login",
      data : response
  }
}
