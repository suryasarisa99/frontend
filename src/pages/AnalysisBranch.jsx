import { motion } from "framer-motion";
import { useContext, useState, useEffect } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
// import { FaAngleDown } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { render } from "react-dom";
export default function AnalysisId({ params }) {
  let { aysBranch, setAysBranch, aysYear, server, analysisData } =
    useContext(RegisterContext);
  let [aData, setAData] = useState([]);
  let [selectedMenu, setSelectedMenu] = useState(-1);
  let [selectedSubMenu, setSelectedSubMenu] = useState(-1);
  let [sortedData, setSortedData] = useState([]);
  let [sortOrder, setSortOrder] = useState(-1);
  let [sortOn, setSortOn] = useState();
  let [sortType, setSortType] = useState();
  let [showOptions, setShowOptions] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (aysYear === "") {
      console.log("No ays year");
      navigate("/ays");
    }

    document.addEventListener("click", closeFilter);
  });

  const closeFilter = (event) => {
    const targetElement = event.target;
    const options = document.querySelector(".options");
    const buttons = document.querySelectorAll(".options li .icon");
    const sort = document.querySelector(".sort");

    const isClickedInsideOptions = options.contains(targetElement);
    const isClickedOnSort = sort.contains(targetElement);
    // console.log(buttons[0].contains(targetElement));
    // console.log(targetElement.parentNode.parentNode);
    // console.log(buttons[0].parentNode);
    // console.log(buttons[0].contains(targetElement));
    if (isClickedOnSort) return null;
    let buttonClicked = false;
    buttons.forEach((button) => {
      if (
        button === targetElement ||
        button.contains(targetElement.parentNode)
      ) {
        buttonClicked = true;
        return;
      }
    });

    // console.log("button clicked", buttonClicked);
    // for (let button of buttons) if (button.contains(targetElement)) return;
    if (!isClickedInsideOptions && !buttonClicked) {
      // console.log("Inside Block");
      closeOptions();
    }
  };

  let onClick = async (branch, index) => {
    setSortedData([]);
    await new Promise((resolve, reject) => setTimeout(resolve, 50));
    setAysBranch(branch);
    setAData(analysisData[index]);
    let s = sortBy(analysisData[index], sortOn, sortType, sortOrder);
    console.log(s);
    setSortedData(s);
    // navigate("/");
    // let url = `${server}/ays/${aysYear + branch}`;
    // console.log(url);
    // axios.get(url).then((res) => {
    //   setAData(res.data);
    //   setSortedData(sortBy(res.data));
    //   console.log(res.data);
    // });
  };
  async function toggleSortOrder() {
    setSortedData([]);
    await new Promise((resolve, reject) => setTimeout(resolve, 250));
    setSortOrder((prvOrder) => {
      let order = prvOrder == -1 ? 1 : -1;
      setSortedData(sortBy(aData, sortOn, sortType, order));
      return order;
    });
  }
  function openOptions(e) {
    // console.log("open options");
    let options = document.querySelector(".options");
    // options.classList.remove("hidden-options");
    setShowOptions(true);
    e.stopPropagation();
  }
  function closeOptions() {
    // console.log("close options");
    let options = document.querySelector(".options");
    // options.classList.add("hidden-options");
    setShowOptions(false);
  }
  function openSubMenu(e, index) {
    // console.log("opened opened menu");
    setSelectedMenu(index);
  }
  function closeSubMenu(e, index) {
    // console.log("closed opened menu");
    setSelectedMenu(-1);
  }
  async function selectSubMenu(e, index) {
    setSortedData([]);
    await new Promise((resolve, reject) => setTimeout(resolve, 250));
    closeOptions();
    let sort_type;
    let sort_on;
    e.stopPropagation();
    if (selectedMenu == 0) sort_type = "points";
    if (selectedMenu == 1) sort_type = "backlogs_cnt";
    setSortType(sort_type);

    if (index == 0) sort_on = "total";
    else if (index === 1) sort_on = "1-1";
    else if (index === 2) sort_on = "1-2";
    else if (index === 3) sort_on = "2-1";
    setSortOn(sort_on);
    let x = sortBy(aData, sort_on, sort_type, sortOrder);
    console.log(x);
    setSortedData(x);
    setSelectedSubMenu(index);
    setSelectedMenu(-1);
  }

  function sortBy(data, sortOn, sortType, order) {
    console.log(sortOn, sortType, sortOrder);
    if (!sortOn) {
      console.log("sorted on: points");
      return data.sort((std1, std2) => {
        return (std1.total_points - std2.total_points) * order;
      });
    } else if (sortOn == "total") {
      return data.sort((std1, std2) => {
        return (std1["total_" + sortType] - std2["total_" + sortType]) * order;
      });
    } else {
      return data.sort((std1, std2) => {
        return (std1[sortOn][sortType] - std2[sortOn][sortType]) * order;
      });
    }
  }

  let options = ["Points", "Backlogs"];
  // let SelectedOption = 0;

  return (
    <div>
      <div className="filter">
        <div className="sort">
          <div onClick={openOptions}>
            <p>
              Sort By: {sortOn}-{sortType}
            </p>
          </div>
          {showOptions && (
            <motion.ul
              // 85 15 15 115
              // initial={{ height: 0 }}
              // animate={{ height: selectedMenu != -1 ? 300 : 100 }}
              className="options hidden-options"
            >
              {options.map((item, index) => {
                if (index === selectedMenu)
                  return (
                    <li>
                      <div
                        // initial={{ height: 0 }}
                        // animate={{ height: 50 }}
                        onClick={(e) => closeSubMenu(e, index)}
                      >
                        Sort By {item} <FaAngleUp className="icon" />
                      </div>
                      <motion.ol
                        initial={{ height: 0, x: -20 }}
                        animate={{
                          height: selectedMenu != -1 ? 180 : 0,
                          x: 20,
                        }}
                        className="sub-menu"
                      >
                        <li>
                          <div onClick={(e) => selectSubMenu(e, 0)}>
                            On Total {options[selectedMenu]}
                          </div>
                        </li>
                        <li>
                          <div onClick={(e) => selectSubMenu(e, 1)}>
                            On Sem 1-1 {options[selectedMenu]}
                          </div>
                        </li>
                        <li>
                          <div onClick={(e) => selectSubMenu(e, 2)}>
                            On Sem 1-2 {options[selectedMenu]}
                          </div>
                        </li>
                        <li>
                          <div onClick={(e) => selectSubMenu(e, 3)}>
                            On Sem 2-1 {options[selectedMenu]}
                          </div>
                        </li>
                      </motion.ol>
                    </li>
                  );
                if (index === 2) {
                  return (
                    <li onClick={(e) => selectSubMenu(e, 99)}>
                      <div>
                        Sort By {item} <div className="icon"></div>
                      </div>
                    </li>
                  );
                }
                return (
                  <li
                    // initial={{ height: 0 }}
                    // animate={{ height: 50 }}
                    onClick={(e) => openSubMenu(e, index)}
                  >
                    <div>
                      Sort By {item}{" "}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 50 }}
                        className="icon"
                      >
                        <FaAngleDown />
                      </motion.div>
                    </div>
                  </li>
                );
              })}
              <ol className="sub-menu hidden-sub-menu"></ol>
            </motion.ul>
          )}
        </div>
        <div className="sort-order" onClick={toggleSortOrder}>
          {sortOrder == -1 ? "Highest" : "Lowest"}
        </div>
      </div>

      <div className="branches">
        <button onClick={() => onClick("cse", 0)}>cse</button>
        <button onClick={() => onClick("civil", 1)}>civil</button>
        <button onClick={() => onClick("eee", 2)}>eee</button>
        <button onClick={() => onClick("ece", 3)}>ece</button>
        <button onClick={() => onClick("csm", 4)}>csm</button>
        <button onClick={() => onClick("csd", 5)}>csd</button>
      </div>
      <div className="ranks">
        {sortedData.map((std, index) => {
          return (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index < 30 ? index * 0.05 : 0,
              }}
              className="row"
            >
              <p className="rank">{index + 1}</p>
              <p className="id">{std._id}</p>
              {sortOn === "total" ? (
                <p className="result">
                  {sortType != "points"
                    ? std["total_" + sortType]
                    : std["total_" + sortType]?.toFixed(3)}
                </p>
              ) : sortOn === undefined ? (
                <p className="result">{std.total_points?.toFixed(3)}</p>
              ) : (
                <p className="result">
                  {sortType != "points"
                    ? std[sortOn][sortType]
                    : std[sortOn][sortType]?.toFixed(3)}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
