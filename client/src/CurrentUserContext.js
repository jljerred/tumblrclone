//CONTAINS INFO OF LOGGED IN USER
import React, { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const CurrentUserContext = createContext();
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [status, setStatus] = useState("loading");
  const [errorMsg, setErrorMsg] = useState(null);
  const { user } = useAuth0();

  useEffect(() => {
    if (user !== undefined) {
      fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setCurrentUser(res.newUser);
          console.log(res);
        });
    }
  }, [user]);
  console.log(currentUser);
  return (
    <CurrentUserContext.Provider
      value={{ setCurrentUser, currentUser, status, errorMsg }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
