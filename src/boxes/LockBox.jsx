import { useEffect, useContext } from "react";
import RegisterContext from "../../context/registerId";
import { GiCrossedSwords } from "react-icons/gi";

export default function LockBox() {
  let { onOverlayClick, closeLockBox, submitLockBox } =
    useContext(RegisterContext);
  useEffect(() => {
    let overlay = document.getElementById("overlay");
    overlay.addEventListener("click", closeLockBox);

    return () => {
      overlay.removeEventListener("click", closeLockBox);
    };
  });
  return (
    <>
      <form className="lock-box" onSubmit={submitLockBox}>
        <label htmlFor="Password For Protection" autoFocus>
          Set Password
        </label>
        <GiCrossedSwords
          fill="red"
          className="close-btn"
          onClick={closeLockBox}
        />
        <input type="password" name="password" />
        <button>Submit</button>
      </form>
    </>
  );
}
