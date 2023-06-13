import { motion } from "framer-motion";
import { useContext, useState, useEffect, useRef } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate, Link, useLocation } from "react-router-dom";

import GraphsPage from "./GraphsPage";
import MarksPage from "./MarksPage";

export default function AnalysisId({ params }) {
  let { aysBranch, setAysBranch, aysYear, server, analysisData } =
    useContext(RegisterContext);
  let navigate = useNavigate();
  let [branch, setBranch] = useState(-1);
  let [page, setPage] = useState(true);
  useEffect(() => {
    if (aysYear === "") {
      navigate("/ays"); // If No year Go to Year Page
    }
  }, []);

  const changeBranch = (index) => {
    let buttons = document.querySelectorAll(".branches button");
    buttons[branch]?.classList.remove("selected");
    setBranch(index);
    buttons[index]?.classList.add("selected");
  };
  const handleChangePage = (e, page) => {
    setPage(page);
    let pages = document.querySelectorAll(".ays-page");
    if (page) {
      // for Graph

      pages[0].classList.add("selected");
      pages[1].classList.remove("selected");
    } else {
      pages[1].classList.add("selected");
      pages[0].classList.remove("selected");
    }
  };

  return (
    <div>
      <div className="ays-page-bar">
        <button
          className="ays-page graph selected"
          onClick={(e) => handleChangePage(e, true)}
        >
          Graphs
        </button>
        <button
          className="ays-page marks"
          onClick={(e) => handleChangePage(e, false)}
        >
          Marks
        </button>
      </div>
      <div className="branches">
        <button onClick={() => changeBranch(0)}>cse</button>
        <button onClick={() => changeBranch(1)}>civil</button>
        <button onClick={() => changeBranch(2)}>eee</button>
        <button onClick={() => changeBranch(3)}>ece</button>
        <button onClick={() => changeBranch(4)}>csm</button>
        <button onClick={() => changeBranch(5)}>csd</button>
      </div>
      {page ? (
        <GraphsPage branch={branch} analysisData={analysisData} />
      ) : (
        <MarksPage
          branch={branch}
          analysisData={analysisData}
          aysYear={aysYear}
        />
      )}
    </div>
  );
}
