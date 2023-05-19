import RegisterContext from "../../context/registerId";
import { useContext, useEffect } from "react";
export default function Theme({}) {
  let {
    closeThemePage,
    setLogoColor,
    loadedThemes,
    setLoadedThemes,
    startPage,
    data,
    setColorTheme,
  } = useContext(RegisterContext);
  useEffect(() => {
    window.addEventListener("popstate", closeThemePage);
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
    e.preventDefault();
    let obj = {
      "--main-color": getComputedStyle(root).getPropertyValue("--main-color"),
      "--acent-color": getComputedStyle(root).getPropertyValue("--acent-color"),
      "--secondary-color":
        getComputedStyle(root).getPropertyValue("--secondary-color"),
      "--text-color": getComputedStyle(root).getPropertyValue("--text-color"),
      "--brand-color": getComputedStyle(root).getPropertyValue("--brand-color"),
      name: e.target["theme-name"].value,
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
      <div className="theme-page">
        <button onClick={closeThemePage}>Back</button>

        <div className="color-themes">
          <div
            className="color-box green-color"
            value="green"
            onClick={setTheme}
          ></div>
          <div
            className="color-box red-color"
            value="red"
            onClick={setTheme}
          ></div>
          <div
            className="color-box pink-color"
            value="pink"
            onClick={setTheme}
          ></div>
          <div
            className="color-box blue-color"
            value="blue"
            onClick={setTheme}
          ></div>
        </div>
        <div className="color-themes dark-themes">
          <div
            className="color-box green-color"
            value="amoled-green"
            onClick={setTheme}
          ></div>
          <div
            className="color-box red-color"
            value="amoled-red"
            onClick={setTheme}
          ></div>
          <div
            className="color-box pink-color"
            value="amoled-pink"
            onClick={setTheme}
          ></div>
          <div
            className="color-box blue-color"
            value="amoled-blue"
            onClick={setTheme}
          ></div>
        </div>

        <div className="custom-themes">
          {loadedThemes?.map((theme, index) => {
            return (
              <button
                key={index}
                value={index}
                onClick={(e) => {
                  Object.entries(loadedThemes[e.target.value]).map(
                    ([key, value]) => {
                      let root = document.documentElement;
                      root.style.setProperty(key, value);
                    }
                  );
                  localStorage.setItem(
                    "theme",
                    loadedThemes[e.target.value].name
                  );
                }}
              >
                {theme.name}
              </button>
            );
          })}
        </div>
      </div>
      <form action="" onSubmit={saveCustomTheme} className="custom-theme-maker">
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
        <div className="field">
          <p>theme Name</p>
          <input type="text" name="theme-name" />
        </div>
        <button>Save Custom Theme</button>
      </form>
      {/* <input type="color" ref={inputRef} onChange={handleColor} /> */}
    </>
  );
}
