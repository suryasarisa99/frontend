import { useContext } from "react";
import axios from "axios";
import RegisterContext from "../../context/registerId";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function AnalysisId({ params }) {
  let { aysYear, setAysYear, server, setAnalysisData } =
    useContext(RegisterContext);
  //   let { aysBranch, setAysBranch } = useContext(RegisterContext);
  let navigate = useNavigate();

  let onClick = async (year) => {
    setAysYear(year);
    navigate("/ays-branch");
    let branches = ["cse", "civil", "eee", "ece", "csd", "csm"];
    let responses = branches.map(async (branch, index) => {
      return (await axios.get(`${server}/ays/${year + branch}`)).data;
    });
    let data = await Promise.all(responses);
    setAnalysisData(data);
    console.log(data);
  };
  return (
    <div>
      <Navbar />
      <div className="years">
        <button onClick={() => onClick(21)}>2021 - 2025</button>
        <button onClick={() => onClick(22)}>2022 - 2026</button>
      </div>
    </div>
  );
}
