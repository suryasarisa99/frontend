import { Routes, Route } from "react-router-dom";
import AnalysisId from "./pages/AnalysisId";
import AnalysisBranch from "./pages/AnalysisBranch";
import App from "./App";
import { useEffect, useContext, useRef, useState } from "react";
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
    isOpened,
    setIsOpened,
    updatePassword,
    lockBox,
    isLocked,
    updateName,
    updatePhoto,
  } = useContext(RegisterContext);
  // const [isOpened, setIsOpened] = useState(false);
  const container = useRef(null);
  const mainPage = useRef(null);
  const sidebar = useRef(null);
  let touchStartX = 0;
  let touchMoveX = 0;
  let isSwiping = false;

  useEffect(() => {
    axios.get(`${server}/start`).then((res) => console.log(res));
    window.addEventListener("keydown", (e) => {
      // if (e.altKey && e.key === "n") openUpdateName();
      // if (e.altKey && e.key === "l") openLockBox();
      // if (e.altKey && e.key === "p") openUpdatePhoto();
      // if (e.altKey && e.key === "x") openThemePage();
    });
    window.addEventListener("focus", handleOnFocus);
    handleLoadThemes();

    container.current.addEventListener("touchstart", handleTouchStart, false);
    container.current.addEventListener("touchmove", handleTouchMove, false);
    container.current.addEventListener("touchend", handleTouchEnd, false);

    return () => {
      container.current.removeEventListener(
        "touchstart",
        handleTouchStart,
        false
      );
      container.current.removeEventListener(
        "touchmove",
        handleTouchMove,
        false
      );
      container.current.removeEventListener("touchend", handleTouchEnd, false);
    };
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
      else setColorTheme("slant-green");
      setLogoColor(color);
    }
  }
  let handleOnFocus = () => {
    axios.get(`${server}/start`).then((res) => console.log("Focused"));
  };
  // function toggleSidePanel(e) {
  // setSidePannel((prevSidePannel) => !prevSidePannel);
  //   e.stopPropagation();
  // }
  function toggleSidePanel(e) {
    // setSidePannel((prevSidePannel) => !prevSidePannel);
    setIsOpened((prvOpened) => !prvOpened);
    e.stopPropagation();
  }
  function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
    // isSwiping = true;
    console.log(container);
    console.log(sidebar);
    console.log(mainPage);
  }

  function handleTouchMove(event) {
    // if (!isSwiping) return;
    isSwiping = true;
    touchMoveX = event.touches[0].clientX;
    console.log(touchMoveX);
    console.log("+++++ Touch Move +++++=");
    const swipeDistance = touchMoveX - touchStartX;
    const maxSwipeDistance = sidebar.current.offsetWidth;

    if (swipeDistance > 0 && swipeDistance <= maxSwipeDistance) {
      console.log("Checking This");
      mainPage.current.style.transform = `translateX(${swipeDistance}px)`;
      sidebar.current.style.transform = `translateX(-${
        maxSwipeDistance - swipeDistance
      }px)`;
    }
  }

  function handleTouchEnd() {
    console.log(isSwiping);
    if (!isSwiping) return;
    isSwiping = false;

    const swipeDistance = touchMoveX - touchStartX;
    const maxSwipeDistance = sidebar.current.offsetWidth;
    console.log("----handle TouchEnd---");
    // if (swipeDistance < 0) return;
    if (swipeDistance > maxSwipeDistance / 2) {
      console.log("----handle TouchEnd--- OPEN");
      container.current.classList.add("open");
      setIsOpened(true);
    } else {
      console.log("----handle TouchEnd--- CLOSE");
      container.current.classList.remove("open");
      // setIsOpened(false);
    }

    // console.log(m)
    mainPage.current.style.transform = "";
    console.log(sidebar);
    sidebar.current.style.transform = "";
    mainPage.current.style.opacity = "";
    sidebar.current.style.opacity = "";
  }

  return (
    <div
      className={`container ${isOpened ? "open" : ""}`}
      ref={container}
      // // className={`container ${isOpened ? "open" : ""}`}
      // onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      // onTouchEnd={handleTouchEnd}
    >
      <Navbar toggleSidePanel={toggleSidePanel} />
      {/* {sidePannel && <SidePannel />} */}
      <SidePannel ref={sidebar}></SidePannel>
      {/* {lockBox && <LockBox />} */}
      {isLocked && <UnlockBox />}
      {updatePassword && <UpdatePassword />}
      {updatePhoto && <UpdatePhoto></UpdatePhoto>}
      {updateName && <UpdateName />}

      <Routes>
        <Route path={"/ays"} element={<AnalysisId />} />
        <Route path={"/ays-branch"} element={<AnalysisBranch />} />
        <Route path="/" element={<App ref={mainPage} />} />
        <Route path="/themes" element={<Theme />} />
      </Routes>
    </div>
  );
}
