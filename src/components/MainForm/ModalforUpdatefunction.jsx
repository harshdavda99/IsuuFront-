import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ActionTypes } from "../../redux/Actiotypes";
import Editotrs from "../../components/Forms/Editors";
import {API} from '../../api'
function ModalForUpdatefunction(props) {
  var issue = sessionStorage.getItem("username");
  console.log(issue);
  const history = useNavigate(); // same as link to route the page
  const inputstates = props.showForm;
  const setState = props.setShowForm;

  const [errors, setErrors] = useState();
  let dispatch = useDispatch(); //for dispatching action
  const { id, name, issuetype, title, discrip } = inputstates; //destructuring inputstate...
  const [addData, setAdd] = useState(inputstates.discrip);
  console.log(addData);

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
      axios
        .put(`${API}posts/bugs/${inputstates.id}`, inputstates)
        .then((response) => {
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
 

  const handlesubmit = (e) => {
    e.preventDefault();
    props.setShoweditor(false);
    if (!title || !name || !issuetype || !id || !discrip) {
      setErrors("Please add data");
    } else {
      dispatch(AddUser(inputstates));
      setErrors("");
      history("/mainform");
    }
  };
  var fd = new FormData();
  fd.append("images",inputstates.images)
  fd.append("names",inputstates.name)
  fd.append("title",inputstates.title)
  fd.append("issuetype",inputstates.issuetype)
  fd.append("id",inputstates.id)
  fd.append("discrip",inputstates.discrip)


  const list = props.showForm;
  console.log("This is modal data", list);
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content " style={{ width: "50rem" }}>
            <div className="modal-body">
              <div
                className="card container-fluid  "
                style={{ width: "35rem" }}
              >
                <div className="App">
                  <form onSubmit={handlesubmit} className="container">
                    <p> Edit your Data:</p>
                    <div className="border border-3 p-4 mt-4">
                      <div className="mb-3  ">
                        <label className="form-lAddbugsabel">
                          Status Type:
                        </label>
                        <select
                          name="issuetype"
                          value={inputstates.issuetype}
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
                          update ?
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalForUpdatefunction;
