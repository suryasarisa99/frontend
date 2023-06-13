import { motion } from "framer-motion";
import { useContext, useState, useEffect, useRef } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import Graph from "../components/Graph";
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
  let [branch, setBranch] = useState(-1);
  let [searchTerm, setSearchTerm] = useState("");
  let [showOptions, setShowOptions] = useState(false);
  let navigate = useNavigate();
  let [goIcon, setGoIcon] = useState(true);
  let [graphData, setGraphData] = useState([]);
  let [totalStudents, setTotalStudents] = useState([]);
  // let history = useHistory();
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  const swipeThreshold = 50;
  let goRef = useRef(null);
  let location = useLocation();
  useEffect(() => {
    if (aysYear === "") {
      console.log("No ays year");
      navigate("/ays");
    }

    document.addEventListener("click", closeFilter);
  }, []);
  useEffect(() => {
    console.log("welcome #$#$#$#%#$##$#$");
    let id = window.location.hash.substring(1);
    blink(id);
  }, [location]);
  let bl = {
    "1-1": {},
    "1-2": {},
    "2-1": {},
    "2-2": {},
  };
  function handleTouchStart(e) {
    // goRef.current.style.backgroundColor = "red";
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
  function handleTouchMove(e) {
    // goRef.current.style.backgroundColor = "blue";
    e.preventDefault();
  }
  function handleTouchEnd(e) {
    // goRef.current.style.backgroundColor = "red";
    // touchEndX = e.touches[0].clientX;
    // touchEndY = e.touches[0].clientY;
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (
      Math.abs(deltaX) > swipeThreshold ||
      Math.abs(deltaY) > swipeThreshold
    ) {
      if (Math.abs(deltaX) > swipeThreshold) {
        if (deltaX > 0) {
          // goRef.current.style.backgroundColor = "green";
          navigate("/ays");
        } else {
          // goRef.current.style.backgroundColor = "pink";
          navigate("/");
        }
      } else {
        if (deltaY < 0) {
          // goRef.current.style.backgroundColor = "violet";

          if (window.location.hash.trim()) navigate(-1);
        } else {
          navigate(1);
          // goRef.current.style.backgroundColor = "blue";
          console.log("/  swip right");
        }
      }
    }
  }
  const closeFilter = (event) => {
    const targetElement = event.target;
    const options = document.querySelector(".options");
    const buttons = document.querySelectorAll(".options li .arrow-icon");
    const sort = document.querySelector(".sort");
    // console.log(buttons[0]?.parentNode);
    // console.log(buttons[0].isEqualNode(targetElement));
    // console.log(buttons[1]);
    const isClickedInsideOptions = options?.contains(targetElement);
    const isClickedOnSort = sort?.contains(targetElement);
    // console.log(targetElement.tagName);
    // console.log(targetElement);
    if (targetElement.tagName == "svg" || targetElement.tagName === "path")
      return null;
    if (isClickedOnSort) return null;
    let buttonClicked = false;
    buttons.forEach((button) => {
      if (
        button.parentnode === targetElement ||
        button.parentNode.contains(targetElement) ||
        targetElement.parentNode === button ||
        button === targetElement
      ) {
        console.log(true);
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
    setGoIcon(false);
    await new Promise((resolve, reject) => setTimeout(resolve, 50));
    setGoIcon(true);
    setAysBranch(branch);
    setAData(analysisData[index]);
    let s = sortBy(analysisData[index], sortOn, sortType, sortOrder);
    console.log(s);
    setSortedData(s);
    // setAysBranch(index);
    setBranch(index);

    let sems = ["1-1", "1-2", "2-1"];
    // console.log(std[sems[0]]);
    let total = s.filter((item, index) => {
      if (item["1-2"].points) return item;
    });
    setTotalStudents([total.length, s.length]);
    for (let std of s) {
      for (let sem of sems) {
        for (let backlog of std[sem].backlogs) {
          bl[sem][backlog] === undefined
            ? (bl[sem][backlog] = 1)
            : bl[sem][backlog]++;
        }
      }
    }
    setGraphData(bl);
    console.log(bl);

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
    setGoIcon(false);
    await new Promise((resolve, reject) => setTimeout(resolve, 250));
    setGoIcon(true);
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
    setGoIcon(false);
    await new Promise((resolve, reject) => setTimeout(resolve, 250));
    setGoIcon(true);
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

  async function go(e) {
    e.preventDefault();
    // let goInput = document.querySelector(".go-input");
    let value = e.target.value;
    setSearchTerm(value);

    if (
      (value.length === 3 && value.startsWith("n")) ||
      (value.length === 2 && !value.startsWith("n"))
    ) {
      let id;
      let goLink = document.querySelector(".go-link");
      if (value.startsWith("n") && value.length === 3) {
        let index = value.substr(1) - 1;
        console.log(index);
        id = sortedData[index]._id;
      } else if (value.length === 2) {
        id = getId();
        id += value.toUpperCase();
      }
      console.log(id);
      // blink(id);
      goLink.setAttribute("href", "#" + id);
      goLink.click();
      await new Promise((resolve, reject) => setTimeout(resolve, 100));
      window.scrollTo({ top: window.scrollY - 60 });
      setSearchTerm("");
    }

    // console.log(value);
  }
  async function blink(id) {
    let li = document.getElementById(id);
    li.classList.add("go-selected");
    await new Promise((res, rej) => setTimeout(res, 1000));
    li.classList.remove("go-selected");
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
  function getId() {
    let id = aysYear + "U41A";
    if (branch === 0) id += "05";
    else if (branch === 1) id += "01";
    else if (branch === 2) id += "02";
    else if (branch === 3) id += "04";
    else if (branch === 4) id += "44";
    else if (branch === 5) id += "42";
    return id;
  }

  let options = ["Points", "Backlogs"];
  // let SelectedOption = 0;

  return (
    <div>
      {graphData["1-1"] != null && (
        <div>
          <Graph data={graphData["1-1"]} total={totalStudents[0]} />
          <Graph data={graphData["1-2"]} total={totalStudents[0]} />
          <Graph data={graphData["2-1"]} total={totalStudents[1]} />
        </div>
      )}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {goIcon && (
          <motion.input
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: sortedData.length > 0 ? 1 : 0,
              y: sortedData.length > 0 ? 0 : -50,
            }}
            transition={{ duration: 0.5, delay: 12 * 0.05 }}
            ref={goRef}
            onChange={go}
            value={searchTerm}
            type="text"
            className="go-input"
          />
        )}
      </div>
      <a href="#" className="go-link">
        hi
      </a>

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
                        Sort By {item}{" "}
                        {/* <div ref={iconORef} className="icon-overlay"> */}
                        <div className="arrow-icon">
                          <FaAngleUp />
                        </div>
                        {/* </div> */}
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

                return (
                  <li
                    // initial={{ height: 0 }}
                    // animate={{ height: 50 }}
                    onClick={(e) => openSubMenu(e, index)}
                  >
                    <div>
                      Sort By {item}{" "}
                      <div className="arrow-icon">
                        <FaAngleDown />
                      </div>
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
              key={std._id}
              id={std._id}
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
