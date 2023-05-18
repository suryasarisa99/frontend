import RegisterContext from "../../context/registerId";
import { useContext, useEffect } from "react";
export default function Theme({}) {
  let { closeThemePage, setLogoColor, startPage } = useContext(RegisterContext);
  useEffect(() => {
    window.addEventListener("popstate", closeThemePage);
    return () => {
      window.removeEventListener("popstate", closeThemePage);
    };
  }, []);
  function setTheme(e) {
    let color = e.currentTarget.getAttribute("value");
    if (startPage) setLogoColor(color);
    const classesToRemove = Array.from(document.documentElement.classList);
    classesToRemove.forEach((className) => {
      document.documentElement.classList.remove(className);
    });
    document.documentElement.classList.add(`${color}-theme`);
    localStorage.setItem("theme", color);
  }
  // window.history.pushState(null,"",window.location.pathname.split("/").slice(0,-1).join("/") || "/")
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
      </div>
    </>
  );
}
