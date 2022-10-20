//MAKE NEW POST
//CLICK PENCIL ICON IN NAV BAR TO REDIRECT TO THIS PAGE
//USE POST METHOD WITH CLOUDINARY WIDGET TO UPLOAD MEDIA TO POSTS

import styled from "styled-components";
import { useState, useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { useNavigate } from "react-router-dom";

const MakePost = ({}) => {
  const [post, setPost] = useState("");
  const [media, setMedia] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const makePost = () => {
    fetch("/api/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ authorHandle: currentUser.handle, post, media }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRefresh(!refresh);

        console.log(data);
      });
  };
  console.log(media);

  return (
    <Wrapper>
      <Wrapper1>
        <TextArea value={post} onChange={(e) => setPost(e.target.value)} />
        <Button
          onClick={() => {
            makePost();
            setPost("");
            navigate(`/profile/${currentUser.handle}`);
          }}
        >
          Publish
        </Button>
        <div>
          <CloudinaryUploadWidget setMedia={setMedia} media={media} />

          <Img id="uploadedimage" src=""></Img>
        </div>
      </Wrapper1>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  background-color: #1d3765;
`;
const Wrapper1 = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: white;
  width: 75vw;
  margin-left: 100px;
  font-family: Arial, Helvetica, sans-serif;
`;
const TextArea = styled.textarea`
  height: 100px;
  width: 250px;
`;

const Button = styled.button`
  font-family: Arial, Helvetica, sans-serif;
  height: 50px;
  width: 70px;
`;

const Img = styled.img`
  max-height: 400px;
  max-width: 400px;
  margin: 20px;
`;
export default MakePost;
