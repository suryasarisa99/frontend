import { useState, useContext } from "react";
import RegisterContext from "../../context/registerId";
import { FaBars } from "react-icons/fa";
export default function Navbar({ toggleSidePanel }) {
  let { regTerm, onChange, submitHandle, invalidRegId, validRegId } =
    useContext(RegisterContext);

  return (
    <nav>
      <div className="left-bar">
        {/* {<FaBars onClick={toggleSidePanel} />} */}
        {validRegId && (
          <FaBars className="menu-icon" onClick={toggleSidePanel} />
        )}
        <h1>Surya</h1>
      </div>
      <form onSubmit={submitHandle}>
        {invalidRegId && <span className="invalid-sym">!</span>}
        <input
          className={invalidRegId ? "invalid-reg-id" : ""}
          onChange={onChange}
          autoComplete="username"
          value={regTerm}
          placeholder="Register Id"
          autoFocus
          name="id"
        />
      </form>
    </nav>
  );
}
