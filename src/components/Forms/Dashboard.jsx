import React from "react";
import { Link } from "react-router-dom";
import Login from "../Forms/Login";

function Dashboard() {
  return (
    <div>
      <nav className=" container-fluid navbar navbar-dark bg-dark">
        <div className="container-fluid ">
          <p className="navbar-brand">Issue to Debug</p>
          <form className="d-flex ">
            <Link to={"/signup"}>
              <button className="btn btn-outline-light m-2" type="button">
                Sign Up
              </button>
            </Link>
          </form>
        </div>
      </nav>
      <div className=" container-fluid bg-light text-center d-flex m-2   ">
        <div className=" container-fluid heights border border-5 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqunDRsoT_yUgTnUnD6ZuK2gNA2PDe1SmB60LYmIhJrjx3TrvpMPhbpc0EEQs5sYMrx5g&usqp=CAU"
            className="d- block p-2"
            alt="hiiii"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR1uS2SJU0dTXN2w-CCNhk-Hy4MSYu2VcXes0Gu59wX17wzCAVWyR7ruf0RV1GXpVvze8&usqp=CAU"
            className="d- block p-2"
            alt="hiiii"
          />
        </div>
        <div className=" container-fluid border border-5  pt-4 ">
          {<Login />}    
        </div>
      </div>
      <div className="container-fluid bg-primary text-center mb-2 mt-2 p-5">
        <div className=" example1 container-fluid bg-primary ">
          <h3> Login or SignUp for the new account ..... </h3>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;