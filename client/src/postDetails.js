//POSTDETAILS FOR USE IN PROFILE
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./CurrentUserContext";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

const PostDetails = ({ post }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const [comment, setComment] = useState("");

  let navigate = useNavigate();
  const postComment = () => {
    fetch("/api/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: post.id,
        handle: currentUser.handle,
        comment,
      }),
    }).then((res) => res.json());
  };
  const likePost = () => {
    fetch("/api/likepost", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ handle: currentUser.handle, postId: post.id }),
    }).then((res) => res.json());
  };
  console.log(post);
  return (
    post && (
      <Wrapper>
        <div
          onClick={(ev) => {
            ev.stopPropagation();
            navigate(`/profile/${post.authorHandle}`);
          }}
        >
          <Div1>{post.authorHandle}</Div1>
        </div>
        {post.media[0] && <Img src={post.media[0].src}></Img>}

        <Div2>{post.post}</Div2>

        <Div3>
          <Button onClick={likePost}>
            {post.likedBy.includes(currentUser.handle) ? (
              <FaHeartBroken />
            ) : (
              <FaHeart />
            )}
          </Button>
          <Button onClick={postComment}>Comment</Button>
          <input
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </Div3>
      </Wrapper>
    )
  );
};

const Div1 = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin: 15px;
`;

const Div2 = styled.div`
  font-size: 25px;
  margin: 15px;
`;

const Img = styled.img`
  max-height: 400px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
`;
const Div3 = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 25%;
  height: 22px;
`;

const Wrapper = styled.section`
  border: solid 2px white;
  width: 50vw;
  display: flex;
  flex-direction: column;
  margin-left: 25%;
`;

export default PostDetails;
