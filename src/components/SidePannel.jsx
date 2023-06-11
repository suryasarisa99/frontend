import { useEffect, useContext, forwardRef, useImperativeHandle } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
const SidePannel = forwardRef((props, ref) => {
  let navigate = useNavigate();
  let {
    openUpdateName,
    setSidePannel,
    isOpened,
    setIsOpened,
    openLockBox,
    openUpdatePassword,
    privateAccount,
    openUpdatePhoto,
    imgUrl,
    sidePannel,
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
    setIsOpened(false);
    if (typeof cb === "function") cb(e);
    else if (typeof cb === "string") navigate(cb);
  }

  function onSidePannelClick(e) {
    if (e.target.tagName !== "BUTTON") {
      e.stopPropagation();
    }
  }

  return (
    <>
      <motion.div
        ref={ref}
        // initial={{ x: sidePannel ? -300 : 0 }} // Initial position outside the viewport
        // animate={{ x: sidePannel ? 0 : -300 }} // Move to the visible position
        // exit={{ x: -300 }}
        transition={{ duration: 0.3, ease: "easeOut" }} // Transition properties
        className="side-pannel"
      >
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
      </motion.div>
    </>
  );
});

export default SidePannel;
