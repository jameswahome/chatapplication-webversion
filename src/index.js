import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "jquery/dist/jquery.js";
import "@popperjs/core/dist/umd/popper.js";
import "bootstrap/dist/js/bootstrap.js";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "jquery/dist/jquery.js";
import "@popperjs/core/dist/umd/popper.js";
import "bootstrap/dist/js/bootstrap.js";
const httpLink = new HttpLink({
  uri: "http://localhost:8080/api",
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:8080/subscriptions",
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const cache = new InMemoryCache({
  typePolicies: {
    listings: {
      // Singleton types that have no identifying field can use an empty
      // array for their keyFields.
      keyFields: ["_id", "creator", ["username"]],
    },
    currentuser: {
      // Singleton types that have no identifying field can use an empty
      // array for their keyFields.
      keyFields: ["username"],
    },
    messages: {
      // In most inventory management systems, a single UPC code uniquely
      // identifies any product.
      keyFields: ["_id", "creator", ["username"]],
    },
    tickets: {
      // In some user account systems, names or emails alone do not have to
      // be unique, but the combination of a person's name and email is
      // uniquely identifying.
      keyFields: ["_id", "creator", ["username"]],
    },
    // Book: {
    //   // If one of the keyFields is an object with fields of its own, you can
    //   // include those nested keyFields by using a nested array of strings:
    //   keyFields: ["title", "author", ["name"]],
    // },
  },
});

const client = new ApolloClient({
  link: splitLink,
  cache: cache,
  //credentials: 'include',
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();
