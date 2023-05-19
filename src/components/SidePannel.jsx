import ReactDOM from "react-dom";
import { useEffect, useContext } from "react";
import RegisterContext from "../../context/registerId";

export default function SidePannel({}) {
  let {
    // onUpdateHandle,
    openUpdateName,
    updateName,
    setSidePannel,
    lockBox,
    openLockBox,
    onOverlayClick,
    openUpdatePassword,
    data,
    privateAccount,
    openUpdatePhoto,
    imgUrl,
    name,
    openThemePage,
  } = useContext(RegisterContext);

  useEffect(() => {
    // let overlay = document.getElementById("overlay");
    let sidepannel = document.querySelector(".side-pannel");
    // overlay.addEventListener("click", onOverlayClick);
    // sidepannel.addEventListener("click", onSidePannelClick);
    // window.addEventListener("scroll", () => {
    //   if (window.scrollY > 60) {
    //     // console.log("working--");
    //     sidepannel.style.top = "0";
    //   }
    // });
    return () => {
      // overlay.removeEventListener("click", onOverlayClick);
      // sidepannel.removeEventListener("click", onSidePannelClick);
    };
  }, []);

  function closeSidePannel(e, cb) {
    setSidePannel(false);
    cb(cb(e));
  }
  function sample() {
    console.log("test  -1");
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
        <button onClick={(e) => closeSidePannel(e, openThemePage)}>
          Themes
        </button>
      </div>
    </>
    // document.getElementById("overlay")
  );
}
