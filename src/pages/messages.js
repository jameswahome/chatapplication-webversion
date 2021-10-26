import React, { useContext, useState } from "react";
import AuthContext from "../context/auth-context";
import Messages from "../drawerright/messages";
import "./events.css";
import { withRouter } from "react-router-dom";
import Sidebar from "./mSidebar";
import ContactList from "./ContactSidebar";
import Unauthorized from "./unauthorized";

const EventsPage = (props) => {
  const contextType = useContext(AuthContext);
  const [alltickets, setalltickets] = useState(false);
  const [messages, setmessages] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [contacts, setContacts] = useState(false);
  const [tapUser, setTapUser] = useState("");
  // const [AppBar, setAppBar] = useState('Messages');

  function AdminDashboard() {
    return (
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        {contacts === true ? (
          /* contact list */
          <ContactList
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            alltickets={alltickets}
            setalltickets={setalltickets}
            setmessages={setmessages}
            setContacts={setContacts}
            setTapUser={setTapUser}
          />
        ) : (
          /* chat list */
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            alltickets={alltickets}
            setalltickets={setalltickets}
            setmessages={setmessages}
            setContacts={setContacts}
            setTapUser={setTapUser}
          />
        )}

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <main className="pl-1 pr-1">
            {messages === true && (
              <Messages
                bringSidebar={setSidebarOpen}
                userId={tapUser}
                setContacts={setContacts}
              />
            )}
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
