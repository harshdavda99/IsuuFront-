import {Link, useNavigate } from "react-router-dom";
import React, { useState,useEffect } from "react";
import MyProfile from "../pages/My_Profile";
import Issuelist from "./Issuelist";
import axios from 'axios';
import Filteusername from "./filteusername";
import FilterByBug from "./Filterbybug";
// import ShowAlll from "./ShowAlll";
import {API} from '../../api'

import AllIssueList from "./AllIssueList";
function MainForm() {
  const [lists, setRepeat] = useState([]);
  const [AllData,setAllData]=useState(true);
  const history = useNavigate();
  const [items, setItems] = useState(lists);
  var issue = sessionStorage.getItem("user type");   //issuetype from session storage

  // const showData =(type)=>{
  //   const updatedItem = lists.filter((curele) => {
  //     return curele.issuetype !== type;
  //   });
  //   setItems(updatedItem);   
  // }
  const allitems = (type) => {                    //show all data using filter....
    const updatedItem = lists.filter((curele) => {
      return curele.issuetype !== type;
    });
    setItems(updatedItem);                      //calling setitems  in order to display data...
    setAllData(false);
  };
  const filteruser=(type)=>{
    const updatedItem = lists.filter((curele) => {
      return curele.name === type;
    });
    setItems(updatedItem);
    setAllData(false);  
  }
  
  const filterItem = (type) => {                //filtering each data according to parameter passed
    const updatedItem = lists.filter((curele) => {
      return curele.issuetype === type;
    });
    setItems(updatedItem);                  //calling setitems  in order to display data... 
    setAllData(false);
  };

useEffect(()=>{
  axios
  .get(`${API}posts/bugs`)
  .then((res) => {
    setRepeat(res.data);
  })
  .catch((err) => {
    console.log("This is error for :", err);
  });

},[]);
  
  const onClicks = async () => {
    if(window.confirm("are you sure you want to logout")){
      sessionStorage.clear();
      history("/")  
    }
  };
  return (
    <div className="App container-fluid">
      {/* Navbar start */}
      <nav className=" container-fluid navbar navbar-dark bg-dark p-1">
        <div className="container-fluid ">
          <p className="navbar-brand">Issue to Debug</p>
          <form className="d-flex">
            <FilterByBug filterItem={filterItem} allitems={allitems} />
            <Filteusername filteruser={filteruser} />
              <button
                onClick={() => {
                  
                  onClicks();     //clearing profile data when log out is clicked
                }}
                className="btn btn-outline-light m-2"
                type="button"
                >
                Log Out
              </button>
            {<MyProfile></MyProfile>}
          </form>
        </div>
      </nav>

      <div className="container-fluid ">
        <div className="container-fluid">
          <div className="container d-flex">
          {/* <ShowAlll  showData={showData} /> */}
            {(issue==="Admin")? "":
              <div className="container-fluid text-end mt-3  ">
               <Link to={"/adduser"}> <button type="button" className="btn btn-success">
                Add New Bugs 
                </button></Link>
              </div>
           }
          </div>
        </div>
      </div>
    {!AllData?<Issuelist itemlist={items} setItems={setItems} setRepeat={setRepeat} lists={lists}/>
    :<AllIssueList itemlist={items} setItems={setItems} setRepeat={setRepeat} lists={lists}/>}
    </div>
  );
}
export default MainForm;