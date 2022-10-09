//REGISTRATION FORM
//SIGN UP POST AUTH0, PROMPT FROM HOMEPAGE DIRECTS HERE
//USER ADDS DESIRED USERNAME, DISPLAY NAME, AND BIO here

import { useState, ReactDOM, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CurrentUserContext } from "./CurrentUserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Register = ({}) => {
  const [inputs, setInputs] = useState({});
  const { user } = useAuth0();
  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);
  console.log(user);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/dashboard");
    console.log(inputs);
    setCurrentUser({ ...currentUser, ...inputs });
    fetch("/api/register", {
      method: "PATCH",
      body: JSON.stringify({ _id: currentUser._id, ...inputs }),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  console.log(currentUser);
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <label>
          Enter your username:
          <input
            type="text"
            name="handle"
            value={inputs.handle || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter your display name:
          <input
            type="text"
            name="displayName"
            value={inputs.displayName || ""}
            onChange={handleChange}
          />
        </label>
        <label>
          Enter your bio:
          <input
            type="text"
            name="bio"
            value={inputs.bio || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background-color: #1d3765;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  height: 100vh;
  width: 100vw;
  text-align: center;
`;
const Form = styled.form`
  background-color: #1d3765;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
export default Register;
