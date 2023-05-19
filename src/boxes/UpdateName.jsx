import ReactDOM from "react-dom";
import { useEffect, useContext, useState } from "react";
import { GiCrossedSwords } from "react-icons/gi";
import RegisterContext from "../../context/registerId";

export default function UpdateName() {
  let { updateName, setUpdateName, handleUpdateName, name } =
    useContext(RegisterContext);
  let [fname, setFname] = useState(name?.fname || "");
  let [sname, setSname] = useState(name?.sname || "");
  let [lname, setLname] = useState(name?.lname || "");

  useEffect(() => {
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
