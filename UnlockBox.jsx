import { useEffect, useContext } from "react";
import RegisterContext from "./context/registerId";

export default function unLockBox() {
  let { onOverlayClick, closeUnlockBox, submitUnlockBox } =
    useContext(RegisterContext);
  useEffect(() => {
    let overlay = document.getElementById("overlay");
    overlay.addEventListener("click", closeUnlockBox);

    return () => {
      overlay.removeEventListener("click", closeUnlockBox);
    };
  });
  return (
    <>
      <form className="lock-box" onSubmit={submitUnlockBox}>
        <label htmlFor="Password For Protection" autoFocus>
          Enter the passsword To Show Results
        </label>
        <input type="password" name="password" />
      </form>
    </>
  );
}
