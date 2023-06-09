import { useContext } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate } from "react-router-dom";
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
      <button onClick={() => onClick(21)}>21</button>
      <button onClick={() => onClick(22)}>22</button>
    </div>
  );
}
