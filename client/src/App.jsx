import { Routes, Route } from "react-router-dom";
import "./index.css";
import { Home, Quiz, Letter, Drawing, Closing } from "./pages";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/letter" element={<Letter />} />
      <Route path="/drawing" element={<Drawing />} />
      <Route path="/closing" element={<Closing />} />
    </Routes>
  );
}

export default App;
