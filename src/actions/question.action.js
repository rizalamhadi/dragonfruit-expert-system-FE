import axios from "axios";

export function getQuestion(param){
  return(dispatch)=>{
    return axios.post(process.env.REACT_APP_API_URL + "/question", param, {
      headers: {
        "Content-Type": "application/json"
      },
      data: {}
    }).then((response)=>{
      dispatch(setAnswer(response.data));
    })
  }
}

export function setAnswer(response){
  return{
      type : "SHOW",
      name : "answer",
      data : response
  }
}

export function getGejala(){
  return(dispatch)=>{
    return axios.get(process.env.REACT_APP_API_URL + "/gejala", {
      headers: {
        "Content-Type": "application/json"
      },
      data: {}
    }).then((response)=>{
      dispatch(setDaftarGejala(response.data));
    })
  }
}

export function setDaftarGejala(response){
  return{
      type : "SHOW",
      name : "daftar_gejala",
      data : response
  }
}

export function getPenyakit(){
  return(dispatch)=>{
    return axios.get(process.env.REACT_APP_API_URL + "/penyakit", {
      headers: {
        "Content-Type": "application/json"
      },
      data: {}
    }).then((response)=>{
      dispatch(setDaftarPenyakit(response.data));
    })
  }
}

export function setDaftarPenyakit(response){
  return{
      type : "SHOW",
      name : "daftar_penyakit",
      data : response
  }
}

export function getRules(){
  return(dispatch)=>{
    return axios.get(process.env.REACT_APP_API_URL + "/rules", {
      headers: {
        "Content-Type": "application/json"
      },
      data: {}
    }).then((response)=>{
      dispatch(setDaftarRules(response.data));
    })
  }
}

export function setDaftarRules(response){
  return{
      type : "SHOW",
      name : "daftar_rules",
      data : response
  }
}
export function createRules(param){
  return(dispatch)=>{
    return axios.post(process.env.REACT_APP_API_URL + "/rules", param, {
      headers: {
        "Content-Type": "application/json"
      },
      data: {}
    }).then((response)=>{
      dispatch(setCreateRules(response.data));
    })
  }
}

export function setCreateRules(response){
  return{
      type : "SHOW",
      name : "create_rules_res",
      data : response
  }
}