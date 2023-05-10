export default function Result({ data, labs }) {
  return (
    <div className="data-tables">
      <table className="subjects">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Grade</th>
            <th>Internals</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data.subjects).map(([subject, result]) => (
            <tr key={subject}>
              <td>{subject}</td>
              <td className={result.grade == "F" ? "failed" : ""}>
                {result.grade}
              </td>
              <td>{result.internals}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {labs && (
        <table className="labs">
          <thead>
            <tr>
              <th>Labs</th>
              <th>Grade</th>
              <th>Internals</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.labs).map(([subject, result]) => (
              <tr key={subject}>
                <td>{subject}</td>
                <td>{result.grade}</td>
                <td>{result.internals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
