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
              {/* <div className={"cell " + result.grade == "F" ? "failed" : ""}> */}
              <div className="cell"> {result.grade}</div>
              <div className="cell">{result.internals}</div>
            </div>
          ))}
        </div>
      </div>
      {labs && (
        <table className="labs">
          <divead>
            <tr>
              <div>Labs</div>
              <div>Grade</div>
              <div>Internals</div>
            </tr>
          </divead>
          <tbody>
            {Object.entries(data.labs).map(([subject, result]) => (
              <tr key={subject}>
                <div>{subject}</div>
                <div>{result.grade}</div>
                <div>{result.internals}</div>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
