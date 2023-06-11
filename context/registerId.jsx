import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../firebaseConfig";
import red from "../src/asserts/logos/red.png";
import pink from "../src/asserts/logos/pink.png";
import green from "../src/asserts/logos/green.png";
import blue from "../src/asserts/logos/blue.png";
import mydata from "../src/temp.json";
import slantBlue from "../src/asserts/slant/slant-blue.png";
import slantGreen from "../src/asserts/slant/slant-green.png";
import slantRed from "../src/asserts/slant/slant-red.png";
import slantYellow from "../src/asserts/slant/slant-yellow.png";
import slantCyan from "../src/asserts/slant/slant-cyan.png";
import slantViolet from "../src/asserts/slant/slant-violet.png";
import slantPink from "../src/asserts/slant/slant-pink.png";
// import slantBlue from "../src/asserts/slant/slant-blue.png"
import { saveAs } from "file-saver";
let RegisterContext = createContext();
import { useNavigate } from "react-router-dom";
function RegisterProvider({ children }) {
  let [emptyRegId, setEmptyRegId] = useState(false);
  let [invalidRegId, setInvalidRegId] = useState(false);
  let [validRegId, setValidRegId] = useState(false);
  let [regTerm, setRegTerm] = useState("");
  let [data, setData] = useState({});
  let [analysisData, setAnalysisData] = useState([]);
  let [sidePannel, setSidePannel] = useState(false);
  let [updateName, setUpdateName] = useState(false);
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
  let [startPage, setStartPage] = useState(true);
  let [colorTheme, setColorTheme] = useState(false);
  let [loadedThemes, setLoadedThemes] = useState([]);
  let [aysYear, setAysYear] = useState("");
  let [aysBranch, setAysBranch] = useState("");
  let navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setData(mydata);
    setValidRegId(true);
    setName(mydata.name);
    // fetch(manifestUrl)
    //   .then((response) => response.json())
    //   .then((manifest) => {
    //     manifest.theme_color = ""; // Set the new theme color
    //     const updatedManifestJson = JSON.stringify(manifest);
    //     const updatedManifestBlob = new Blob([updatedManifestJson], {
    //       type: "application/json",
    //     });
    //     const updatedManifestUrl = URL.createObjectURL(updatedManifestBlob);
    //     currentManifest.setAttribute("href", updatedManifestUrl);
    //   });
  }, []);

  // Get the current manifest data
  const currentManifest = document.querySelector('link[rel="manifest"]');
  const manifestUrl = currentManifest.getAttribute("href");

  // Fetch the manifest file

  function submitHandle(e) {
    e.preventDefault();
    let id = e.target.id.value;
    if (!id) {
      setEmptyRegId(true);
      setValidRegId(false);
    } else {
      console.log("=================");
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
          openUnlockBox(res.data);
        } else {
          setImgUrl(false);
          setStartPage(false);
          navigate("/");
          if (res.data.photo) getImg(res.data.photo);
          else setImgUrl(false);
          // handleDownload(res.data);
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
  function openUpdateName(e) {
    setUpdateName(true);
    window.history.pushState(null, "", "popup");
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
    window.history.pushState(
      null,
      "",
      window.location.pathname.split("/").slice(0, -1).join("/") || "/"
    );
    document.getElementById("overlay").style.display = "none";
  }
  function openLockBox(e) {
    setLockBox(true);
    console.log("open-lock-box");
    window.history.pushState(null, "", "popup");
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
          setStartPage(false);
          if (res.data._id === "21U41A0546") {
            setLogoColor(colorTheme);
            res.data.photo = "dummyText";
          } else if (res.data.photo) getImg(res.data.photo);
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
    window.history.pushState(
      null,
      "",
      window.location.pathname.split("/").slice(0, -1).join("/") || "/"
    );
    document.getElementById("overlay").style.display = "none";
  }
  function openUnlockBox(e) {
    setIsLocked(true);
    console.log("open-unlock-box");
    window.history.pushState(null, "", "popup");
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
    window.history.pushState(null, "", "popup");
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
    window.history.pushState(
      null,
      "",
      window.location.pathname.split("/").slice(0, -1).join("/") || "/"
    );
    document.getElementById("overlay").style.display = "none";
  }

  // ============== UPDATE NAME  ==============

  function closeUpdateName(e) {
    e.stopPropagation();
    setSidePannel(false);
    document.getElementById("overlay").style.display = "none";
  }

  // =============== Update Photo =================================

  function openUpdatePhoto() {
    setUpdatePhoto(true);
    window.history.pushState(null, "", "popup");
    document.getElementById("overlay").style.display = "block";
  }
  function closeUpdatePhoto() {
    setUpdatePhoto(false);
    window.history.pushState(
      null,
      "",
      window.location.pathname.split("/").slice(0, -1).join("/") || "/"
    );
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
    window.history.pushState(null, "", "popup");
    setThemePage(true);
  }

  function setLogoColor(color) {
    switch (color) {
      case "red":
      case "amoled-red":
        setImgUrl(red);
        break;
      case "pink":
      case "amoled-pink":
        setImgUrl(pink);
        break;
      case "green":
      case "amoled-green":
        setImgUrl(green);
        break;
      case "blue":
      case "amoled-blue":
        setImgUrl(blue);
        break;
      case "dark-slant-red":
      case "amoled-slant-red":
        setImgUrl(slantRed);
        break;
      case "dark-slant-yellow":
      case "amoled-slant-yellow":
        setImgUrl(slantYellow);
        break;
      case "dark-slant-green":
      case "amoled-slant-green":
        setImgUrl(slantGreen);
        break;
      case "dark-slant-cyan":
      case "amoled-slant-cyan":
        setImgUrl(slantCyan);
        break;
      case "dark-slant-blue":
      case "amoled-slant-blue":
        setImgUrl(slantBlue);
        break;
      case "dark-slant-violet":
      case "amoled-slant-violet":
        setImgUrl(slantViolet);
        break;
      case "dark-slant-pink":
      case "amoled-slant-pink":
        setImgUrl(slantPink);
        break;

      default:
        setImgUrl(slantGreen);
    }
  }
  function applyCustomThemes(colorIndex, dontSave) {
    let obj;
    if (typeof colorIndex === "number") obj = loadedThemes[colorIndex];
    else obj = colorIndex;
    console.log(obj);
    if (obj) {
      Object.entries(obj).map(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
      setImgUrl(red);
      if (!dontSave) {
        localStorage.setItem("theme", colorIndex);
      }
    }
  }
  async function handleDownload(obj) {
    // const response = await fetch(`${server}/download/${id}`);
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(new Blob([blob]));
    // const link = document.getElementById("download");
    // link.href = url;
    // link.setAttribute("download", "results.txt");
    // console.log(link);

    const jsonStr = JSON.stringify(obj, null, 2);
    const file = new Blob([jsonStr], { type: "application/json" });
    saveAs(file, obj._id);
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

        updateName,
        setUpdateName,
        openUpdateName,
        // handleUpdateName,
        closeUpdateName,
        sidePannel,
        setSidePannel,
        lockBox,
        openLockBox,
        submitLockBox,
        closeLockBox,
        // onOverlayClick,
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
        imgLoaded,
        setImgLoaded,
        getImg,
        setData,
        setValidRegId,
        setLogoColor,
        startPage,
        handleDownload,
        setColorTheme,
        setLoadedThemes,
        loadedThemes,
        applyCustomThemes,

        aysBranch,
        aysYear,
        setAysBranch,
        setAysYear,
        analysisData,
        setAnalysisData,
        isOpened,
        setIsOpened,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterContext;
export { RegisterProvider };
