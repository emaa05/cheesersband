document
  .getElementById("signupForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    const acceptCheckbox = document.getElementById("accept");
    if (!acceptCheckbox.checked) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "You should accept terms and conditions",
      });
      return;
    }

    try {
      console.log("Data to be sent:", { name, lastName, password, email });
      const response = await axios.post(
        "http://www.cheesersband.backend.com/register",
        {
          name,
          lastName,
          password,
          email,
        }
      );

      handleRegistrationResponse(response);
    } catch (error) {
      handleRegistrationError(error);
    }
  });

function handleRegistrationResponse(response) {
  if (response.status >= 200 && response.status < 300) {
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: "Succesfull register",
    }).then(() => {
      window.location.assign("http://www.cheesersband.frontend.com/logIn.html");
    });
  } else {
    const data = response.data;
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `Error in register: ${data.message}`,
    });
  }
}

function handleRegistrationError(error) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: `Error: ${error.message}`,
  });
  console.error("Error:", error);
}
