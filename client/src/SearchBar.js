//SEARCHBAR COMPONENT IN NAVBAR, CAN VIEW USER PROFILES BY SEARCHING BY PARTIAL USERNAME

import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";

const SearchBar = ({}) => {
  const [searchOptions, setSearchOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { user } = useAuth0();

  let navigate = useNavigate();
  const SearchUser = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setSearchOptions(data.users);
      });
  };
  console.log(searchText);
  return (
    <Div>
      <Autocomplete
        onClick={() => {
          console.log("I clicked on ", searchText);
        }}
        inputValue={searchText}
        onInputChange={(e, newInputValue) => {
          setSearchText(newInputValue);
        }}
        style={{ width: 200 }}
        freeSolo
        autoComplete
        autoHighlight
        options={searchOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(e) => {
              SearchUser();
            }}
            variant="outlined"
            label="User Search"
          />
        )}
      />
      <Button
        onClick={() => {
          navigate(`/profile/${searchText}`);
        }}
      >
        {" "}
        <FiSearch />
      </Button>
    </Div>
  );
};

const Div = styled.section`
  margin-left: 10px;
  margin-right: 10px;
  display: flex;
`;

const Button = styled.button`
  height: 50px;
  width: 50px;
  margin: 3px;
`;

export default SearchBar;
