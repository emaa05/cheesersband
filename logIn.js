document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    console.log("Email:", email);
    console.log("Password:", password);

    logIn(email, password);
  });

async function logIn(email, password) {
  try {
    const response = await axios.post(
      "http://www.cheesersband.backend.com/login",
      {
        email,
        password,
      }
    );

    console.log("Response:", response);

    if (response.status >= 200 && response.status < 300) {
      localStorage.setItem("accessToken", response.data.token);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Succesfull LogIn",
      }).then(() => {
        window.location.assign(
          "https://cheesersband-frontend.onrender.com/index.html"
        );
      });
    } else {
      const errorData = response.data;
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error on sesion: ${errorData.message}`,
      });
    }
  } catch (error) {
    console.error(":", error);
    console.log(":", error.response);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error",
    });
  }
}
