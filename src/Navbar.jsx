import { useState, useContext } from "react";
import RegisterContext from "../context/registerId";
import { FaBars } from "react-icons/fa";
export default function Navbar({ toggleSidePanel }) {
  let { regTerm, onChange, submitHandle, invalidRegId } =
    useContext(RegisterContext);

  return (
    <nav>
      <FaBars onClick={toggleSidePanel} />
      <h1>Surya</h1>
      <form action="" onSubmit={submitHandle}>
        {invalidRegId && <span className="invalid-sym">!</span>}
        <input
          className={invalidRegId ? "invalid-reg-id" : ""}
          onChange={onChange}
          value={regTerm}
          placeholder="Register Id"
          autoFocus
          name="id"
        />
      </form>
    </nav>
  );
}
