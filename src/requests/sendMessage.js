const modalConfirmHandler = ({ text, inputUsername }) => {
  //check if they're  fields which are null
  if (inputUsername.trim().length === 0 || text.trim().length === 0) {
    throw new Error("all fields are required");
  }

  //post to the database
  const requestBody = {
    query: `
          mutation CreateEvent( $desc: String!, $username: String! ) {
            CreateMessage( body: $desc, user: $username){
              _id
              body
            }
          }
        `,
    variables: {
      desc: text,
      username: inputUsername,
    },
  };

  fetch("http://localhost:8080/api", {
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
    .then((resData) => {})
    .catch((err) => {
      console.log(err);
    });
};

export default modalConfirmHandler;
