import axios from "axios";
import "../styles/index.css";
import { useContext, useState, useEffect } from "react";
import RegisterContext from "../context/registerId";
import Result from "./components/Result";
import Navbar from "./components/Navbar";
import StartPage from "./components/StartPage";
import SidePannel from "./components/SidePannel";
import UpdateBox from "./boxes/UpdateBox";
import LockBox from "./boxes/LockBox";
import UnlockBox from "./boxes/UnlockBox";
import UpdatePassword from "./boxes/UpdatePassword";
import UpdatePhoto from "./boxes/UpdatePhoto";
import profileTemplate from "./asserts/profile-template.jpg";
export default function App() {
  let [labs, setLabs] = useState(true);
  let {
    validRegId,
    data,
    server,
    name,
    setName,
    onUpdateHandle,
    updateName,
    sidePannel,
    setSidePannel,
    updateBox,
    lockBox,
    isLocked,
    updatePassword,
    updatePhoto,
    imgUrl,
  } = useContext(RegisterContext);
  useEffect(() => {
    axios.get(`${server}/start`).then((res) => console.log(res.data));
    window.addEventListener("focus", handleOnFocus);
  }, []);

  let handleOnFocus = () => {
    axios.get(`${server}/start`).then((res) => console.log("Focused"));
  };

  let updateBtn = (
    <button className="update-btn" onClick={onUpdateHandle}>
      update
    </button>
  );
  function toggleSidePanel(e) {
    setSidePannel((prevSidePannel) => !prevSidePannel);
    e.stopPropagation();
    // document.getElementById("overlay").style.display = "block";
  }
  return (
    <>
      <Navbar toggleSidePanel={toggleSidePanel} />
      {sidePannel && <SidePannel />}
      {lockBox && <LockBox />}
      {isLocked && <UnlockBox />}
      {updatePassword && <UpdatePassword />}
      {updatePhoto && <UpdatePhoto></UpdatePhoto>}
      {!isLocked && (
        <div className="page">
          {validRegId && !isLocked ? (
            <div className="data2">
              <div className="info">
                <div className="text-info">
                  <h1 className="reg-id">Name: {name || updateBtn}</h1>
                  <h1 className="reg-id">Register No: {data._id}</h1>
                </div>
                <img src={imgUrl || profileTemplate} alt="hi" />
              </div>
              <Result data={data["2-1"]} yr={"2-1"} labs={labs} />
              <Result data={data["1-2"]} yr="1-2" labs={labs} />
            </div>
          ) : (
            <StartPage />
          )}
        </div>
      )}

      {updateBox && <UpdateBox />}
      {/* <LockBox /> */}
    </>
  );
}
