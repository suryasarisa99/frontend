import { useContext } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function AnalysisId({ params }) {
  let { aysYear, setAysYear } = useContext(RegisterContext);
  //   let { aysBranch, setAysBranch } = useContext(RegisterContext);
  let navigate = useNavigate();
  let onClick = (year) => {
    setAysYear(year);
    navigate("/ays-branch");
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
