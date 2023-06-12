import { useEffect, useContext } from "react";
import RegisterContext from "../../context/registerId";
import ReactDOM from "react-dom";
import { GiCrossedSwords } from "react-icons/gi";
import { motion } from "framer-motion";
export default function unLockBox() {
  let {
    onOverlayClick,
    // closeUpdatePassword,
    submitUpdatePassword,
    updatePassword,
    wrongPass,
    passTerm,
    setPassTerm,
    onPasswordInput,
    closeUpdatePassword,
  } = useContext(RegisterContext);
  useEffect(() => {
    document.querySelector(".update-password input").focus();
    window.addEventListener("popstate", closeUpdatePassword);
    return () => {
      window.removeEventListener("popstate", closeUpdatePassword);
    };
  }, []);
  return ReactDOM.createPortal(
    <>
      <motion.form
        initial={{ y: -220, x: -205 }}
        animate={{ y: updatePassword ? 0 : 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="update-password"
        onSubmit={submitUpdatePassword}
      >
        <label
          htmlFor="Password For Protection"
          className={wrongPass ? "wrong-pass" : ""}
          autoFocus
        >
          {wrongPass ? "Entered Wrong Password" : "Change Password: "}
          {/* Change Password */}
        </label>
        <GiCrossedSwords className="close-btn" onClick={closeUpdatePassword} />
        <input
          type="password"
          name="oldPass"
          placeholder="Old Password"
          value={passTerm}
          onChange={onPasswordInput}
        />
        <input
          type="password"
          name="newPass"
          placeholder="New Password"

          //   value={passTerm}
          //   onChange={onPasswordInput}
        />
        <button>Submit</button>
      </motion.form>
    </>,
    document.getElementById("overlay")
  );
}
