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
  let [updatePassword, setUpdatePassword] = useState(false);
  let [privateAccount, setPrivateAccount] = useState(false);
  let [server, setServer] = useState("https://get-std-res.vercel.app");
  let [passTerm, setPassTerm] = useState("");
  let [wrongPass, setWrongPass] = useState(false);
  let [updatePhoto, setUpdatePhoto] = useState(false);
  // let [server, setServer] = useState("http://localhost:4000");
  let [name, setName] = useState("");
  let [imgUrl, setImgUrl] = useState("");
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
          // setIsLocked(true);
          openUnlockBox();
        } else {
          axios
            .get(`${server}/photo/${res.data.photo}`, {
              responseType: "blob",
            })
            .then((res) => {
              console.log(res);
              setImgUrl(URL.createObjectURL(res.data));
            });
          setData(res.data);
          console.log(res.data);
          setValidRegId(true);
          setName(res.data.name);
          if (privateAccount) setPrivateAccount(false);
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
  // Lock Box ===================================

  function submitLockBox(e) {
    e.preventDefault();
    console.log(e.target.password.value);
    axios
      .post(`${server}/lock/${data._id}`, {
        pass: e.target.password.value,
      })
      .then((res) => {
        console.log(res.data);
        setPrivateAccount(true);
      });
    closeLockBox();
  }
  function closeLockBox() {
    setLockBox(false);
    document.getElementById("overlay").style.display = "none";
  }
  function openLockBox(e) {
    setLockBox(true);
    // e.stopPropagation();

    console.log("open-lock-box");
    document.getElementById("overlay").style.display = "block";
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
        setPassTerm("");
        console.log(res.data);
        if (res.data?.mssg === "passwordNotMatch") {
          console.log("password Wrong");
          setWrongPass(true);
        } else {
          axios
            .get(`${server}/photo/${res.data.photo}`, {
              responseType: "blob",
            })
            .then((res) => {
              console.log(res);
              setImgUrl(URL.createObjectURL(res.data));
            });
          setIsLocked(false);
          setData(res.data);
          setValidRegId(true);
          closeUnlockBox();
          setName(res.data.name);
          setPrivateAccount(true);
        }
      });
  }
  function closeUnlockBox() {
    setIsLocked(false);
    console.log("close-unLock-box");
    document.getElementById("overlay").style.display = "none";
  }
  function openUnlockBox(e) {
    // e.stopPropagation();
    setIsLocked(true);
    console.log("open-unlock-box");
    document.getElementById("overlay").style.display = "block";
  }
  function onPasswordInput(e) {
    if (wrongPass) setWrongPass(false);
    setPassTerm(e.target.value);
  }
  // ====================================

  function openUpdatePassword(e) {
    // e.stopPropagation();
    setUpdatePassword(true);
    setPrivateAccount(true);
    console.log("open-update-password");
    document.getElementById("overlay").style.display = "block";
  }

  function submitUpdatePassword(e) {
    e.preventDefault();
    console.log("surya--submit");
    let oldPass = e.target.oldPass.value;
    let newPass = e.target.newPass.value;
    console.log("post");
    axios
      .post(`${server}/update-lock/${data._id}`, {
        oldPass,
        newPass,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data?.mssg === "PasswordNotMatch") {
          console.log("password Wrong");
          setWrongPass(true);
        } else {
          // setValidRegId(true);
          closeUpdatePassword();
          if (res.data?.mssg == "removedPassword") {
            setPrivateAccount(false);
          }
        }
      });
  }

  function closeUpdatePassword() {
    setUpdatePassword(false);
    document.getElementById("overlay").style.display = "none";
  }

  // =============================
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
    setSidePannel(false);
    document.getElementById("overlay").style.display = "none";
  }

  // =============== Update Photo ===================
  function openUpdatePhoto() {
    setUpdatePhoto(true);
    document.getElementById("overlay").style.display = "block";
  }
  function closeUpdatePhoto() {
    setUpdatePhoto(false);
    document.getElementById("overlay").style.display = "none";
  }
  function submitUpdatePhoto(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", e.target.photo.files[0]);

    axios
      .post(`${server}/photo/${data._id}`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    closeUpdatePhoto();
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
        wrongPass,
        setWrongPass,
        setPassTerm,
        passTerm,
        onPasswordInput,
        updatePassword,
        setUpdatePassword,
        openUpdatePassword,
        submitUpdatePassword,
        closeUpdatePassword,
        privateAccount,
        updatePhoto,
        setUpdatePhoto,
        submitUpdatePhoto,
        openUpdatePhoto,
        closeUpdatePhoto,
        imgUrl,
        setImgUrl,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterContext;
export { RegisterProvider };
