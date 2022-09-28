//make new post here
//clicking link in upper right hand corner of header directs here
//is visible with post type options (text, photo, link, chat, audio, video) on Dashboard

import styled from "styled-components";
import { FiType, FiCamera, FiVideo, FiLink, FiMessageCircle } from "react-icons/fi";


const MakePost = ({}) => {
  return (
    <Wrapper1>
      <Wrapper>
        <FiType/>
        <p>Text</p>
      </Wrapper>
      <Wrapper>
        <FiCamera/>
        <p>Photo</p>
      </Wrapper>
      <Wrapper>
        <FiLink/>
        <p>Link</p>
      </Wrapper>
      <Wrapper>
        <FiMessageCircle/>
        <p>Chat</p>
      </Wrapper>
      <Wrapper>
        <FiVideo/>
        <p>Video</p>
      </Wrapper>
    </Wrapper1>
  );
};

const Wrapper1 = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
  color: black;
  width: 75vw;
  margin-left: 100px;
`;

const Wrapper= styled.section`
margin: 10px;

`
export default MakePost;
