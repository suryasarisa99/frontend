import { useContext, useState } from "react";
import Result from "./Result";
import "../styles/index.css";
import Navbar from "./Navbar";
import RegisterContext from "../context/registerId";

export default function App() {
  let [labs, setLabs] = useState(true);
  let { validRegId, data } = useContext(RegisterContext);

  return (
    <>
      <Navbar />
      <div className="page">
        {validRegId && (
          <div className="data2">
            <h1 className="reg-id">Register No: {data.regId}</h1>
            <Result data={data["2-1"]} labs={labs} />
            <Result data={data["1-2"]} labs={labs} />
          </div>
        )}
      </div>
    </>
  );
}
