import React from "react";

function ShowAlll(props) {
  return (
    <div className="container" >
      <button
        onClick={() => props.showData("hiiiiiii")}
        className="  container btn btn-danger  mt-3 p-1"
      >
        Show Data  ?
      </button>
    </div>
  );
}

export default ShowAlll;
