import { useEffect, useContext, forwardRef, useImperativeHandle } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
const SidePannel = forwardRef((props, ref) => {
  let navigate = useNavigate();
  let {
    openUpdateName,
    setSidePannel,
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
    setSidePannel(false);
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
        initial={{ x: sidePannel ? -300 : 0 }}
        animate={{ x: sidePannel ? 0 : -300 }}
        exit={{ x: -300 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="side-pannel"
      >
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 0 * 0.05 }}
          onClick={(e) => closeSidePannel(e, openUpdateName)}
        >
          {name?.fname ? "Update Name" : "Add Name"}
        </motion.button>
        {privateAccount ? (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 1 * 0.05 }}
            onClick={(e) => closeSidePannel(e, openUpdatePassword)}
          >
            Update Password
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 1 * 0.05 }}
            onClick={(e) => closeSidePannel(e, openLockBox)}
          >
            Add Password
          </motion.button>
        )}
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 2 * 0.05 }}
          onClick={(e) => closeSidePannel(e, openUpdatePhoto)}
        >
          {imgUrl ? "Update Photo" : "Add Photo"}
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 3 * 0.05 }}
          onClick={(e) => closeSidePannel(e, "/themes")}
        >
          Themes
        </motion.button>
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, delay: 4 * 0.05 }}
          onClick={(e) => closeSidePannel(e, "/ays")}
        >
          Analysis
        </motion.button>
      </motion.div>
    </>
  );
});
SidePannel.displayName = "SidePannel";
export default SidePannel;
