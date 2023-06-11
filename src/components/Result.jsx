import RegisterContext from "../../context/registerId";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
export default function Result({ data, yr, id }) {
  if (!data?.subjects) {
    return null;
  }
  useEffect(() => {
    // setPoints(calculateResults(data));
  });
  let [points, setPoints] = useState(NaN);

  return (
    <div className="data-tables">
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{ scale: 1 }}
        whileTap={{ scale: 1.07 }}
        transition={{ duration: 0.2, ease: "easeInOut" }} // Transition properties
        className={
          "subjects data " + (id.startsWith("21") ? "data-has-internals" : "")
        }
      >
        <div className="data-head">
          <div className="cell">{yr} Subjects</div>
          <div className="cell">Grade</div>
          {id.startsWith("21") && <div className="cell">Internals</div>}
        </div>
        <div className="data-body">
          {console.log("inner:")}
          {console.log(data)}
          {Object?.entries(data?.subjects)?.map(([subject, result]) => (
            <div className="row" key={subject}>
              <div className="cell">{subject}</div>
              <div
                className={
                  "cell " +
                  (result.grade == "F"
                    ? "failed"
                    : result.grade == "A+" || result.grade === "A"
                    ? "good-marks"
                    : "")
                }
              >
                {result.grade}
              </div>

              {id.startsWith("21") && (
                <div className="cell">{result.internals}</div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
      <div className="points-flex-box">
        <div className="points-div">
          <div className="points">
            {" "}
            <span className="points-title">Points: </span>
            <span className="points-value">
              {data.points?.toFixed(3) || "NaN"}
            </span>
          </div>
        </div>
      </div>
      {
        <motion.div
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1 }}
          whileTap={{ scale: 1.07 }}
          transition={{ duration: 0.2, ease: "easeInOut" }} // Transition properties
          className={
            "labs data " + (id.startsWith("21") ? "data-has-internals" : "")
          }
        >
          <div>
            <div className="data-head">
              <div className="cell">{yr} Labs</div>
              <div className="cell">Grade</div>
              {id.startsWith("21") && <div className="cell">Internals</div>}
            </div>
          </div>
          <div className="data-body">
            {Object.entries(data.labs).map(([subject, result]) => (
              <div className="row" key={subject}>
                <div className="cell">{subject}</div>
                <div className="cell">{result.grade}</div>
                {id.startsWith("21") && (
                  <div className="cell">{result.internals}</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      }
    </div>
  );
}

function calculateResults(data) {
  let credits = 0;
  let points = 0;
  Object.entries(data.subjects).map(([key, value]) => {
    points += getPoints(value.grade) * value.credits;
    credits += +value.credits;
    console.log(value);
  });
  Object.entries(data.labs).map(([key, value]) => {
    points += getPoints(value.grade) * value.credits;
    credits += +value.credits;
  });
  console.log(`Total Points: ${points / credits}`);
  console.log(`Total Credits: ` + credits);
  // return Math.round(points / credits, 3);
  return points / credits;
}

function getPoints(grade) {
  switch (grade) {
    case "A+":
      return 10;
    case "A":
      return 9;
    case "B":
      return 8;
    case "C":
      return 7;
    case "D":
      return 6;
    case "E":
      return 5;
    case "F":
      return 0;
    default:
      return 0;
  }
}
