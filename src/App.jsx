import axios from "axios";
import "../styles/index.css";
import { useContext, useState, useEffect } from "react";
import { GoCloudDownload } from "react-icons/go";
import RegisterContext from "../context/registerId";
import Result from "./components/Result";
import Navbar from "./components/Navbar";
import StartPage from "./components/StartPage";
import SidePannel from "./components/SidePannel";
import UpdateName from "./boxes/UpdateName";
import LockBox from "./boxes/LockBox";
import UnlockBox from "./boxes/UnlockBox";
import UpdatePassword from "./boxes/UpdatePassword";
import UpdatePhoto from "./boxes/UpdatePhoto";
import circleTemp from "./asserts/circle.png";
import Theme from "./pages/Theme";
import userProffile from "./asserts/user_profile.png";
// import profileTemplate from "./asserts/profile-template.jpg";
export default function App() {
  let [labs, setLabs] = useState(true);
  let {
    validRegId,
    data,
    server,
    name,
    setName,
    updateName,
    sidePannel,
    setSidePannel,
    lockBox,
    isLocked,
    updatePassword,
    updatePhoto,
    imgUrl,
    themePage,
    setImgLoaded,
    setValidRegId,
    openUpdateName,
    setData,
    setLogoColor,
    handleDownload,
    setColorTheme,
    setLoadedThemes,
    applyCustomThemes,
  } = useContext(RegisterContext);
  useEffect(() => {
    axios.get(`${server}/start`).then((res) => console.log(res));

    window.addEventListener("focus", handleOnFocus);
    handleLoadThemes();
    // setImgUrl(logo);
    setData(mydata);
    setValidRegId(true);
    setName(mydata.name);
  }, []);

  let handleOnFocus = () => {
    axios.get(`${server}/start`).then((_) => console.log("Focused"));
  };

  let updateBtn = (
    <button className="update-btn" onClick={openUpdateName}>
      update
    </button>
  );

  function handleLoadThemes() {
    let color = localStorage.getItem("theme");
    let customThemes = JSON.parse(localStorage.getItem("custom-themes"));
    if (customThemes) setLoadedThemes(customThemes);

    console.log("color-theme: ", color);
    if (color?.length === 1) {
      applyCustomThemes(customThemes[+color], true);
      setColorTheme(+color);
    } else {
      setColorTheme(color);
      if (color) document.documentElement.classList.add(`${color}-theme`);
      else setColorTheme("red");
      setLogoColor(color);
    }
  }

  function toggleSidePanel(e) {
    setSidePannel((prevSidePannel) => !prevSidePannel);
    e.stopPropagation();

    // document.getElementById("overlay").style.display = "block";
  }

  return (
    <>
      <Navbar toggleSidePanel={toggleSidePanel} />
      {sidePannel && <SidePannel />}
      {lockBox && <LockBox />}
      {isLocked && <UnlockBox />}
      {updatePassword && <UpdatePassword />}
      {updatePhoto && <UpdatePhoto></UpdatePhoto>}
      {themePage && <Theme />}
      {updateName && <UpdateName />}

      {!themePage && !isLocked && (
        <div className="page">
          {validRegId && !isLocked ? (
            <div className="data2">
              <div className="img-box">
                {data.photo && (
                  <img
                    src={imgUrl || userProffile}
                    alt=""
                    className="profile-photo"
                    // onLoad={handleImgLoad || userProffile}
                    // style={{ backgroundColor: "black" }}
                  />
                )}
              </div>
              <div className="info">
                <h1 className="reg-id">
                  Name:{" "}
                  {name?.fname
                    ? `${name?.fname} ${name?.sname} ${name?.lname}`
                    : updateBtn}
                </h1>
                <h1 className="reg-id">Register No: {data._id}</h1>
              </div>
              <div className="info"></div>
              <Result data={data["2-1"]} yr={"2-1"} labs={labs} />
              <Result data={data["1-2"]} yr="1-2" labs={labs} />
              {/* <div className="download-box"> */}
              <GoCloudDownload
                // fill="red"
                id="download"
                onClick={() => {
                  handleDownload(data);
                }}
              />
              {/* </div> */}
            </div>
          ) : (
            <StartPage />
          )}
        </div>
      )}

      {/* <LockBox /> */}
    </>
  );
}

let mydata = {
  name: {
    fname: "Jaya",
    sname: "Surya",
    lname: "Sarisa",
  },
  "1-2": {
    subjects: {
      "MATHEMATICS-II": {
        grade: "A+",
        internals: "26",
      },
      "APPLIED CHEMISTRY": {
        grade: "A+",
        internals: "24",
      },
      "COMPUTER ORGANIZATION": {
        grade: "D",
        internals: "26",
      },
      "DATA STRUCTURES": {
        grade: "A",
        internals: "24",
      },
      "PYTHON PROGRAMMING": {
        grade: "A",
        internals: "27",
      },
    },
    labs: {
      "APPLIED CHEMISTRY LABORATORY": {
        grade: "A",
        internals: "12",
      },
      "DATA STRUCTURES LABORATORY": {
        grade: "A+",
        internals: "15",
      },
      "PYTHON PROGRAMMING LABORATORY": {
        grade: "A+",
        internals: "15",
      },
    },
  },
  "2-1": {
    subjects: {
      "MATHEMATICS-III": {
        grade: "D",
        internals: "27",
      },
      "OBJECT ORIENTED PROGRAMMING THROUGH C++": {
        grade: "A",
        internals: "29",
      },
      "OPERATING SYSTEMS": {
        grade: "C",
        internals: "26",
      },
      "SOFTWARE ENGINEERING": {
        grade: "C",
        internals: "29",
      },
      "MATHEMATICAL FOUNDATIONS OF COMPUTER SCI": {
        grade: "D",
        internals: "29",
      },
    },
    labs: {
      "COMMUNITY SERVICES PROJECT": {
        grade: "A+",
        internals: "0",
      },
      "OBJECT ORIENTED PROGRAMMING THROUGH C++": {
        grade: "A+",
        internals: "15",
      },
      "OPERATING SYSTEMS LAB": {
        grade: "A+",
        internals: "15",
      },
      "SOFTWARE ENGINEERING LAB": {
        grade: "A+",
        internals: "15",
      },
      "APPLICATIONS OF PYTHON-NUMPY(SKILL ORIEN": {
        grade: "A+",
        internals: "0",
      },
    },
  },
  photo: "dummyText",
  _id: "21U41A0546",
};
