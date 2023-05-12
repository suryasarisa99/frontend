import { createContext, useState } from "react";
import axios from "axios";
let RegisterContext = createContext();

function RegisterProvider({ children }) {
  let [emptyRegId, setEmptyRegId] = useState(false);
  let [invalidRegId, setInvalidRegId] = useState(false);
  let [validRegId, setValidRegId] = useState(false);
  let [regTerm, setRegTerm] = useState("");
  let [data, setData] = useState({});
  let [server, setServer] = useState("get-std-res.vercel.app");

  function submitHandle(e) {
    e.preventDefault();
    let id = e.target.id.value;
    if (!id) {
      setEmptyRegId(true);
      setValidRegId(false);
    } else {
      id = makeId(id);
      console.log(id);
      axios.get(`https://${server}/${id}`).then((res) => {
        if (
          res.data["2-1"].mssg === "InvalidRegId" ||
          res.data["1-2"].mssg === "InvalidRegId"
        ) {
          setInvalidRegId(true);
          setValidRegId(false);
          // setData({});
        } else {
          setData(res.data);
          console.log(res.data);
          setValidRegId(true);
        }
      });
    }
  }
  function onChange(e) {
    setRegTerm(e.target.value.toUpperCase());
    if (emptyRegId && regTerm) setEmptyRegId(false);
    if (invalidRegId) setInvalidRegId(false);
  }
  function makeId(id) {
    let regId = "21U41A0500";
    let branch = id.substring(6, 8);
    if (id.length === 3) id = "0" + id;
    return regId.substring(0, 10 - id.length) + id;
  }
  function toogleServer() {
    if (server === "backend-39in.vercel.app")
      setServer("get-std-res.vercel.app");
    else setServer("backend-39in.vercel.app");
  }

  return (
    <RegisterContext.Provider
      value={{ regTerm, submitHandle, onChange, validRegId, data, server }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterContext;
export { RegisterProvider };
