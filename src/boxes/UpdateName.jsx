import ReactDOM from "react-dom";
import { useEffect, useContext, useState } from "react";
import { GiCrossedSwords } from "react-icons/gi";
import RegisterContext from "../../context/registerId";
import axios from "axios";
export default function UpdateName() {
  let { updateName, setUpdateName, name, setName, server, data } =
    useContext(RegisterContext);
  let [fname, setFname] = useState(name?.fname || "");
  let [sname, setSname] = useState(name?.sname || "");
  let [lname, setLname] = useState(name?.lname || "");

  useEffect(() => {
    document.querySelector(".update-box input").focus();
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        onClose();
      }
    });
    window.addEventListener("popstate", onClose);
    return () => {
      window.removeEventListener("popstate", onClose);
    };
  }, []);

  let onClose = () => {
    setUpdateName(false);
    window.history.pushState(
      null,
      "",
      window.location.pathname.split("/").slice(0, -1).join("/") || "/"
    );
    document.getElementById("overlay").style.display = "none";
  };

  function handleUpdateName(e) {
    e.preventDefault();
    document.getElementById("overlay").style.display = "none";
    console.log("--checking");
    let fullName = {
      fname: e.target.fname.value,
      sname: e.target.sname.value,
      lname: e.target.lname.value,
    };
    setName(fullName);
    setUpdateName(false);
    axios
      .post(`${server}/update/${data._id}`, fullName)
      .then((res) => console.log(res));
  }

  return ReactDOM.createPortal(
    <>
      <form action="" className="update-box" onSubmit={handleUpdateName}>
        <GiCrossedSwords className="close-btn" onClick={onClose} />
        <input
          type="text"
          placeholder="First Name"
          name="fname"
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
