import { useEffect, useContext } from "react";
import RegisterContext from "../../context/registerId";
import { GiCrossedSwords } from "react-icons/gi";
import { motion } from "framer-motion";
export default function LockBox() {
  let { onOverlayClick, lockBox, closeLockBox, submitLockBox } =
    useContext(RegisterContext);
  useEffect(() => {
    document.querySelector(".lock-box input").focus();
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        closeLockBox();
      }
    });
    window.addEventListener("popstate", closeLockBox);
    return () => {
      window.removeEventListener("popstate", closeLockBox);
    };
  }, []);
  return (
    <>
      <motion.form
        initial={{ y: -180, x: -205 }}
        animate={{ y: lockBox ? 0 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="lock-box"
        onSubmit={submitLockBox}
      >
        <label htmlFor="Password For Protection" autoFocus>
          Set Password
        </label>
        <GiCrossedSwords className="close-btn" onClick={closeLockBox} />
        <input type="password" name="password" />
        <button>Submit</button>
      </motion.form>
    </>
  );
}
