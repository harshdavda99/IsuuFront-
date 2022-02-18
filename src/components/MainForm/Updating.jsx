import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { ActionTypes } from "../../redux/Actiotypes";
import Editotrs from "../Forms/Editors";
import {API} from '../../api'
// import MyProfile from "../pages/My_Profile";
const   Updating = (props) => {
  const history = useNavigate(); // same as link to route the page
  const inputstates = props.showForm;
  const setState=props.setShowForm;
  
  const [errors, setErrors] = useState();
  let dispatch = useDispatch(); //for dispatching action
  const { id ,name,  issuetype,  title,  discrip } = inputstates; //destructuring inputstate...
  const [addData, setAdd] = useState(inputstates.discrip);
  // console.log(addData)

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

  const AddUser = (inputstates) => {
    return function (dispatch) {
      axios.put(`${API}posts/bugs/${inputstates.id}`, fd ).then((response) => {
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
   fd.append("images",inputstates.images)
   fd.append("names",inputstates.name)
   fd.append("title",inputstates.title)
   fd.append("issuetype",inputstates.issuetype)
   fd.append("id",inputstates.id)
   fd.append("discrip",inputstates.discrip)

   
  const handlesubmit = (e) => {
    e.preventDefault();
    props.setShoweditor(false);
    if (!title ||!name || !issuetype || !id || !discrip) {
      setErrors("Please add data");
    } else {
      dispatch(AddUser(inputstates));
      setErrors("");
      history("/mainform");
    }
  };

  return (
    <>  
    <div className="App">
      <form onSubmit={handlesubmit} className="container">
          <p> Edit your Data:</p>
        <div className="border border-3 p-4 mt-4">
          <div className="mb-3  ">
            <label className="form-lAddbugsabel"> Status Type:</label>
            <select
              name="issuetype"
              value = { inputstates.issuetype}
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
          {/* <label className="form-label px-2 ">User Name :</label> */}
        
       {/* <input type="checkbox" name="name" value={issue} onChange={handleinputchange} className="form-control form-check-input"/> */}
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
          </div>Issuelist

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
               update ?
            </button>
          </div>
        </div>
      </form>
    </div>
    </>

  );
};
export default Updating;