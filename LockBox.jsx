import { useEffect, useContext } from "react";
import RegisterContext from "./context/registerId";

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
        <input type="password" name="password" />
      </form>
    </>
  );
}
