import { useContext, useState, useEffect } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AnalysisId({ params }) {
  let { aysBranch, setAysBranch, aysYear, server } =
    useContext(RegisterContext);
  let [aData, setAData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    if (aysYear === "") {
      console.log("No ays year");
      navigate("/ays");
    }
  });

  let onClick = (branch) => {
    setAysBranch(branch);
    // navigate("/");
    let url = `${server}/ays/${aysYear + branch}`;
    console.log(url);
    axios.get(url).then((res) => {
      setAData(res.data);
      console.log(res.data);
    });
  };
  function openOptions() {
    console.log("opened");
    let options = document.querySelector(".options");
    options.classList.toggle("hidden-options");
  }
  return (
    <div>
      <Navbar />

      <div className="select" onClick={openOptions}>
        <p>sort by</p>
        <ul className="options hidden-options">
          <li>Sort By Points</li>
          <li>Sort By Backlogs</li>
          <li>Sort By RollNo</li>
          <li>sort By Something</li>
        </ul>
      </div>

      {/* <select name="Sort By" id="">
        <option value="hi">Sort By</option>
        <option value="hi">
          <select name="" id="">
            <option value="">wow</option>
            <option value="">wow</option>
          </select>
        </option>
        <option value="hi">hi</option>
        <option value="hi">hi</option>
      </select> */}
      {/* <Link to="/ays">21</Link> */}
      <div className="branches">
        <button onClick={() => onClick("cse")}>cse</button>
        <button onClick={() => onClick("civil")}>civil</button>
        <button onClick={() => onClick("eee")}>eee</button>
        <button onClick={() => onClick("ece")}>ece</button>
        <button onClick={() => onClick("csm")}>csm</button>
        <button onClick={() => onClick("csd")}>csd</button>
      </div>
      <div className="a"></div>
      {sortBy(aData).map((std, index) => {
        return (
          <div className="adfdf">
            <p>{index + 1}</p>
            <p>{std._id}</p>
          </div>
        );
      })}
    </div>
  );
}

function sortBy(data) {
  return data.sort((std1, std2) => {
    return (std1.total_points - std2.total_points) * -1;
  });
}
