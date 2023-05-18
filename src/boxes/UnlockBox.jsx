import { useEffect, useContext } from "react";
import RegisterContext from "../../context/registerId";
import ReactDOM from "react-dom";
import { GiCrossedSwords } from "react-icons/gi";

export default function unLockBox() {
  let {
    onOverlayClick,
    closeUnlockBox,
    submitUnlockBox,
    wrongPass,
    passTerm,
    setPassTerm,
    onPasswordInput,
  } = useContext(RegisterContext);
  useEffect(() => {
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
