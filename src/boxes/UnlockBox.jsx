import { useEffect, useContext } from "react";
import RegisterContext from "../../context/registerId";
import ReactDOM from "react-dom";
import { GiCrossedSwords } from "react-icons/gi";
import axios from "axios";
export default function unLockBox() {
  let {
    onOverlayClick,
    wrongPass,
    passTerm,
    setPassTerm,
    onPasswordInput,
    submitUnlockBox,
    closeUnlockBox,
    tempId,
    server,
    setImgUrl,
    setWrongPass,
    setName,
    setValidRegId,
    setPrivateAccount,
  } = useContext(RegisterContext);

  useEffect(() => {
    document.querySelector(".unlock-box input").focus();
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        closeUnlockBox();
      }
    });
    window.addEventListener("popstate", closeUnlockBox);
    return () => {
      window.removeEventListener("popstate", closeUnlockBox);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <form className="unlock-box" onSubmit={submitUnlockBox}>
        <div className="row">
          <label
            htmlFor="Password For Protection"
            className={wrongPass ? "wrong-pass" : ""}
            autoFocus
          >
            {wrongPass ? "Entered Wrong Password" : "Enter the passsword: "}
          </label>
          <GiCrossedSwords
            fill="red"
            className="close-btn"
            onClick={closeUnlockBox}
          />
        </div>
        <input
          type="password"
          name="password"
          value={passTerm}
          onChange={onPasswordInput}
        />
        <button>Submit</button>
      </form>
    </>,
    document.getElementById("overlay")
  );
}
