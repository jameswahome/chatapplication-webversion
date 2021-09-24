//, { Component }
import React, { useState } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import { gql, useQuery } from "@apollo/client";
import Messages from "./pages/messages";
import MessageslPage from "./pages/singlemessagecomments";
import ProfilePage from "./pages/profile";
import AuthPage from "./pages/Auth";
import MessageLayout from "./pages/MessagesLayout";
import AuthContext from "./context/auth-context";
import PersonalProfile from "./pages/personalprofile";
import Spinner from "./components/spinner/spinner";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setrole] = useState(null);

  const currentUser = gql`
    query {
      currentuser {
        token
        username

        userId
      }
    }
  `;
  function FetchcurrentUser() {
    const { loading, error, data } = useQuery(currentUser);
    if (loading) return <Spinner />;
    if (error) return `Error! ${error} `;

    return data.currentuser;
  }

  const userLoggedIn = FetchcurrentUser();

  const login = (token, userId, role) => {
    setToken(token);
    setUsername(userId);
    setrole(role);
  };

  const logout = () => {
    const requestBody = {
      query: `
      query{
        logoutuser{
          username
        }
      }

        `,
    };

    fetch("http://localhost:8080/api", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        //check ifis login then get the token details and pass it into the contexttype
        setToken(userLoggedIn.token);
        setUsername(userLoggedIn.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AuthenticatedRoutes = () => {
    return (
      <>
        <main className="main-content">
          <Switch>
            {token && <Redirect from="/" to="/index" exact />}
            {token && <Redirect from="/auth" to="/index" exact />}
            {!token && <Route path="/auth" component={AuthPage} />}
            <Route path="/index" component={Messages} />

            <Route path="/sm/:messageId" component={MessageslPage} />
            <Route path="/profile/:creatorId" component={ProfilePage} />
            <Route
              path="/personalprofile/:creatorId"
              component={PersonalProfile}
            />

            {!token && <Redirect to="/auth" exact />}
          </Switch>
        </main>
      </>
    );
  };

  return (
    <BrowserRouter>
      <React.Fragment>
        <AuthContext.Provider
          value={{
            token: userLoggedIn.token || token,
            username: userLoggedIn.username || username,
            login: { login },
            logout: { logout },
            role: userLoggedIn.role || role,
            userId: userLoggedIn.userId,
            // profilepic: userLoggedIn.profileimage,
          }}
        >
          <Switch>
            <Route path="/meso" component={MessageLayout} />
            <Route path="/messages" component={Messages} />
            <Route component={AuthenticatedRoutes} />
          </Switch>
        </AuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}
