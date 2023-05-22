import RegisterContext from "../../context/registerId";
import { useContext } from "react";

export default function Result({ data, yr, id }) {
  if (!data) return null;

  return (
    <div className="data-tables">
      <div
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
          {Object?.entries(data.subjects).map(([subject, result]) => (
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
      </div>
      {
        <div
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
        </div>
      }
    </div>
  );
}
