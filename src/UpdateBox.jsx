import ReactDOM from "react-dom";
import { useEffect, useContext } from "react";
import { GiCrossedSwords } from "react-icons/gi";
import RegisterContext from "../context/registerId";
export default function UpdateBox({}) {
  let { updateName, setUpdateBox } = useContext(RegisterContext);
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandle);
    // window.addEventListener("click", onScrollHandle);

    return () => {
      window.removeEventListener("scroll", onScrollHandle);
      //   window.removeEventListener("click", onScrollHandle);
    };
  }, []);
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
        <input type="text" placeholder="First Name" name="fname" />
        <input type="text" placeholder="Second Name" name="sname" />
        <input type="text" placeholder="Last Name" name="lname" />
        <button>Update</button>
      </form>
    </>,
    document.getElementById("overlay")
  );
}
