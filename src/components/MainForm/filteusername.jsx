import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUsers, signUsers } from "../../redux/Action";
function Filteusername(props) {
  const listss = useSelector((state) => state.data.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUsers());
    dispatch(signUsers());
  }, [dispatch]);
  const user = listss?.map((ele, index) => {
    return (
      <li className="container border  dropdown-item " key={index}>
        <p
            onClick={() => props.filteruser(ele.username)}
          className=" container btn btn-primary mt-3 p-1"
        >
          {ele.username}
        </p>
      </li>
    );
  });
  return (
    <div className="mt-1">
      <div className="btn-group dropdown container-lg m-1">
        <button
          className="btn  dropdown-toggle  btn-outline-light "
          type="button"
          id="dropdownMenuButton2"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter User
        </button>

        <ul
          className="dropdown-menu dropdown-menu-in"
          aria-labelledby="dropdownMenuButton2"
        >
          {user}
        </ul>
      </div>
    </div>
  );
}

export default Filteusername;
