import { useContext } from "react";
import RegisterContext from "../../context/registerId";

export default function ThemeLayout({ theme, index }) {
  let { loadedThemes, applyCustomThemes } = useContext(RegisterContext);
  return (
    <div
      className="theme-layout"
      key={index}
      value={index}
      onClick={() => applyCustomThemes(index)}
    >
      <div
        className="theme-layout-head"
        style={{
          backgroundColor: theme["--secondary-color"],
          borderBottom: `1px solid ${theme["--acent-color"]}`,
        }}
      >
        <span
          className="title"
          style={{
            color: theme["--brand-color"],
          }}
        >
          surya
        </span>
      </div>
      <div
        className="theme-layout-body"
        style={{
          backgroundColor: theme["--main-color"],
        }}
      ></div>

      {/* {theme.name || index} */}
    </div>
  );
}
