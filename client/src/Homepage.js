//HOMEPAGE DISPLAYS LOGO AND LOGIN/LOG OUT BUTTON
//DISPLAYS PERSONALIZED GREETING TO REGISTERED USERS
//DISPLAYS REGISTRATION PROMPT IF USER LOGS WITH AUTH0 BUT HAS NOT SET UP THEIR ACCOUNT
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { CurrentUserContext } from "./CurrentUserContext";
import { useNavigate } from "react-router-dom";
import tumblrbig from "./tumblrbig.png";

const Homepage = ({}) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { user } = useAuth0();
  console.log(user);
  let navigate = useNavigate();

  console.log(currentUser);
  return (
    <Wrapper>
      {user ? <LogoutButton /> : <LoginButton />}
      {currentUser.handle ? (
        <Div>
          Welcome back {currentUser.handle} !
          <Img src={tumblrbig} />
        </Div>
      ) : (
        <Div
          onClick={(ev) => {
            ev.stopPropagation();
            navigate("/register");
          }}
        >
          {" "}
          Please register your account here
          <Img src={tumblrbig} />
        </Div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: #1d3765;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  height: 100%;
  width: 100vw;
  text-align: center;
`;

const Div = styled.section`
  margin-top: 100px;
`;

const Img = styled.img`
  display: flex;
  width: 100vw;
`;

export default Homepage;
