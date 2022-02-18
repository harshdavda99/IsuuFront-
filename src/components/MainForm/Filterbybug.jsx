import React from "react";

function FilterByBug(props) {

  return (
    <div className="display">
    {/* drop down two */}
    <div className="btn-group dropdown container-lg m-1">
      <button
        className="btn  dropdown-toggle  btn-outline-light "
        type="button"
        id="dropdownMenuButton2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        >
        Filter by type
      </button>

      <ul
        className="dropdown-menu dropdown-menu-in"
        aria-labelledby="dropdownMenuButton2"
        >
        <li className="container border  dropdown-item pp-0">
          <p
            onClick={() => props.allitems("hiiiiiii")}
            className="  container btn btn-danger  mt-3 p-1"
            >
            All Ticket
          </p>
        </li>
        <li className="container border  dropdown-item pp-0">
          <p
          onClick={() => props.filterItem("Bug")}
          className="  container btn btn-danger  mt-3 p-1"
          >
          Bug
          </p>
        </li>
        <li className="container border  dropdown-item ">
          <p
            onClick={() =>props.filterItem("Discuss")}
            className=" container btn btn-info  mt-3 p-1"
            >
            Discuss
          </p>
        </li>
        <li className="container border  dropdown-item">
          <p
            onClick={() => props.filterItem("Unconfirmed")}
            className=" container btn btn-warning  mt-3 p-1"
            >
            Unconfirmed
          </p>
        </li>
        <li className="container border dropdown-item ">
          <p
            onClick={() => props.filterItem("Solved")}
            className=" container btn btn-success  mt-3 p-1"
            >
            Solved
          </p>
        </li>
        <li className="container border  dropdown-item ">
          <p
            onClick={() => props.filterItem("In_Progress")}
            className=" container btn btn-primary  mt-3 p-1"
            >
            In Progress
          </p>
        </li>
      </ul>
    </div>
  </div>
  )
}
export default FilterByBug;
