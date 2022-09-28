
import Header from "./Header";
import MakePost from "./MakePost";
import styled from "styled-components";
//contains header and
//makePost component with media options and active users pfp + a feed of posts from users the active user follows

//each post contains the users pfp, who it was reblogged from, the username of the op, media, text, notes, and the options to share, comment, reblog, and like the post

//if you are not logged in, will display posts from random users

const Dashboard = ({})=>{
    return (
        <Wrapper>
        <Header/>
        <MakePost/>
        <h1>dashboard content</h1>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  background-color: #001936;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  width: 100vw;
text-align: center;
`;

export default Dashboard;