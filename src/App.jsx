import { useContext, useState, useEffect } from "react";
import Result from "./Result";
import "../styles/index.scss";
import Navbar from "./Navbar";
import RegisterContext from "../context/registerId";
import axios from "axios";
import UpdateBox from "./UpdateBox";
import StartPage from "./StartPage";

export default function App() {
  let [labs, setLabs] = useState(true);
  let [updateBox, setUpdateBox] = useState(false);
  let { validRegId, data, server, name, setName } = useContext(RegisterContext);
  useEffect(() => {
    axios.get(`${server}/start`).then((res) => console.log(res.data));
    window.addEventListener("focus", handleOnFocus);
  }, []);

  let handleOnFocus = () => {
    axios.get(`${server}/start`).then((res) => console.log("Focused"));
  };

  function onUpdateHandle() {
    setUpdateBox(true);
    document.getElementById("overlay").style.display = "block";
  }

  let updateBtn = (
    <button className="update-btn" onClick={onUpdateHandle}>
      update
    </button>
  );
  function updateName(e) {
    e.preventDefault();
    document.getElementById("overlay").style.display = "none";

    let n =
      e.target.fname.value +
      " " +
      e.target.sname.value +
      " " +
      e.target.lname.value;

    setName(n);
    setUpdateBox(false);
    axios
      .post(`${server}/update/${data._id}`, { name: n })
      .then((res) => console.log(res));
  }
  return (
    <>
      <Navbar />
      <div className="page">
        {validRegId ? (
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

      {updateBox && (
        <UpdateBox updateName={updateName} setUpdateBox={setUpdateBox} />
      )}
    </>
  );
}
