import "../styles/index.scss";
import "../styles/colors.scss";
import { motion } from "framer-motion";
import {
  useContext,
  useState,
  useImperativeHandle,
  useEffect,
  forwardRef,
} from "react";
import { GoCloudDownload } from "react-icons/go";
import RegisterContext from "../context/registerId";
import Result from "./components/Result";
import StartPage from "./components/StartPage";

import userProffile from "./asserts/user_profile.png";
const App = forwardRef((props, ref) => {
  let {
    validRegId,
    data,
    name,
    isLocked,
    imgUrl,
    openUpdateName,
    handleDownload,
  } = useContext(RegisterContext);
  let updateBtn = (
    <button className="update-btn" onClick={openUpdateName}>
      update
    </button>
  );

  return (
    <div className="page" ref={ref}>
      {!isLocked && (
        <div className="page1">
          {validRegId ? (
            <div className="data2">
              <motion.div
                // initial={{ rotate: -180 }}
                whileHover={{ rotate: 360, scale: 0.6, borderRadius: 50 }}
                // whileInView={{ scale: 1, rotate: 180 }}
                className="img-box"
              >
                {data.photo && (
                  <img
                    src={imgUrl || userProffile}
                    alt=""
                    className="profile-photo"
                  />
                )}
              </motion.div>
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
              <Result data={data["2-1"]} yr="2-1" id={data._id} />
              <Result data={data["1-2"]} yr="1-2" id={data._id} />
              <Result data={data?.["1-1"]} yr="1-1" id={data._id} />
              <GoCloudDownload
                id="download"
                onClick={() => {
                  handleDownload(data);
                }}
              />
            </div>
          ) : (
            <StartPage />
          )}
        </div>
      )}
    </div>
  );
});

export default App;
