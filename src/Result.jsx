export default function Result({ data, labs }) {
  return (
    <div className="data-tables">
      <div className="subjects data">
        <div className="data-head">
          <div className="cell">Subject</div>
          <div className="cell">Grade</div>
          <div className="cell">Internals</div>
        </div>
        <div className="data-body">
          {Object.entries(data.subjects).map(([subject, result]) => (
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
              <div className="cell">{result.internals}</div>
            </div>
          ))}
        </div>
      </div>
      {labs && (
        <div className="data">
          <div>
            <div className="data-head">
              <div className="cell">Labs</div>
              <div className="cell">Grade</div>
              <div className="cell">Internals</div>
            </div>
          </div>
          <div className="data-body">
            {Object.entries(data.labs).map(([subject, result]) => (
              <div className="row" key={subject}>
                <div className="cell">{subject}</div>
                <div className="cell">{result.grade}</div>
                <div className="cell">{result.internals}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
