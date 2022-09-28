//contains the number on notes AND the like, reblog, comment, and share options and icons
//is on every post
import styled from "styled-components";
import { FiHeart, FiMessageCircle, FiShare, FiRepeat } from "react-icons/fi";


const postActions = ({})=>{
    return (
        <Div>
    <p>number of notes</p>
      <FiMessageCircle />
      <FiRepeat />
      <FiHeart />
      <FiShare />
      </Div>
    )
}

const Div=styled.div``;
export default postActions;