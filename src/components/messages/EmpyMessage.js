import React, { useContext } from "react";
import authContext from "../../context/auth-context";

export default function EmptyMessage({ setContacts }) {
  const contextType = useContext(authContext);
  return (
    <div className="col-span-full xl:col-span-6  shadow-lg rounded-sm border">
      <div className="h-screen ">
        <div className="justify-center items-center text-center p-24 ">
          <div className="font-bold text-xl  ">Chat Application</div>
          <div className="font-bold text-xl  text-gray-500 pt-6">
            {" "}
            Welcome back {contextType.username}{" "}
          </div>
          <div className="pt-4">
            <button
              className="font-bold text-md border h-10 bg-gray-100 border-gray-100 rounded-xl"
              onClick={() => setContacts(true)}
            >
              start A conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
