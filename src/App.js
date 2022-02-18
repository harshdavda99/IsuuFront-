import "./App.css";
import MainForm from "./components/MainForm/MainForm";
import Login from "./components/Forms/Login";
import Signup from "./components/Forms/Signup";
import { Routes, Route } from "react-router-dom";
import Addbugs from "./components/pages/Addbugs";
import Dashboard from "../src/components/Forms/Dashboard";
import Issuelist from "./components/MainForm/Issuelist";
import Updating from "./components/MainForm/Updating";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Updating" element={<Updating />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mainform" element={<MainForm />} />
        <Route path="/adduser" element={<Addbugs />} />
        <Route path="/Issuelist" element={<MainForm />} />
        <Route path="//adduser" element={<Issuelist  />} /> 
      </Routes>
    </>
  );
}
export default App;