import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import NavBar from "./NavBar";
import Homepage from "./Homepage";
import Register from "./Register";
import MakePost from "./MakePost";

const App = () => {
  return (
    <Wrapper>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:handle" element={<Profile />} />
          <Route path="/makepost" element={<MakePost />} />
        </Routes>
      </Router>
    </Wrapper>
  );
};

const Wrapper = styled.div``;
export default App;
