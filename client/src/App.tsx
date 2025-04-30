import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      
    </div>
  );
};

export default App;
