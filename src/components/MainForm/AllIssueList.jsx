import React, { useState, useEffect } from "react";
import axios from "axios";
import Updating from "./Updating";
import ModalForUpdate from "./ModalForUpdate";
import { useNavigate } from "react-router-dom";
import {API} from '../../api'
function AllIssueList(props) {
  const [updatestate,setupdateState]=useState([]);
  const history = useNavigate();
  const sign = props.lists;
  useEffect(() => {
    axios.get(`${API}posts/bugs`)
    .then((res) => {
      console.log("Here is ", res.data);
      const data = res.data;
      setupdateState({
        ...updatestate,data
      });
      console.log( "using state",data)
      // console.log("updateState:",updatestate)
    }).catch((err)=> console.log("Hellow",err))
  }, []);

  const [showeditor, setShoweditor] = useState(false);
  // const Issue = props.itemlist;

  var issue = sessionStorage.getItem("user type");
  var names = sessionStorage.getItem("username");
  const [showForm, setShowForm] = useState({});

  const signup = sign?.find((ele) => ele.name === names);
  const userdata = signup?.name;

  const Editdata = (list) => {
    console.log("Edit:", list);
    setShowForm(list);
    setShoweditor(!showeditor);
    // history("/Updating");
  };

  const showModal = (list) => {
    setShowForm(list);
  };

  const DeletBug = async (Id) => {
    await axios.delete(`${API}posts/bugs/${Id}`);
    history("/adduser");
  };

  return (
    <div className="row row-cols-1 row-cols-md-1 xg-1 container-fluid ">
      {sign?.map((list) => {
        return (
          <div className="col m-3 p-2" key={list.id}>
            <div className="card">
              <div className="card-body example p-5 m-2">
                <h5 className="card-title text-primary text-center fs-2 ">
                  <span className="text-dark"> User Name:</span> {list.name}
                </h5>
                <p className="card-text">
                  <span className="text-dark fs-4"> Problem related to : </span>
                  <span className="text-danger fs-4 px-2">{list.title}</span>
                </p>
                <div className="img-fluid text-center">
                  {list.images ? (
                    <img
                      src={list.images}
                      className="img-fluid"
                      alt={list.title}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="d-flex p-fluid">
                  <p className="text-dark fs-4 px-2 "> Description: </p>
                  <p
                    className="card-text fs-4 mx-3 "
                    dangerouslySetInnerHTML={{ __html: list.discrip }}
                  />
                </div>
                    
                <div className="">
                  <div className="mt-2 bg-success fs-4 text-light text-center px-5 my-2">
                    {list.issuetype}
                  </div>
                  {list.id === showForm.id && showeditor ? (
                    <Updating
                      setShowForm={setShowForm}
                      showForm={showForm}
                      setShoweditor={setShoweditor}
                    />
                  ) : null}
                  <div className=" bg-dark d-flex justify-content-around">
                    <div>
                      {issue === "Admin" ? (
                        <button
                          type="button"
                          onClick={() => Editdata(list)}
                          className="btn btn-primary btn btn-outline-light m-2"
                        >
                          Edit
                        </button>
                      ) : list.name === userdata ? (
                        <button
                          type="button"
                          onClick={() => Editdata(list)}
                          className="btn btn-primary btn btn-outline-light m-2"
                        >
                          Edit
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      {issue === "Admin" ? (
                        <button
                          type="button"
                          onClick={() => DeletBug(list.id)}
                          className="btn btn-danger btn btn-outline-light m-2"
                        >
                          Remove
                        </button>
                      ) : list.name === userdata ? (
                        <button
                          type="button"
                          onClick={() => DeletBug(list.id)}
                          className="btn btn-danger btn btn-outline-light m-2"
                        >
                          Remove
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        showModal(list);
                      }}
                      className="btn btn-success btn btn-outline-light m-2"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Show Data
                    </button>
                    {/* <ModalForUpdatefunction setShowForm={setShowForm} showForm={showForm} setShoweditor={setShoweditor }  /> */}
                    <ModalForUpdate showForm={showForm} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default AllIssueList;
