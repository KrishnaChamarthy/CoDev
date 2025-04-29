import { Route, Routes } from "react-router-dom";
import Home from "./context/home";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      
    </div>
  );
};

export default App;
