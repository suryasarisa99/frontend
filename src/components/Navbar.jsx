import { useState, useContext, forwardRef } from "react";
import RegisterContext from "../../context/registerId";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function Navbar({ toggleSidePanel }) {
  let { regTerm, onChange, submitHandle, invalidRegId, validRegId } =
    useContext(RegisterContext);
  let navigate = useNavigate();
  return (
    <nav>
      <div className="left-bar">
        {/* {<FaBars onClick={toggleSidePanel} />} */}
        {<FaBars className="menu-icon" onClick={toggleSidePanel} />}
        <h1 onClick={() => navigate("/")}>Surya</h1>
      </div>
      <form onSubmit={submitHandle}>
        {invalidRegId && <span className="invalid-sym">!</span>}
        <input
          className={invalidRegId ? "invalid-reg-id" : ""}
          onChange={onChange}
          autoComplete="username"
          value={regTerm}
          placeholder="Register Id"
          // autoFocus
          name="id"
          type="text"
          max="10"
        />
      </form>
    </nav>
  );
}
