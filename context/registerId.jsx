import { createContext, useState } from "react";
import axios from "axios";
let RegisterContext = createContext();

function RegisterProvider({ children }) {
  let [emptyRegId, setEmptyRegId] = useState(false);
  let [invalidRegId, setInvalidRegId] = useState(false);
  let [validRegId, setValidRegId] = useState(false);
  let [regTerm, setRegTerm] = useState("");
  let [data, setData] = useState({});
  let [sidePannel, setSidePannel] = useState(false);
  let [updateBox, setUpdateBox] = useState(false);
  let [lockBox, setLockBox] = useState(false);
  let [isLocked, setIsLocked] = useState(false);
  let [tempId, setTempId] = useState("");
  // let [server, setServer] = useState("https://get-std-res.vercel.app");
  let [server, setServer] = useState("http://localhost:4000");
  let [name, setName] = useState("");

  function submitHandle(e) {
    e.preventDefault();
    let id = e.target.id.value;
    if (!id) {
      setEmptyRegId(true);
      setValidRegId(false);
    } else {
      id = makeId(id);
      setTempId(id);

      console.log(id);
      axios.get(`${server}/${id}`).then((res) => {
        if (res.data.mssg === "InvalidRegId") {
          console.log(res.data.mssg);
          setInvalidRegId(true);
          setValidRegId(false);
          // setData({});
        } else if (res.data.mssg === "isLocked") {
          setIsLocked(true);
        } else {
          setData(res.data);
          console.log(res.data);
          setValidRegId(true);
          setName(res.data.name);
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
    if (id.includes("LE")) {
      regId = "22U45A0500";
      let leIndex = id.indexOf("LE");
      if (id.startsWith("LE")) {
        id = id.substring(2);
      } else id = id.substring(0, leIndex) + id.substring(leIndex);
      console.log("spliced: " + id);
    }
    let branch = id.substring(6, 8);
    if (id.length === 3) id = "0" + id;
    return regId.substring(0, 10 - id.length) + id;
  }
  function toogleServer() {
    if (server === "backend-39in.vercel.app")
      setServer("get-std-res.vercel.app");
    else setServer("backend-39in.vercel.app");
  }
  function onUpdateHandle(e) {
    setUpdateBox(true);
    document.getElementById("overlay").style.display = "block";
    // e.stopPropagation();
  }
  // UNLOck Box ===================================

  function submitLockBox(e) {
    console.log(e.target.password.value);
    axios
      .post(`${server}/lock/${data._id}`, {
        pass: e.target.password.value,
      })
      .then((res) => {
        console.log(res.data);
      });
    closeLockBox();
  }
  function closeLockBox() {
    setLockBox(false);
    document.querySelector("#overlay").style.display = "none";
  }
  function openLockBox(e) {
    setLockBox(true);
    e.stopPropagation();

    console.log("open-lock-box");
    document.querySelector("#overlay").style.display = "block";
  }
  // UNLOck Box ===================================

  function submitUnlockBox(e) {
    e.preventDefault();
    console.log(tempId);
    console.log(e.target.password.value);
    console.log("post");
    axios
      .post(`${server}/${tempId}`, {
        pass: e.target.password.value,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data?.mssg === "passwordNotMatch") {
          console.log("password Wrong");
        } else {
          setIsLocked(false);
          setData(res.data);
          setValidRegId(true);
          console.log("true");
        }
      });
    // closeUnlockBox();
  }
  function closeUnlockBox() {
    // isLocked(false);
    // document.querySelector("#overlay").style.display = "none";
  }
  function openUnlockBox(e) {
    // isLocked(true);
    e.stopPropagation();

    console.log("open-lock-box");
    document.querySelector("#overlay").style.display = "block";
  }

  function updateName(e) {
    e.preventDefault();
    document.getElementById("overlay").style.display = "none";

    let n =
      e.target.fname.value +
      " " +
      e.target.sname.value +
      " " +
      e.target.lname.value;

    setName(n);
    setUpdateBox(false);
    axios
      .post(`${server}/update/${data._id}`, { name: n })
      .then((res) => console.log(res));
  }
  function onOverlayClick(e) {
    e.stopPropagation();
    document.getElementById("overlay").style.display = "none";
  }
  return (
    <RegisterContext.Provider
      value={{
        regTerm,
        submitHandle,
        onChange,
        validRegId,
        data,
        server,
        name,
        setName,
        invalidRegId,
        onUpdateHandle,
        updateName,
        sidePannel,
        setSidePannel,
        updateBox,
        setUpdateBox,
        lockBox,
        openLockBox,
        submitLockBox,
        closeLockBox,
        onOverlayClick,
        isLocked,
        submitUnlockBox,
        closeUnlockBox,
        openUnlockBox,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterContext;
export { RegisterProvider };
