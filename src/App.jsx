import axios from "axios";
import { useState } from "react";
import Result from "./Result";

export default function App() {
  let [data, setData] = useState({});
  let [regTerm, setRegTerm] = useState("");
  let [emptyRegId, setEmptyRegId] = useState(false);
  let [invalidRegId, setInvalidRegId] = useState(false);
  let [validRegId, setValidRegId] = useState(false);
  let [submit, setSubmit] = useState(false);
  let [labs, setLabs] = useState(false);
  function submitHandle(e) {
    e.preventDefault();
    let id = e.target.id.value;
    let branch = e.target.branch.value;
    console.log(branch);
    if (!id) {
      setEmptyRegId(true);
      setValidRegId(false);
    } else {
      id = makeId(branch, id);
      console.log(id);
      axios.get("https://surya-bhbj.onrender.com/data/" + id).then((res) => {
        if (
          res.data["2-1"].mssg === "InvalidRegId" ||
          res.data["1-2"].mssg === "InvalidRegId"
        ) {
          setInvalidRegId(true);
          setValidRegId(false);
          // setData({});
        } else {
          setData(res.data);
          console.log(res.data);
          setSubmit(true);
          setValidRegId(true);
        }
      });
    }
  }
  function onChange(e) {
    setRegTerm(e.target.value.toUpperCase());
    if (emptyRegId && regTerm) setEmptyRegId(false);
    if (invalidRegId) setInvalidRegId(false);
  }
  function makeId(branch, id) {
    // let regId = "21U41A0500";
    let regId;

    switch (branch) {
      case "cse":
        regId = "21U41A0500";
        break;
      case "csm":
        regId = "21U41A4200";
        break;
      case "csd":
        regId = "21U41A4400";
        break;
      case "ece":
        regId = "21U41A0400";
        break;
    }
    return regId.substring(0, 10 - id.length) + id;
  }

  return (
    <>
      <div className="page">
        {/* <div className="register-box"> */}
        <form action="POST" className="register" onSubmit={submitHandle}>
          <div className="fields">
            <select name="branch" id="">
              <option value="cse">CSE</option>
              <option value="csm">CSM</option>
              <option value="csd">CSD</option>
              <option value="ece">ECE</option>
            </select>
            <label htmlFor="registerId">Regester Id</label>
            <input
              type="text"
              name="id"
              onChange={onChange}
              value={regTerm}
              autoFocus
            />
            {emptyRegId && <p>Register Id Must Be Required</p>}
            {invalidRegId && <p>Invalid RegId</p>}
          </div>
          <div className="checkbox-bar">
            <label htmlFor="labs">Labs</label>
            <input
              type="checkbox"
              value={labs}
              onClick={() => setLabs((prvLabs) => !prvLabs)}
              name="labs"
            />
          </div>
        </form>
        {/* </div>   */}
        {validRegId && (
          <div className="data">
            <h1>Register No: {data["2-1"].regId}</h1>
            <Result data={data["2-1"]} labs={labs} />
            <Result data={data["1-2"]} labs={labs} />
          </div>
        )}
      </div>
    </>
  );
}
