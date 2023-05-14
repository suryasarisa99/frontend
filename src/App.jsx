import { useContext, useState, useEffect } from "react";
import Result from "./Result";
import "../styles/index.css";
import Navbar from "./Navbar";
import RegisterContext from "../context/registerId";
import axios from "axios";
import UpdateBox from "./UpdateBox";
import StartPage from "./StartPage";
import SidePannel from "./SidePannel";
import LockBox from "../LockBox";
import UnlockBox from "../UnlockBox";
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
    setSidePannel(true);
    e.stopPropagation();
    document.getElementById("overlay").style.display = "block";
  }
  return (
    <>
      <Navbar toggleSidePanel={toggleSidePanel} />
      {sidePannel && <SidePannel />}
      {lockBox && <LockBox />}
      {isLocked && <UnlockBox />}

      {!isLocked && (
        <div className="page">
          {validRegId && !isLocked ? (
            <div className="data2">
              <h1 className="reg-id">Name: {name || updateBtn}</h1>
              <h1 className="reg-id">Register No: {data._id}</h1>
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
