//IF logged in: contains tumblr logo, search bar, AND links to dashboard,  recommended for you, inbox,  user profile, and make a post
//if not logged in: contains tumblr logo, search bar, log in button and sign up button (both buttons lead to the same pop up tho)
//shown on Dashboard

import {FaTumblr} from "react-icons/fa";
import styled from "styled-components";

const Header = ({})=>{
    return (<Wrapper>
        <LeftSide>
        <h1><FaTumblr/></h1>
        <P>Search Bar</P>
        </LeftSide>
        <RightSide>
        <P>home </P>
        <P>inbox </P>
        <P>user profile </P>
        <P>new post </P>
          
        </RightSide>
        </Wrapper>
    )
}

const P=styled.p`
margin: 10px;
`

const Wrapper=styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
width: 100vw;
`

const LeftSide=styled.div`
display: flex;
flex-direction: row;
align-items: center;

/* justify-content:flex-start; */
`

const RightSide=styled.div`
display: flex;
flex-direction: row;
/* justify-content: flex-end; */
`

export default Header;