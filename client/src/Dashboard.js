
import Header from "./Header";
import makePost from "./makePost";
import styled from "styled-components";
//contains header and
//makePost component with media options and active users pfp + a feed of posts from users the active user follows

//each post contains the users pfp, who it was reblogged from, the username of the op, media, text, notes, and the options to share, comment, reblog, and like the post

//if you are not logged in, will display posts from random users

const Dashboard = ({})=>{
    return (
        <Wrapper>
        <Header/>
        <makePost/>
        <h1>dashboard content</h1>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  padding: 20px;
`;

export default Dashboard;