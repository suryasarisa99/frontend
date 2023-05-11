import axios from "axios";
import { useState } from "react";
import Result from "./Result";
import "../styles/index.scss";
import Navbar from "./Navbar";

export default function App() {
  let [data, setData] = useState({});

  let [emptyRegId, setEmptyRegId] = useState(false);
  let [invalidRegId, setInvalidRegId] = useState(false);
  let [validRegId, setValidRegId] = useState(false);
  let [submit, setSubmit] = useState(false);
  let [labs, setLabs] = useState(false);
  let [server, setServer] = useState("get-std-res.vercel.app");
  function submitHandle(e) {
    e.preventDefault();
    let id = e.target.id.value;
    let branch = e.target.branch.value;
    console.log(branch);
    if (!id) {
      setEmptyRegId(true);
      setValidRegId(false);
    } else {
      id = makeId2(id);
      console.log(id);
      axios.get(`https://${server}/${id}`).then((res) => {
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

  function toogleServer() {
    if (server === "backend-39in.vercel.app")
      setServer("get-std-res.vercel.app");
    else setServer("backend-39in.vercel.app");
  }

  function onChange(e) {
    setRegTerm(e.target.value.toUpperCase());
    if (emptyRegId && regTerm) setEmptyRegId(false);
    if (invalidRegId) setInvalidRegId(false);
  }

  function makeId(id) {
    let regId = "21U41A0500";
    let branch = id.substring(6, 8);
    if (id.length === 3) id = "0" + id;
    return regId.substring(0, 10 - id.length) + id;
  }

  return (
    <>
      <Navbar onChange={onChange} />
      <div className="page">
        {/* <form action="POST" className="register" onSubmit={submitHandle}>
          <div className="fields">
            <div className="row">
              <select name="branch" id="">
                <option value="cse">CSE</option>
                <option value="csm">CSM</option>
                <option value="csd">CSD</option>
                <option value="ece">ECE</option>
              </select>
              <input
                type="text"
                name="id"
                onChange={onChange}
                value={regTerm}
                placeholder="Register Id"
                autoFocus
              />
            </div>
            {emptyRegId && <p>Register Id Must Be Required</p>}
            {invalidRegId && <p>Invalid RegId</p>}
          </div>
          <div className="row">
            <div className="checkbox-bar">
              <label htmlFor="labs">Labs</label>
              <input
                type="checkbox"
                value={labs}
                onClick={() => setLabs((prvLabs) => !prvLabs)}
                name="labs"
              />
            </div>
            <button
              type="button"
              className="server-change"
              onClick={toogleServer}
            >
              Change Server
            </button>
          </div>
        </form> */}

        {validRegId && (
          <div className="data2">
            <h1>Register No: {data.regId}</h1>
            <Result data={data["2-1"]} labs={labs} />
            <Result data={data["1-2"]} labs={labs} />
          </div>
        )}
      </div>
    </>
  );
}
