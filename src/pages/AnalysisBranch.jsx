import { useContext, useState, useEffect } from "react";
import RegisterContext from "../../context/registerId";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
// import { FaAngleDown } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
export default function AnalysisId({ params }) {
  let { aysBranch, setAysBranch, aysYear, server, analysisData } =
    useContext(RegisterContext);
  let [aData, setAData] = useState([]);
  let [selectedMenu, setSelectedMenu] = useState(-1);
  let [selectedSubMenu, setSelectedSubMenu] = useState(-1);
  let [sortedData, setSortedData] = useState([]);
  let [branchIndex, setBranchIndex] = useState(-1);
  let navigate = useNavigate();
  useEffect(() => {
    if (aysYear === "") {
      console.log("No ays year");
      navigate("/ays");
    }
  });

  let onClick = (branch, index) => {
    // console.log(analysisData);
    setAysBranch(branch);
    setAData(analysisData[index]);
    let s = sortBy(analysisData[index]);
    console.log(s);
    setSortedData(s);
    setBranchIndex(index);
    // navigate("/");
    // let url = `${server}/ays/${aysYear + branch}`;
    // console.log(url);
    // axios.get(url).then((res) => {
    //   setAData(res.data);
    //   setSortedData(sortBy(res.data));
    //   console.log(res.data);
    // });
  };
  function openOptions() {
    console.log("open options");
    let options = document.querySelector(".options");
    options.classList.remove("hidden-options");
  }
  function closeOptions() {
    console.log("close options");
    let options = document.querySelector(".options");
    options.classList.add("hidden-options");
  }
  function openSubMenu(e, index) {
    console.log("opened opened menu");
    setSelectedMenu(index);
  }
  function closeSubMenu(e, index) {
    console.log("closed opened menu");
    setSelectedMenu(-1);
  }
  function selectSubMenu(e, index) {
    closeOptions();
    let sortType;
    let sortOn;
    e.stopPropagation();
    if (index == 99) sortOn = "_id";
    if (selectedMenu == 0) sortOn = "points";
    if (selectedMenu == 1) sortType = "backlogs_cnt";
    if (selectedMenu == 2) sortType = "_id";

    if (index == 0) sortOn = "total";
    else if (index === 1) sortOn = "1-1";
    else if (index === 2) sortOn = "1-2";
    else if (index === 3) sortOn = "2-1";
    let x = sortBy(aData, sortOn, sortType);
    console.log(x);
    setSortedData(x);
    setSelectedSubMenu(index);
    setSelectedMenu(-1);
  }

  function fun1() {}

  let options = ["Points", "Backlogs"];
  // let SelectedOption = 0;
  return (
    <div>
      <Navbar />

      <div className="filter">
        <div className="sort">
          <div onClick={openOptions}>
            <p>Sort By</p>
            <ul className="options hidden-options">
              {options.map((item, index) => {
                if (index === selectedMenu)
                  return (
                    <li>
                      <div onClick={(e) => closeSubMenu(e, index)}>
                        Sort By {item} <FaAngleUp className="icon" />
                      </div>
                      <ol className="sub-menu">
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
                      </ol>
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
                  <li onClick={(e) => openSubMenu(e, index)}>
                    <div>
                      Sort By {item}{" "}
                      <div className="icon">
                        <FaAngleDown />
                      </div>
                    </div>
                  </li>
                );
              })}
              <ol className="sub-menu hidden-sub-menu"></ol>
            </ul>
          </div>
        </div>
        <div className="sort-order">Ascending</div>
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
            <div className="row">
              <p className="rank">{index + 1}</p>
              <p className="id">{std._id}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function sortBy(data, sortOn, sortType) {
  console.log(sortOn, sortType);
  if (!sortOn) {
    console.log("sorted on: points");
    return data.sort((std1, std2) => {
      return (std1.total_points - std2.total_points) * -1;
    });
  }
  // else if (sortOn == "_id") {
  //   console.log(`sorted on: _id`);
  //   return data;
  // return data.sort((std1, std2) => {
  //   return (std1["_id"] - std2["_id"]) * -1;
  // });
  // }
  else if (sortOn == "total") {
    return data.sort((std1, std2) => {
      return (std1["total_" + sortType] - std2["total_" + sortType]) * -1;
    });
  } else {
    return data.sort((std1, std2) => {
      return (std1[sortOn][sortType] - std2[sortOn][sortType]) * -1;
    });
  }
}
