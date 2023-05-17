import ReactDOM from "react-dom";
import { useEffect, useContext, useState } from "react";
import { GiCrossedSwords } from "react-icons/gi";
import RegisterContext from "../../context/registerId";
export default function UpdateBox({}) {
  let { updateName, setUpdateBox, name } = useContext(RegisterContext);
  let [fname, setFname] = useState(name?.fname || "");
  let [sname, setSname] = useState(name?.sname || "");
  let [lname, setLname] = useState(name?.lname || "");

  let onScrollHandle = () => {
    document.getElementById("overlay").style.display = "none";
    setUpdateBox(false);
  };
  return ReactDOM.createPortal(
    <>
      <form action="" className="update-box" onSubmit={updateName}>
        <GiCrossedSwords
          className="close-btn"
          fill="red"
          onClick={onScrollHandle}
        />
        <input
          type="text"
          placeholder="First Name"
          name="fname"
          // value={name.fname}
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Second Name"
          name="sname"
          value={sname}
          onChange={(e) => setSname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lname"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <button>Update</button>
      </form>
    </>,
    document.getElementById("overlay")
  );
}
