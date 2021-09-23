import React, { useContext } from 'react';
import AuthContext from '../../../context/auth-context';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { HiOutlineX } from 'react-icons/hi';
const UsersList = (props) => {
  const modal = props.triggermodal;
  const userdetails = props.triggerUpdate;
  const contextType = useContext(AuthContext);
  const allUsers = props.all;
  const handleSearch = props.search;

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold space-x-4 text-gray-800">
          users{' '}
          <span className="bg-gray-100 text-gray-500 rounded-full py-2 px-3 text-xl">
            {allUsers.length}
          </span>
          <input
            type="text"
            className="text-lg rounded-full py-2 px-3"
            placeholder="search for a user"
            onChange={(event) => handleSearch(event)}
          />
        </h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Profileimage</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Usernames</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Names</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Role</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Update Role</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Update User details</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-gray-100">
              {allUsers.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                          {customer.profileimage !== null &&
                          customer.username === contextType.username ? (
                            <Link to={`/personalprofile/${customer.username}`}>
                              <img
                                className="rounded h-15 w-15 "
                                src={customer.profileimage}
                                alt={customer.username}
                              />
                            </Link>
                          ) : customer.profileimage !== null ? (
                            <Link to={`/profile/${customer.username}`}>
                              <img
                                className="rounded h-15 w-15 "
                                src={customer.profileimage}
                                alt={customer.username}
                              />
                            </Link>
                          ) : customer.username !== undefined &&
                            customer.username === contextType.username ? (
                            <div>
                              <h1>
                                <Link to={`/personalprofile/${customer.username}`}>
                                  <div className="rounded-full h-12 w-12 bg-blue">
                                    <div className="h-15 w-12 text-white text-center text-md">
                                      {customer.username.substring(0, 1)}{' '}
                                    </div>
                                  </div>
                                </Link>
                              </h1>
                            </div>
                          ) : customer.username !== undefined ? (
                            <div>
                              <h1>
                                <Link to={`/profile/${customer.username}`}>
                                  <div className="rounded-full h-12 w-12 bg-blue">
                                    <div className="h-15 w-12 text-white text-center text-md">
                                      {customer.username.substring(0, 1)}{' '}
                                    </div>
                                  </div>
                                </Link>
                              </h1>
                            </div>
                          ) : (
                            <div className="me-3">
                              <HiOutlineX />
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="font-medium text-gray-800">{customer.username} </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">{customer.names}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">
                        {customer.role.role}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="text-left font-medium text-blue-500">
                        <Button className="pt-1" onClick={modal.bind(this, customer)}>
                          Update role
                        </Button>
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="text-left font-medium text-blue-500">
                        <Button className="pt-1" onClick={userdetails.bind(this, customer)}>
                          Update User Details
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default UsersList;
