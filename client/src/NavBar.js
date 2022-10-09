//CONTAINS LINKS TO HOMEPAGE, FEED, PROFILE, AND MAKE NEW POST
import { FaTumblr, FaPen, FaUser, FaRegNewspaper } from "react-icons/fa";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "./CurrentUserContext";
import { useContext } from "react";

const NavBar = ({}) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Wrapper>
      <Wrapper1>
        <P onClick={() => navigate("/")}>
          {" "}
          <FaTumblr />{" "}
        </P>
        <P onClick={() => navigate("/dashboard")}>
          <FaRegNewspaper />{" "}
        </P>
        <P onClick={() => navigate(`/profile/${currentUser.handle}`)}>
          <FaUser />{" "}
        </P>
        <P onClick={() => navigate("/makepost")}>
          <FaPen />{" "}
        </P>
        <SearchBar />
      </Wrapper1>
    </Wrapper>
  );
};

const P = styled.p`
  margin: 10px;
`;
const Wrapper = styled.div``;

const Wrapper1 = styled.div`
  background-color: #1d3765;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 20px;
  width: 100vw;
  height: 200px;
`;

export default NavBar;
