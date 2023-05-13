import { useState, useContext } from "react";
import RegisterContext from "../context/registerId";
export default function Navbar() {
  let { regTerm, onChange, submitHandle } = useContext(RegisterContext);

  return (
    <nav>
      <h1>Surya</h1>
      <form action="" onSubmit={submitHandle}>
        <input
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