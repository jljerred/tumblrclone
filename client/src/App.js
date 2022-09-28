import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Dashboard";
import Profile from "./Profile";



const App=()=> {
  return (
   <Wrapper>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/profile/:profileId" element={<Profile/>}/>
      </Routes>
      </Router>
   </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;
export default App;