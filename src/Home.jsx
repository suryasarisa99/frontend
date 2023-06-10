import { Routes, Route } from "react-router-dom";
import AnalysisId from "./pages/AnalysisId";
import AnalysisBranch from "./pages/AnalysisBranch";
import App from "./App";
import { useEffect, useContext } from "react";
import RegisterContext from "../context/registerId";
import axios from "axios";
import Navbar from "./components/Navbar";
import SidePannel from "./components/SidePannel";
import Theme from "./pages/Theme";

import UpdateName from "./boxes/UpdateName";
import LockBox from "./boxes/LockBox";
import UnlockBox from "./boxes/UnlockBox";
import UpdatePassword from "./boxes/UpdatePassword";
import UpdatePhoto from "./boxes/UpdatePhoto";

export default function Home({}) {
  let {
    setLoadedThemes,
    setColorTheme,
    applyCustomThemes,
    setLogoColor,
    server,
    sidePannel,
    setSidePannel,
    updatePassword,
    lockBox,
    isLocked,
    updateName,
    updatePhoto,
  } = useContext(RegisterContext);
  useEffect(() => {
    axios.get(`${server}/start`).then((res) => console.log(res));
    window.addEventListener("keydown", (e) => {
      if (e.altKey && e.key === "n") openUpdateName();
      if (e.altKey && e.key === "l") openLockBox();
      if (e.altKey && e.key === "p") openUpdatePhoto();
      if (e.altKey && e.key === "x") openThemePage();
    });
    window.addEventListener("focus", handleOnFocus);
    handleLoadThemes();
  }, []);

  function handleLoadThemes() {
    let color = localStorage.getItem("theme");
    let customThemes = JSON.parse(localStorage.getItem("custom-themes"));
    if (customThemes) setLoadedThemes(customThemes);

    console.log("color-theme: ", color);
    if (color?.length === 1) {
      applyCustomThemes(customThemes[+color], true);
      setColorTheme(+color);
    } else {
      setColorTheme(color);
      if (color) document.documentElement.classList.add(`${color}-theme`);
      else setColorTheme("slant-violet");
      setLogoColor(color);
    }
  }
  let handleOnFocus = () => {
    axios.get(`${server}/start`).then((res) => console.log("Focused"));
  };
  function toggleSidePanel(e) {
    setSidePannel((prevSidePannel) => !prevSidePannel);
    e.stopPropagation();

    // document.getElementById("overlay").style.display = "block";
  }
  return (
    <div>
      <Navbar toggleSidePanel={toggleSidePanel} />
      {sidePannel && <SidePannel />}
      {lockBox && <LockBox />}
      {isLocked && <UnlockBox />}
      {updatePassword && <UpdatePassword />}
      {updatePhoto && <UpdatePhoto></UpdatePhoto>}
      {updateName && <UpdateName />}

      <Routes>
        <Route path={"/ays"} element={<AnalysisId />} />
        <Route path={"/ays-branch"} element={<AnalysisBranch />} />
        <Route path="/" element={<App />} />
        <Route path="/themes" element={<Theme />} />
      </Routes>
    </div>
  );
}
