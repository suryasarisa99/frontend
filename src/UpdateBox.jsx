import ReactDOM from "react-dom";
import { useEffect } from "react";

export default function UpdateBox({ updateName, setUpdateBox }) {
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandle);
    // window.addEventListener("click", onScrollHandle);

    return () => {
      window.removeEventListener("scroll", onScrollHandle);
      //   window.removeEventListener("click", onScrollHandle);
    };
  }, []);
  let onScrollHandle = () => {
    console.log("scrolled");
    document.getElementById("overlay").style.display = "none";
    setUpdateBox(false);
  };
  return ReactDOM.createPortal(
    <>
      <form action="" className="update-box" onSubmit={updateName}>
        <input type="text" placeholder="First Name" name="fname" />
        <input type="text" placeholder="Second Name" name="sname" />
        <input type="text" placeholder="Last Name" name="lname" />
        <button>Update</button>
      </form>
    </>,
    document.getElementById("overlay")
  );
}
