import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ActionTypes } from "../../redux/Actiotypes";
import MyProfile from "../pages/My_Profile";
import Editotrs from "../../components/Forms/Editors";
import {API} from '../../api'

const Addbugs = () => {
  var issue = sessionStorage.getItem("username");
  const history = useNavigate(); // same as link to route the page
  const [addData, setAdd] = useState("");
  const [inputstates, setState] = useState({
    issuetype: "",
    title: "",
    discrip: "",
    name: "",
    images: "",
    id: new Date().getTime(), //for unique id
  });

  const [errors, setErrors] = useState();
  let dispatch = useDispatch(); //for dispatching action
  const { id, name, issuetype, title, discrip,images } = inputstates; //destructuring inputstate...

  const handleinputchange = (e) => {
    let { name, value } = e.target;
    setState({
      ...inputstates,
      [name]: value,
    }); //input name="name"  name="title"  and thats value={}
  };

  const AddUsers = () => ({
    type: ActionTypes.ADD_DATA,
  });

  const AddUser = (fd) => {
    return function (dispatch) {
      axios.post(`${API}posts/bugs`, fd).then((response) => {
        dispatch(AddUsers());
        setState("");
      });
    };
  };
  const imageChange = async(e) => {
    const data = e.target.files[0];
    const images = await convertBase64(data);
    setState({...inputstates,images:images});
  };
  const convertBase64 = (data) => {
    return new Promise((resolve, reject) => {
      const filereader = new FileReader();
      filereader.readAsDataURL(data);
      filereader.onload = () => {
        resolve(filereader.result);
      };
      filereader.onerror = (error) => {
        reject(error);
      };
    });
  };
 
  var fd = new FormData();

  fd.append("images", inputstates.images);
  fd.append("names", inputstates.name);
  fd.append("title", inputstates.title);
  fd.append("issuetype", inputstates.issuetype);
  fd.append("id", inputstates.id);
  fd.append("discrip", inputstates.discrip);

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!title || !name || !issuetype || !id || !discrip || !images) {
      setErrors("Please add data");
    } else {
      dispatch(AddUser(fd));
      setErrors("");
      history("/mainform");
    }
  };

  const onClicks = async () => {
    // const result = await confirm("Are you sure?", options);
    if (window.confirm("are you sure you want to logout")) {
      sessionStorage.clear();
      history("/");
    }
  };
  return (
    <div className="App">
      {/* Nav Bar */}
      <nav className=" container-fluid navbar navbar-dark bg-dark m-2">
        <div className="container-fluid ">
          <p className="navbar-brand">Issue to Debug</p>
          <form className="d-flex ">
            {/* <Link to={"/"}> */}
            <button
              onClick={() => {
                sessionStorage.clear();
                onClicks();
                // confirm("Are you sure for logging out")
                // sessionStorage.getItem("username")
              }}
              className="btn btn-outline-light m-2"
              type="button"
            >
              Log Out
            </button>
            {/* </Link> */}
            <Link to={"/mainform"}>
              <button className="btn btn-outline-light m-2" type="button">
                Go to list
              </button>
            </Link>
            {<MyProfile />}
          </form>
        </div>
      </nav>
      {/* input tickets */}
      <form onSubmit={handlesubmit} className="container">
        <div className="border border-3 p-4 mt-4">
          <div className="mb-3  ">
            <label className="form-label"> Status Type:</label>
            <select
              name="issuetype"
              onChange={handleinputchange}
              className="form-select"
              aria-label="Default select example"
            >
              <option>select</option>
              <option value="Bug">Bug</option>
              <option value="Discuss">Discuss</option>
              <option value="Unconfirmed">Unconfirmed</option>
              <option value="Solved">Solved</option>
              <option value="In_Progress">In Progress</option>
            </select>
          </div>
          <div className="mb-3 d-flex border border-3  px-2 pt-2">
            <label className="form-label px-2 ">User Name :</label>

            <input
              type="checkbox"
              name="name"
              value={issue}
              onChange={handleinputchange}
              className="form-control form-check-input"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Task Type:</label>
            <textarea
              id="getelement"
              name="title"
              onChange={handleinputchange}
              value={title || ""}
              type="textarea"
              className="form-control"
              placeholder="Description"
            />
          </div>
          <div className="container text-center">
            {errors && <h1 className="text-danger">{errors}</h1>}
          </div>

          <div className="border  border-3 mb-2 ">
            <label className="form-label m-3 ">Link:</label>
            <input
              type="file"
              onChange={(e) => imageChange(e)}
              placeholder="select image"
            />

            
          </div>
          {
            <Editotrs
              setState={setState} //passing function setstate as a props
              addData={addData} //passing state value as a props
              inputstates={inputstates} //passing state value as a props
              setAdd={setAdd} //passing function setstate as a props
            />
          }
          <div className="container-fluid text-center mt-4">
            <button type="submit" className="btn btn-success">
              Add to list
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Addbugs;
