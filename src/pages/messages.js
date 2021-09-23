import React, { useContext, useState } from "react";

import { Container } from "@material-ui/core";
import AuthContext from "../context/auth-context";
import Messages from "../drawerright/messages";
import "./events.css";
import { withRouter } from "react-router-dom";
import Sidebar from "./mSidebar";

import Unauthorized from "./unauthorized";

const EventsPage = (props) => {
  const contextType = useContext(AuthContext);
  const [alltickets, setalltickets] = useState(false);
  const [messages, setmessages] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [AppBar, setAppBar] = useState('Messages');

  function AdminDashboard() {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          alltickets={alltickets}
          setalltickets={setalltickets}
          setmessages={setmessages}
        />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main>
            <Container>
              {messages === true && <Messages bringSidebar={setSidebarOpen} />}
            </Container>
          </main>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {contextType.token ? <AdminDashboard /> : <Unauthorized />}
    </React.Fragment>
  );
};

export default withRouter(EventsPage);
