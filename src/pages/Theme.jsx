import RegisterContext from "../../context/registerId";
import { useContext, useEffect } from "react";
import ThemeLayout from "../components/ThemeLayout";
import { motion } from "framer-motion";
export default function Theme() {
  let {
    closeThemePage,
    setLogoColor,
    loadedThemes,
    setLoadedThemes,
    startPage,
    data,
    setColorTheme,
    applyCustomThemes,
  } = useContext(RegisterContext);
  useEffect(() => {
    window.addEventListener("popstate", closeThemePage);
    window.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        closeThemePage();
      }
    });
    return () => {
      window.removeEventListener("popstate", closeThemePage);
    };
  }, []);
  function setTheme(e) {
    let color = e.target.getAttribute("value");
    document.documentElement.style = "";
    setColorTheme(color);
    if (data._id == "21U41A0546") setLogoColor(color);
    const classesToRemove = Array.from(document.documentElement.classList);
    classesToRemove.forEach((className) => {
      document.documentElement.classList.remove(className);
    });
    document.documentElement.classList.add(`${color}-theme`);
    localStorage.setItem("theme", color);
  }

  // =============

  function handleAcentColor(e) {
    const root = document.documentElement;
    root.style.setProperty("--acent-color", e.target.value);
  }
  function handleMainColor(e) {
    const root = document.documentElement;
    root.style.setProperty("--main-color", e.target.value);
  }
  function handleSecondaryColor(e) {
    const root = document.documentElement;
    root.style.setProperty("--secondary-color", e.target.value);
  }
  function handleBrandColor(e) {
    const root = document.documentElement;
    root.style.setProperty("--brand-color", e.target.value);
  }
  function handleTextColor(e) {
    const root = document.documentElement;
    root.style.setProperty("--text-color", e.target.value);
  }
  function saveCustomTheme(e) {
    const root = document.documentElement;
    let obj = {
      "--main-color": getComputedStyle(root).getPropertyValue("--main-color"),
      "--acent-color": getComputedStyle(root).getPropertyValue("--acent-color"),
      "--secondary-color":
        getComputedStyle(root).getPropertyValue("--secondary-color"),
      "--text-color": getComputedStyle(root).getPropertyValue("--text-color"),
      "--brand-color": getComputedStyle(root).getPropertyValue("--brand-color"),
      // name: e.target["theme-name"].value,
    };
    console.log(obj);
    console.log(loadedThemes);
    let cpyLoadedThemes = [...loadedThemes];
    cpyLoadedThemes.push(obj);
    setLoadedThemes(cpyLoadedThemes);
    localStorage.setItem("custom-themes", JSON.stringify(cpyLoadedThemes));
  }

  return (
    <>
      <motion.div
        className="theme-page"
        initial={{ scale: 0.7 }}
        animate={{ scale: 1 }}
      >
        {/* <button onClick={()=>navigate("/")}>Back</button> */}

        <div className="default-themes">
          <div className="red-themes">
            <div
              className="color-box red-color"
              value="red"
              onClick={setTheme}
            ></div>
            <div
              className="color-box amoled-color"
              value="amoled-red"
              onClick={setTheme}
            ></div>
            <div
              className="color-box slant-color"
              value="slant-red"
              onClick={setTheme}
            ></div>
            <div
              className="color-box dark-slant-color"
              value="dark-slant-red"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box amoled-slant-color"
              value="amoled-slant-red"
              onClick={setTheme}
            ></div>
          </div>

          <div className="yellow-themes">
            <div
              className="color-box yellow-color"
              value="yellow"
              onClick={setTheme}
            ></div>
            <div
              className="color-box amoled-color"
              value="amoled-yellow"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box slant-color"
              value="slant-yellow"
              onClick={setTheme}
            ></div>
            <div
              className="color-box dark-slant-color"
              value="dark-slant-yellow"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box amoled-slant-color"
              value="amoled-slant-yellow"
              onClick={setTheme}
            ></div>
          </div>

          <div className="green-themes">
            <div
              className="color-box green-color"
              value="green"
              onClick={setTheme}
            ></div>
            <div
              className="color-box amoled-color"
              value="amoled-green"
              onClick={setTheme}
            ></div>
            <div
              className="color-box slant-color"
              value="slant-green"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box dark-slant-color"
              value="dark-slant-green"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box amoled-slant-color"
              value="amoled-slant-green"
              onClick={setTheme}
            ></div>
          </div>

          <div className="cyan-themes">
            <div
              className="color-box cyan-color"
              value="cyan"
              onClick={setTheme}
            ></div>
            <div
              className="color-box amoled-color"
              value="amoled-cyan"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box slant-color"
              value="slant-cyan"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box dark-slant-color"
              value="dark-slant-cyan"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box amoled-slant-color"
              value="amoled-slant-cyan"
              onClick={setTheme}
            ></div>
          </div>

          <div className="sky-blue-themes">
            <div
              className="color-box sky-blue-color"
              value="sky-blue"
              onClick={setTheme}
            ></div>
            <div
              className="color-box amoled-color"
              value="amoled-sky-blue"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box slant-color"
              value="slant-sky-blue"
              onClick={setTheme}
            ></div>
            <div
              className="color-box dark-slant-color"
              value="dark-slant-sky-blue"
              onClick={setTheme}
            ></div>
            <div
              className="color-box amoled-slant-color"
              value="amoled-slant-sky-blue"
              onClick={setTheme}
            ></div>
          </div>

          <div className="blue-themes">
            <div
              className="color-box blue-color"
              value="blue"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box amoled-color"
              value="amoled-blue"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box slant-color"
              value="slant-blue"
              onClick={setTheme}
            ></div>
            <div
              className="color-box dark-slant-color"
              value="dark-slant-blue"
              onClick={setTheme}
            ></div>
            <div
              className="color-box amoled-slant-color"
              value="amoled-slant-blue"
              onClick={setTheme}
            ></div>
          </div>

          <div className="violet-themes">
            <div
              className="color-box violet-color"
              value="violet"
              onClick={setTheme}
            ></div>
            <div
              className="color-box amoled-color"
              value="amoled-violet"
              onClick={setTheme}
            ></div>
            <div
              className="color-box slant-color"
              value="slant-violet"
              onClick={setTheme}
            ></div>
            <div
              className="color-box dark-slant-color"
              value="dark-slant-violet"
              onClick={setTheme}
            ></div>
            <div
              className="color-box amoled-slant-color"
              value="amoled-slant-violet"
              onClick={setTheme}
            ></div>
          </div>

          <div className="pink-themes">
            <div
              className="color-box pink-color"
              value="pink"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box amoled-color"
              value="amoled-pink"
              onClick={setTheme}
            ></div>
            <div
              className="color-box slant-color"
              value="slant-pink"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box dark-slant-color"
              value="dark-slant-pink"
              onClick={setTheme}
            ></div>{" "}
            <div
              className="color-box amoled-slant-color"
              value="amoled-slant-pink"
              onClick={setTheme}
            ></div>
          </div>
        </div>
      </motion.div>

      <div className="custom-theme-wrapper">
        <div className="custom-themes">
          {loadedThemes?.map((theme, index) => {
            return <ThemeLayout theme={theme} key={theme} index={index} />;
          })}
        </div>
      </div>
      <div action="" className="custom-theme-maker">
        <div className="field">
          <p>Acent Color</p> <input type="color" onChange={handleAcentColor} />
        </div>
        <div className="field">
          <p>Main Color </p>
          <input type="color" onChange={handleMainColor} />
        </div>
        <div className="field">
          <p>Secondar Color</p>
          <input type="color" onChange={handleSecondaryColor} />
        </div>
        <div className="field">
          <p> Title Color</p>
          <input type="color" onChange={handleBrandColor} />
        </div>
        <div className="field">
          <p>Text Color</p>
          <input type="color" onChange={handleTextColor} />
        </div>
        {/* <div className="field">
          <p>theme Name</p>
          <input type="text" name="theme-name" />
        </div> */}
        <button onClick={saveCustomTheme}>Save Custom Theme</button>
      </div>
      {/* <input type="color" ref={inputRef} onChange={handleColor} /> */}
    </>
  );
}
