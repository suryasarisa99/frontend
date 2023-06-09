import { Routes, Route } from "react-router-dom";
import AnalysisId from "./pages/AnalysisId";
import AnalysisBranch from "./pages/AnalysisBranch";
import App from "./App";
export default function Home({}) {
  return (
    <div>
      <Routes>
        <Route path={"/ays"} element={<AnalysisId />} />
        <Route path={"/ays-branch"} element={<AnalysisBranch />} />
        <Route path="/" element={<App />} />
      </Routes>
    </div>
  );
}
