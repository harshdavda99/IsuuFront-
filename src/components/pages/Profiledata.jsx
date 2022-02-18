import React from "react";

function Profiledata() {
  var issuetype = sessionStorage.getItem("user type");   //issuetype from session storage
  var email = sessionStorage.getItem("email");          //useremail from session storage
  var username = sessionStorage.getItem("username");    //username from session storage
  document.title = `${username}`;                       //changing title of the website
  return (
    <div className="card container-fluid  bg-info"  style={{ width: "25rem"  }}>
      {/* <img src="..." className="card-img-top" alt="MyProfile" />     */}
      <div className="card-body container">
        <h5 className="card-title text-light fs-2 px-4">Your Profile.</h5>
        <hr></hr>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
          User Type:<span className="text-primary mx-3 ">{issuetype}</span>
          </li>
          <li className="list-group-item">
            UserName:<span className="text-primary mx-3 ">{username}</span>
          </li>
          <li className="list-group-item">
            Email:<p className="text-primary mt-2">{email}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Profiledata;
