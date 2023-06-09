import { useContext, useState, useEffect } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
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
  return (
    <div>
      {/* <Link to="/ays">21</Link> */}
      <button onClick={() => onClick("cse")}>cse</button>
      <button onClick={() => onClick("civil")}>civil</button>
      <button onClick={() => onClick("eee")}>eee</button>
      <button onClick={() => onClick("ece")}>ece</button>
      <button onClick={() => onClick("csm")}>csm</button>
      <button onClick={() => onClick("csd")}>csd</button>
      <div>
        {sortBy(aData).map((std, index) => {
          return (
            <>
              <p>{index + 1}</p>
              <p>{std._id}</p>
            </>
          );
        })}
      </div>
    </div>
  );
}

function sortBy(data) {
  return data.sort((std1, std2) => {
    return (std1.total_points - std2.total_points) * -1;
  });
}
