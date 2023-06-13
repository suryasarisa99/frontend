import { motion } from "framer-motion";
export default function Graph({ data, total }) {
  //   let total = 10;

  let max = 0;
  for (let key in data) {
    if (max < data[key]) max = data[key];
  }
  //   let total = 150;
  console.log("max: " + max);
  console.log("total");

  let colors = [
    "rgb(230, 84, 84)",
    "rgb(136, 221, 66)",
    "yellow",
    "rgb(43, 132, 204)",
    "violet",
  ];
  console.log(data);
  return (
    <div className="graph">
      <div
        className="graph-img"
        style={{
          height: max * 3 + 40 + "px",
        }}
      >
        {total != undefined && (
          <div className="graph-total">Total: {total}</div>
        )}
        <div className="right-bar"></div>
        {Object.entries(data).map(([key, value], index) => {
          return (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: value * 3 }}
              transition={{ duration: value * 0.03 }}
              // transition={{ duration: 1 }}
              className="bar"
              style={{
                // height: value * 5 + "px",
                backgroundColor: colors[index],
              }}
            >
              {value}
            </motion.div>
          );
        })}
      </div>
      <div className="graph-labels">
        {Object.entries(data).map(([key, value], index) => {
          return (
            <motion.div
              //   initial={{ width: 0 }}
              //   animate={{ width: "100%" }}
              //   transition={{ duration: value * 0.03 }}
              className="graph-label"
              //   style={{ overflow: "hidden" }}
            >
              <div
                className="color-box"
                style={{ backgroundColor: colors[index] }}
              ></div>
              {key}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
