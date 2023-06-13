import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Graph from "../components/Graph";
export default function GraphsPage({ branch, analysisData }) {
  let [graphData, setGraphData] = useState({});
  let [totalStudents, setTotalStudents] = useState([]);

  useEffect(() => {
    handleBranchChange();
  }, [branch]);

  let bl = {
    "1-1": {},
    "1-2": {},
    "2-1": {},
    "2-2": {},
  };
  let handleBranchChange = async () => {
    let sems = ["1-1", "1-2", "2-1"];
    // console.log(std[sems[0]]);
    let data = analysisData[branch];
    let total = data.filter((item, index) => {
      if (item["1-2"].points) return item;
    });
    setTotalStudents([total.length, data.length]);
    for (let std of data) {
      for (let sem of sems) {
        for (let backlog of std?.[sem].backlogs) {
          bl[sem][backlog] === undefined
            ? (bl[sem][backlog] = 1)
            : bl[sem][backlog]++;
        }
      }
    }
    setGraphData(bl);
    console.log(bl);
    console.log(Object.keys(bl["1-2"]).length > 0);
  };
  return (
    <div>
      {Object.keys(graphData?.["1-1"] || {})?.length > 0 && (
        <Graph data={graphData?.["1-1"]} total={totalStudents[0]} />
      )}
      {Object.keys(graphData?.["1-2"] || {})?.length > 0 && (
        <Graph data={graphData["1-2"]} total={totalStudents[0]} />
      )}

      {Object.keys(graphData?.["2-1"] || {})?.length > 0 && (
        <Graph data={graphData["2-1"]} total={totalStudents[1]} />
      )}
    </div>
  );
}
