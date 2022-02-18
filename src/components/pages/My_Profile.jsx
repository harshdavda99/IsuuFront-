import React from "react";
import Profiledata from "./Profiledata";
function My_Profile() {
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn btn-outline-light m-2"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Profile
      </button>
      {/* <!-- Button trigger modal --> */}
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header ">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Profiledata />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default My_Profile;
