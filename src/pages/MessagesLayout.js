import React from 'react';
// import { NavLink } from 'react-router-dom';

// import AuthContext from '../context/auth-context';

function Header() {
  // const contextType = useContext(AuthContext);
  return (
    <div>
      <div className="m-1">
        <div className="text-lg ml-2 mb-2 mt-4 font-bold">test message</div>
        <div className="text-sm mt-1 ml-2">
          <p className="text-gray-900 leading-none flex ">
            <svg
              className="w-4 h-4"
              fill="#9b7e64"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            instagram
          </p>
        </div>
        <div className=" w-full ">
          <div className="border-2 rounded-lg border-blue-100 shadow-md p-4 flex flex-col justify-between leading-normal">
            <div className="flex flex-row items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src="https://res.cloudinary.com/jaymojay/image/upload/v1628024746/online-status_ns7sho.jpg"
                alt="Avatar of Writer"
              />

              <p className="flex-1 text-gray-900 font-bold text-md ">username</p>
              <div className="flex flex-row-reverse">
                <p className="text-sm text-gray-600 flex items-center">2 days ago</p>
              </div>
            </div>
            <div className="text-sm py-2 px-2 ">
              <p className="text-gray-900 leading-none flex ">role</p>
            </div>

            <div className="px-2 py-2">
              <div className="flex text-xl space-x-2">
                <div className="font-bold  mb-2">Link: </div>
                <div>Mountain</div>
              </div>
              <div className="flex text-xl space-x-2">
                <div className="font-bold  mb-2">Price: </div>
                <div>Mountain</div>
              </div>
              <div className="flex text-xl space-x-2">
                <div className="font-bold  mb-2">Original Email: </div>
                <div>Mountain</div>
              </div>
              <div className="font-bold text-xl mb-2">Description</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
                Maiores et perferendis eaque, exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full ">
        <div className="px-4 py-4">
          <h1 className=" text-gray-800 font-bold">Account Settings ✨</h1>
        </div>
        <div className="border-2 md:p-1 sm:p-2 rounded-lg border-blue-100 shadow-md p-4 flex flex-col justify-between leading-normal">
          <div className="py-8 px-8 items-center justify-center text-center">
            <section className=" ">
              <div className="flex items-center justify-center">
                <div className="mr-4 mb-4">
                  <img
                    className="w-24 h-24 rounded-full "
                    src="https://res.cloudinary.com/jaymojay/image/upload/v1628024746/online-status_ns7sho.jpg"
                    alt="User upload"
                  />
                </div>
                <button className="rounded-lg w-20 h-8">Change</button>
              </div>
            </section>

            <h2 className=" text-xl tracking-normal font-medium mb-1">names</h2>
            <div>
              <span className="cursor-pointer mr-1 text-gray-600 dark:text-gray-100">
                @username
              </span>
            </div>

            <span className="cursor-pointer mr-1 text-gray-400 dark:text-gray-100">Admin</span>

            <p className="text-gray-600 dark:text-gray-100 text-sm tracking-normal font-normal mb-8 mt-3 text-center w-10/12">
              {/* Bio*/}
            </p>

            <div className="flex items-center justify-center mb-4">
              <div className="">
                <p className=" dark:text-gray-100 text-gray-500 text-sm leading-5 text-center">
                  Joined
                </p>
                <div className="text-gray-600 dark:text-gray-100 text-sm leading-6 mb-2 text-center">
                  2months ago
                </div>
              </div>
              <div className="mx-6 lg:mx-3 xl:mx-6 px-8 lg:px-4 xl:px-8 ">
                <p className=" dark:text-gray-100 text-gray-500 text-sm leading-5 text-center">
                  last seen
                </p>
                <div className="text-gray-600 dark:text-gray-100 text-sm leading-6 mb-2 text-center">
                  2 months
                </div>
              </div>
              <div className="">
                <p className=" dark:text-gray-100 text-gray-500 text-sm leading-5 text-center">
                  Created Topics
                </p>
                <h2 className="text-gray-600 dark:text-gray-100 text-sm leading-6 mb-2 text-center">
                  2
                </h2>
              </div>
            </div>

            <div className="relative inline-flex">
              <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                <option>Choose a color</option>
                <option>Red</option>
                <option>Blue</option>
                <option>Yellow</option>
                <option>Black</option>
                <option>Orange</option>
                <option>Purple</option>
                <option>Gray</option>
                <option>White</option>
              </select>
            </div>
          </div>
          <div className=" flex ">
            <div className="px-4">
              <div className="">
                <section>
                  <h2 className="ic text-gray-800 font-bold ij">Business Profile</h2>
                  <div className="text-sm">
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit.
                  </div>
                  <div className="hz pt th h_ hj sa">
                    <div className="pm">
                      <label className="block text-sm rx ij" for="name">
                        Business Name
                      </label>
                      <input id="name" className="tn cw" value="Acme Inc." />
                    </div>
                    <div className="pm">
                      <label className="block text-sm rx ij" for="business-id">
                        Business ID
                      </label>
                      <input id="business-id" className="tn cw" value="Kz4tSEqtUmA" />
                    </div>
                    <div className="pm">
                      <label className="block text-sm rx ij" for="location">
                        Location
                      </label>{' '}
                      <input id="location" className="tn cw" value="London, UK" />
                    </div>
                  </div>
                </section>
                <section>
                  <h2 className="ic text-gray-800 font-bold ij">Email</h2>
                  <div className="text-sm">
                    Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.
                  </div>
                  <div className="flex flex-wrap sa">
                    <div className="mr-2">
                      <label className="tw" for="email">
                        Business email
                      </label>
                      <input id="email" className="tn" type="email" value="admin@acmeinc.com" />
                    </div>
                    <button className="btn border-gray-200 hover--border-gray-300 fa text-indigo-500">
                      Change
                    </button>
                  </div>
                </section>
                <section>
                  <h2 className="ic text-gray-800 font-bold ij">Password</h2>
                  <div className="text-sm">
                    You can set a permanent password if you don't want to use temporary login codes.
                  </div>
                  <div className="sa">
                    <button className="btn border-gray-200 fa text-indigo-500">
                      Set New Password
                    </button>
                  </div>
                </section>
                <section>
                  <h2 className="ic text-gray-800 font-bold ij">Smart Sync update for Mac</h2>
                  <div className="text-sm">
                    With this update, online-only files will no longer appear to take up hard drive
                    space.
                  </div>
                  <div className="flex items-center sa" x-data="{ checked: true }">
                    <div className="ta focus-within:shadow-outline">
                      <input type="checkbox" id="toggle" className="tw" x-model="checked" />
                      <label className="tq" for="toggle">
                        <span className="bg-white fa" aria-hidden="true"></span>
                        <span className="tw">Enable smart sync</span>
                      </label>
                    </div>
                    <div className="text-sm fy lq st" x-text="checked ? 'On' : 'Off'">
                      On
                    </div>
                  </div>
                </section>
              </div>
              <footer>
                <div className="flex ra ub um re border-gray-200">
                  <div className="flex rp">
                    <button className="btn border-gray-200 hover--border-gray-300 fb">
                      Cancel
                    </button>
                    <button className="btn na nd fv ml-3">Save Changes</button>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>

      <div className=" border-gray-200 ">
        <div className="">
          <div className="">Business settings</div>
          <ul className="">
            <li className="">
              <a className="flex items-center uj ul rounded co ni" href="#0">
                <svg className="w-4 h-4 text-indigo-500 mr-2" viewBox="0 0 16 16">
                  <path d="M12.311 9.527c-1.161-.393-1.85-.825-2.143-1.175A3.991 3.991 0 0012 5V4c0-2.206-1.794-4-4-4S4 1.794 4 4v1c0 1.406.732 2.639 1.832 3.352-.292.35-.981.782-2.142 1.175A3.942 3.942 0 001 13.26V16h14v-2.74c0-1.69-1.081-3.19-2.689-3.733zM6 4c0-1.103.897-2 2-2s2 .897 2 2v1c0 1.103-.897 2-2 2s-2-.897-2-2V4zm7 10H3v-.74c0-.831.534-1.569 1.33-1.838 1.845-.624 3-1.436 3.452-2.422h.436c.452.986 1.607 1.798 3.453 2.422A1.943 1.943 0 0113 13.26V14z"></path>
                </svg>
                <span className="text-sm rx text-indigo-500">My account</span>
              </a>
            </li>
            <li className="">
              <a className="flex items-center uj ul rounded co" href="#0">
                <svg className="w-4 h-4 text-gray-500 mr-2" viewBox="0 0 16 16">
                  <path d="M14.3.3c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-8 8c-.2.2-.4.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l8-8zM15 7c.6 0 1 .4 1 1 0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8c.6 0 1 .4 1 1s-.4 1-1 1C4.7 2 2 4.7 2 8s2.7 6 6 6 6-2.7 6-6c0-.6.4-1 1-1z"></path>
                </svg>
                <span className="text-sm rx fb lg">My notifications</span>
              </a>
            </li>
            <li className="">
              <a className="flex items-center uj ul rounded co" href="#0">
                <svg className="w-4 h-4 text-gray-500 mr-2" viewBox="0 0 16 16">
                  <path d="M3.414 2L9 7.586V16H7V8.414l-5-5V6H0V1a1 1 0 011-1h5v2H3.414zM15 0a1 1 0 011 1v5h-2V3.414l-3.172 3.172-1.414-1.414L12.586 2H10V0h5z"></path>
                </svg>
                <span className="text-sm rx fb lg">Connected Apps</span>
              </a>
            </li>
            <li className="">
              <a className="flex items-center uj ul rounded co" href="#0">
                <svg className="w-4 h-4 text-gray-500 mr-2" viewBox="0 0 16 16">
                  <path d="M5 9h11v2H5V9zM0 9h3v2H0V9zm5 4h6v2H5v-2zm-5 0h3v2H0v-2zm5-8h7v2H5V5zM0 5h3v2H0V5zm5-4h11v2H5V1zM0 1h3v2H0V1z"></path>
                </svg>
                <span className="text-sm rx fb lg">Plans</span>
              </a>
            </li>
            <li className="">
              <a className="flex items-center uj ul rounded co" href="#0">
                <svg className="w-4 h-4 text-gray-500 mr-2" viewBox="0 0 16 16">
                  <path d="M15 4c.6 0 1 .4 1 1v10c0 .6-.4 1-1 1H3c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3h7c.6 0 1 .4 1 1v3h4zM2 3v1h7V2H3c-.6 0-1 .4-1 1zm12 11V6H2v7c0 .6.4 1 1 1h11zm-3-5h2v2h-2V9z"></path>
                </svg>
                <span className="text-sm rx fb lg">Billing &amp; Invoices</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="if rk fy lz si">Experience</div>
          <ul className="flex rf pk sr de">
            <li className="sb de dn">
              <a className="flex items-center uj ul rounded co" href="#0">
                <svg className="w-4 h-4 text-gray-500 mr-2" viewBox="0 0 16 16">
                  <path d="M7.001 3h2v4h-2V3zm1 7a1 1 0 110-2 1 1 0 010 2zM15 16a1 1 0 01-.6-.2L10.667 13H1a1 1 0 01-1-1V1a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1zM2 11h9a1 1 0 01.6.2L14 13V2H2v9z"></path>
                </svg>{' '}
                <span className="text-sm rx fb lg">Give Feedback</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
