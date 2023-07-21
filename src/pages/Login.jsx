import React from "react";

import axios from "axios";
import RegisterContext from "../../context/registerId";
import { useContext } from "react";

export default function Login() {
  const { server } = useContext(RegisterContext);
  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post(`${server}/auth`, { pass: e.target.pass.value })
            .then((res) => localStorage.setItem("token", res.data.token));
        }}
      >
        <input type="text" name="pass" />
      </form>
    </div>
  );
}
