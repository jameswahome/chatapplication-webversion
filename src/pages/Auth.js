import React, { useState, useContext } from "react";

import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "./../index.css";

import AuthContext from "../context/auth-context";
import ReactNotification, { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export default function AuthPage() {
  const contextType = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const [Value, setValue] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorNot, setErrorNot] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const newno = (event) => {
    setPhoneNumber(event);
    setValue(Value);
  };

  // static contextType = AuthContext;
  const validatePhoneNumber = (number) => {
    // checks if its an actual phone number not 1234569897
    const isValidPhoneNumber = isPossiblePhoneNumber(phoneNumber);

    if (isValidPhoneNumber) {
      //removes the spaces in the phonenumber
      const phoneno = phoneNumber.replace(/ /g, "");
      return phoneno;
    }

    setErrorNot("invalid phonenumber");
    return isValidPhoneNumber;
  };
  const validateEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return email;
    }
    return re.test(String(email).toLowerCase());
  };

  const loginHandler = (event) => {
    //check if they're  fields which are null

    if (username.trim().length === 0 || password.trim().length === 0) {
      setErrorNot("all fields are required");
      return;
    }
    setIsLoading(true);

    //post to the database
    const requestBody = {
      query: `
      query Login($user: String!, $pass: String!) {
        login(username:$user, password:$pass){
          userId
          username
          token
          tokenExpiration
        }
      }
        `,
      variables: {
        user: username,
        pass: password,
      },
    };

    fetch("https://apimarketpalace.com/api", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        //  Authorization: 'Bearer ' + token,
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
        setIsLoading(false);
        if (resData.data !== null) {
          store.addNotification({
            title: "success",
            message: "login successful",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          contextType.login.login(
            resData.data.login.token,
            resData.data.login.username,
            resData.data.login.role
          );
          return;
        }
        if (resData.data === null) {
          setErrorNot(resData.errors[0].message);
          store.addNotification({
            title: "Error",
            message: `${resData.errors[0].message}`,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          return;
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const signupHandler = (event) => {
    const phoneno = validatePhoneNumber();
    const mail = validateEmail();

    if (
      password.trim().length === 0 ||
      username.trim().length === 0 ||
      phoneno === false ||
      mail === false
    ) {
      if (mail === false) {
        setErrorNot("enter a valid Email");
      } else if (phoneno === false) {
        setErrorNot("enter a valid phonenumber");
      } else {
        setErrorNot("All fields are required");
      }

      return;
    }
    setIsLoading(true);

    let requestBody = {
      query: `
				mutation CreateUser($email: String!, $pass: String!, $username: String!,  $phonenumber: String!){
				  createUser(createAcc: {email: $email, password: $pass, username: $username,  phonenumber: $phonenumber}){
					_id
					email
          username
				  }
				}
				`,
      variables: {
        email: mail.toLowerCase(),
        pass: password,
        username: username.toLowerCase(),
        phonenumber: phoneno,
      },
    };

    fetch("https://apimarketpalace.com/api", {
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
        setIsLoading(false);

        if (resData.data.createUser !== null) {
          setErrorNot("Signup successful");
          store.addNotification({
            title: "success",
            message: "Signup successful",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          closeModal();

          return;
        }
        if (resData.data.createUser === null) {
          setErrorNot(resData.errors[0].message);
          store.addNotification({
            title: "Error",
            message: `${resData.errors[0].message}`,
            type: "danger",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          });
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <ReactNotification />
      {isOpen ? (
        <div className="w-full h-screen flex items-center justify-center">
          <form
            className="w-full md:w-1/3 bg-white rounded-lg"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex font-bold justify-center mt-6">
              <img
                className="h-20 w-20"
                src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
                alt="img"
              />
            </div>
            <h2 className="text-3xl text-center text-gray-700 mb-4 mt-4">
              SignUp Form
            </h2>
            <div className="px-12 pb-4 text-center text-red-600">
              {" "}
              {errorNot}
            </div>

            <div className="px-12 pb-10">
              <div className="w-full mb-2">
                <div className="flex items-center">
                  <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock"></i>
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={handleEmailChange}
                    value={email}
                    className="-mx-6 px-8 w-full border rounded  py-2 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="w-full mb-2 mt-4">
                <div className="flex items-center">
                  <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={handleUsernameChange}
                    value={username}
                    className="-mx-6 px-8  w-full border rounded  py-2 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="w-full mb-2 mt-4">
                <div className="flex items-center">
                  <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
                  <PhoneInput
                    international
                    countryCallingCodeEditable={true}
                    defaultCountry="KE"
                    value={Value}
                    onChange={newno}
                    className="-mx-6 px-8  w-full border rounded  py-2 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="w-full mb-2 mt-4">
                <div className="flex items-center">
                  <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                    className="-mx-6 px-8 w-full border rounded  py-2 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-full bg-blue text-gray-100  focus:outline-none mt-4"
                onClick={() => signupHandler()}
                disabled={isLoading}
              >
                SignUp
              </button>

              <button
                type="submit"
                className="w-full py-2 rounded-full text-blue focus:outline-none mt-4"
                onClick={() => {
                  closeModal();
                  setErrorNot("");
                }}
                disabled={isLoading}
              >
                login
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full h-screen flex items-center justify-center">
          <form
            className="w-full md:w-1/3 bg-white rounded-lg"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex font-bold justify-center mt-6">
              <img
                className="h-20 w-20"
                src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg"
                alt="img"
              />
            </div>
            <h2 className="text-3xl text-center text-gray-700 mb-4 mt-4">
              Login Form
            </h2>
            <div className="px-12 pb-4 text-center text-red-600">
              {" "}
              {errorNot}
            </div>
            <div className="px-12 pb-10">
              <div className="w-full mb-2">
                <div className="flex items-center">
                  <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={handleUsernameChange}
                    value={username}
                    className="-mx-6 px-8  w-full border rounded py-2 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
              <div className="w-full mb-2 mt-4">
                <div className="flex items-center">
                  <i className="ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                    value={password}
                    className="-mx-6 px-8 w-full border rounded py-2 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
              <button className="text-xs text-gray-600 float-right mb-4">
                Forgot Password?
              </button>
              <button
                type="submit"
                className="w-full py-2 rounded-full bg-blue text-gray-100  focus:outline-none"
                onClick={() => loginHandler()}
              >
                Login
              </button>
              <button
                type="submit"
                className="w-full py-2 rounded-full text-blue focus:outline-none mt-4"
                onClick={() => {
                  openModal();
                  setErrorNot("");
                }}
              >
                Create An Account
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
