//CONTAINS PFP, DISPLAY NAME, HANDLE, AND BIO
//DISPLAYS FEED OF THAT USERS POSTS
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Profile = ({}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { handle } = useParams();
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);
  useEffect(() => {
    fetch(`/api/profile/${handle}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.profile);
        setPosts(data.posts);
      });
  }, [handle]);

  if (isLoading) {
    return (
      <Div0>
        <BeatLoader color="white" />
      </Div0>
    );
  }

  return (
    isAuthenticated && (
      <Wrapper>
        {profile && (
          <div>
            <img src={profile.picture} alt={profile.name} />
            <h2>@{profile.handle}</h2>
            <h2>{profile.displayName}</h2>
            <p>{profile.bio}</p>
          </div>
        )}
        {posts &&
          posts.map((post) => (
            <Wrapper1>
              <Div>{post.post}</Div>
              <Div>{post.media.length && <Img src={post.media[0].src} />}</Div>
            </Wrapper1>
          ))}
      </Wrapper> 
    )
  );
};
const Wrapper = styled.section`
  background-color: #1d3765;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  min-height: 100vh;
  width: 100vw;
  text-align: center;
`;

const Wrapper1 = styled.div`
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  border: solid 2px white;
margin-left:25%;
  width: 50%;

`;

const Div0 = styled.section`
  text-align: center;
  background-color: #1d3765;
  min-height: 100vh;
`;
const Div = styled.section``;

const Img = styled.img`
  margin: 10px;
  max-height: 400px;
  max-width: 400px;
`;

export default Profile;
