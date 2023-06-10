import { useEffect, useContext } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate, Link } from "react-router-dom";
export default function SidePannel({}) {
  let navigate = useNavigate();
  let {
    openUpdateName,
    setSidePannel,
    openLockBox,
    openUpdatePassword,
    privateAccount,
    openUpdatePhoto,
    imgUrl,
    name,
  } = useContext(RegisterContext);

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, []);
  function handleClose(e) {
    let sidepannel = document.querySelector(".side-pannel");
    if (!sidepannel.contains(e.target)) closeSidePannel(e);
  }
  function closeSidePannel(e, cb) {
    setSidePannel(false);
    if (typeof cb === "function") cb(e);
    else if (typeof cb === "string") navigate(cb);
  }

  function onSidePannelClick(e) {
    if (e.target.tagName !== "BUTTON") {
      e.stopPropagation();
    }
  }

  // ReactDOM.createPortal
  return (
    <>
      <div className="side-pannel">
        <button onClick={(e) => closeSidePannel(e, openUpdateName)}>
          {name?.fname ? "Update Name" : "Add Name"}
        </button>
        {privateAccount ? (
          <button onClick={(e) => closeSidePannel(e, openUpdatePassword)}>
            Update Password
          </button>
        ) : (
          <button onClick={(e) => closeSidePannel(e, openLockBox)}>
            Add Password
          </button>
        )}
        <button onClick={(e) => closeSidePannel(e, openUpdatePhoto)}>
          {imgUrl ? "Update Photo" : "Add Photo"}
        </button>
        <button onClick={(e) => closeSidePannel(e, "/themes")}>Themes</button>
        <button onClick={(e) => closeSidePannel(e, "/ays")}>Analysis</button>
        <a href="https://student546.vercel.app" target="_blank">
          other site
        </a>
      </div>
    </>
    // document.getElementById("overlay")
  );
}
