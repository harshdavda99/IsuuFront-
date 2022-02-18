import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {API} from '../../api'
function LoginForm() {
  const [list ,setlist]= useState();
  useEffect(()=>{
    axios.get(`${API}posts/dl`)
    .then((res)=>{
        setlist(res.data);
        // console.log(res.data)
    })
    .catch((err)=>{console.log("This is error for :",err)});
},[]);
  const [state, setState] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { email, password } = state;
  const history = useNavigate(); 
  const setdatas = list?.find((ele)=>(ele.email === state.email && ele.password === state.password));

  const handlechange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter  Password");
    } else if (!email) {
      setError("Please enter Email ");
    }else if (!setdatas){
      setError("Please enter valid Email and Password");
    } else  if(setdatas){
     (setdatas.user_type === "User") ? history("/adduser"): history("/Issuelist") 
     sessionStorage.setItem("username", setdatas.username);
     sessionStorage.setItem("user type", setdatas.user_type);
     sessionStorage.setItem("email", setdatas.email);
     document.title = `${sessionStorage.getItem("username")}`;
     window.location.reload(false);
     setState("");
     setError("")
    }
   
  };

  return (
    <div className="container bg-secondary ">
      <div className=" bg-secondary text-center heights">
        <form onSubmit={handlesubmit}>
          <h6 className="badge fs-3">Log In</h6>
          <div className=" container-fluid bg-light  text-center ">
            {error && <h5 className="text-danger">{error}</h5>}
          </div>
          <br></br>
          <div className=" badge  mb-3 text-start fs-6 ">
            <label className="form-label">Email address:</label>

            <input
              type="email"
              onChange={handlechange}
              value={email || ""}
              name="email"
              className="form-control"
              placeholder="name@example.com"
            />
          </div>
          <br></br>

          <div className=" badge  mb-3 text-start fs-6 ">
            <label className="form-label">Passward:</label>
            <input
              name="password"
              value={password || ""}
              onChange={handlechange}
              type="password"
              autoComplete="password"
              className="form-control"
              placeholder="Enter your Passward"
            />
          </div>
          <div className="container-fluid  ">
            <button type="submit" className="btn btn btn-light p-2 m-3 ">
              Log In.
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
