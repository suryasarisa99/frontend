import RegisterContext from "../../context/registerId";
import { useContext } from "react";

export default function StartPage({}) {
  let { invalidRegId } = useContext(RegisterContext);
  return (
    <>
      {/* <h1 className="fancy-txt">SURYA</h1> */}
      <div className="start-page">
        {invalidRegId && (
          <div class="error-mssg">
            <div class="error-head">Registration ID Error:</div>
            Entered a Invalid Registration Id Or Registration Id Other Than
            2021-2025 and 2022-2026 Batch. For More go{" "}
            <a href="#warn-mssg">here</a>
          </div>
        )}
        <div className="info-mssg">
          <div className="info-head">About</div>
          This Website Is Created By Jaya Surya. This Website Is Just Created
          For Testing Purpose And Just For My Satisfaction. This Website Uses
          Backend:
          <a href="https://get-std-res.vercel.app" target="_blank">
            get-std-res.vercel.app
          </a>
          The Backend can also Be Created By Me
        </div>

        <div className="warn-mssg" id="warn-mssg">
          <div className="warn-head">Warning Message</div>
          At Currently The Webiste Includes the Results of 2021-2025 , 2022-2026
          Batches Only. May The Results In This Website Is Not Accurate and Not
          Up To Date
        </div>
      </div>
    </>
  );
}
