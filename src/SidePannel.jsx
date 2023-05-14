import ReactDOM from "react-dom";
import { useEffect, useContext } from "react";
import RegisterContext from "../context/registerId";

export default function SidePannel({}) {
  let {
    onUpdateHandle,
    updateName,
    setSidePannel,
    lockBox,
    openLockBox,
    onOverlayClick,
  } = useContext(RegisterContext);

  useEffect(() => {
    let overlay = document.getElementById("overlay");
    let sidepannel = document.querySelector(".side-pannel");
    overlay.addEventListener("click", onOverlayClick);
    sidepannel.addEventListener("click", onSidePannelClick);

    return () => {
      overlay.removeEventListener("click", onOverlayClick);
      sidepannel.removeEventListener("click", onSidePannelClick);
    };
  }, []);

  function closeSidePannel(e, cb) {
    setSidePannel(false);
    cb(cb(e));
  }

  function onSidePannelClick(e) {
    if (e.target.tagName !== "BUTTON") {
      e.stopPropagation();
    }
  }

  return ReactDOM.createPortal(
    <>
      <div className="side-pannel">
        <button onClick={(e) => closeSidePannel(e, onUpdateHandle)}>
          Updte Name
        </button>
        <button onClick={(e) => closeSidePannel(e, openLockBox)}>
          Testing
        </button>
      </div>
    </>,
    document.getElementById("overlay")
  );
}
