//DISPLAYS FEED OF POSTS FROM ALL USERS

import { useEffect, useState } from "react";
import PostDetails from "./PostDetails";
import styled from "styled-components";
import { BeatLoader } from "react-spinners";
import tumblrbig from "./tumblrbig.png";

const Dashboard = ({}) => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("/api/homefeed")
      .then((res) => res.json())
      .then((allPosts) => {
        console.log(allPosts);
        setAllPosts(allPosts.posts);
      })
      .then(setIsLoading(false));
  }, [refresh]);

  return (
    <Wrapper>
      <Img src={tumblrbig} />

      {isLoading && (
        <div>
          <BeatLoader color="white" />
        </div>
      )}
      {!isLoading &&
        allPosts.map((post) => {
          return <PostDetails key={post.id} post={post} />;
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #1d3765;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  min-height: 100vh;
  width: 100vw;
  text-align: center;
`;
const Img = styled.img`
  height: 200px;
  margin: 10px;
`;

export default Dashboard;
