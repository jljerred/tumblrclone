import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { CurrentUserProvider } from "./CurrentUserContext";
import { usePromiseTracker } from "react-promise-tracker";
import { BeatLoader } from "react-spinners";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div>
        <BeatLoader color="#36d7b7" />
      </div>
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-w9hwt6rs.us.auth0.com"
      clientId="8SywWDxK4bx4aW2eu31NCNZ3ZkfIk6p9"
      redirectUri={window.location.origin}
    >
      <CurrentUserProvider>
        <App />
        <LoadingIndicator />
      </CurrentUserProvider>
    </Auth0Provider>
  </React.StrictMode>
);
