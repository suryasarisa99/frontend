import { createContext, useState } from "react";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../firebaseConfig";
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
  // let [server, setServer] = useState("http://localhost:4000");
  let [passTerm, setPassTerm] = useState("");
  let [wrongPass, setWrongPass] = useState(false);
  let [updatePhoto, setUpdatePhoto] = useState(false);
  let [name, setName] = useState("");
  let [imgUrl, setImgUrl] = useState("");
  let [imgUpload, setImgUpload] = useState(null);
  let [themePage, setThemePage] = useState(false);
  let [imgLoaded, setImgLoaded] = useState(false);
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
        } else if (res.data.mssg === "isLocked") {
          // setIsLocked(true);
          openUnlockBox();
        } else {
          setImgUrl(false);
          setImgLoaded(false);
          if (res.data.photo) getImg(res.data.photo);
          else setImgUrl(false);
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
  // =================   Lock Box ======================

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
    console.log("open-lock-box");
    document.getElementById("overlay").style.display = "block";
  }
  //================= UNLOck Box ==========================

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
          setImgUrl(false);
          // setImgLoaded(false);
          if (res.data.photo) getImg(res.data.photo);
          else setImgUrl(false);
          setData(res.data);
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
    setWrongPass(false);
    console.log("close-unLock-box");
    document.getElementById("overlay").style.display = "none";
  }
  function openUnlockBox(e) {
    setIsLocked(true);
    console.log("open-unlock-box");
    document.getElementById("overlay").style.display = "block";
  }
  function onPasswordInput(e) {
    if (wrongPass) setWrongPass(false);
    setPassTerm(e.target.value);
  }
  // ============ UPDATE PASSWORD ========================

  function openUpdatePassword(e) {
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
          closeUpdatePassword();
          if (res.data?.mssg == "removedPassword") {
            setPrivateAccount(false);
          }
        }
      });
  }

  function closeUpdatePassword() {
    setUpdatePassword(false);
    setWrongPass(false);
    document.getElementById("overlay").style.display = "none";
  }

  // ============== UPDATE NAME  ==============

  function updateName(e) {
    e.preventDefault();
    document.getElementById("overlay").style.display = "none";

    let fullName = {
      fname: e.target.fname.value,
      sname: e.target.sname.value,
      lname: e.target.lname.value,
    };
    setName(fullName);
    setUpdateBox(false);
    axios
      .post(`${server}/update/${data._id}`, fullName)
      .then((res) => console.log(res));
  }
  function onOverlayClick(e) {
    e.stopPropagation();
    setSidePannel(false);
    document.getElementById("overlay").style.display = "none";
  }

  // =============== Update Photo =================================

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
    let file = e.target.photo.files[0];
    let fileName = Date.now() + "-" + file.name;
    let ImgRef = ref(storage, `profile-pics/${fileName}`);
    uploadBytes(ImgRef, file).then((res) => {
      console.log(res);
    });

    axios
      .post(`${server}/photo/${data._id}`, {
        photo: fileName,
      })
      .then((res) => {
        console.log(res);
      });
    closeUpdatePhoto();
  }

  function getImg(imgName) {
    let ImgRef = ref(storage, `profile-pics/${imgName}`);
    getDownloadURL(ImgRef).then((url) => {
      setImgUrl(url);
      console.log(url);
    });
  }

  // =====================================
  function openThemePage() {
    setThemePage(true);
  }
  function closeThemePage() {
    setThemePage(false);
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
        themePage,
        setThemePage,
        openThemePage,
        closeThemePage,
        imgLoaded,
        setImgLoaded,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterContext;
export { RegisterProvider };
