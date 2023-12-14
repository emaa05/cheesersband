document.addEventListener("DOMContentLoaded", function () {
  const logOutButton = document.getElementById("logOutButton");

  if (logOutButton) {
    logOutButton.addEventListener("click", function () {
      logout();
    });
  }

  async function logout() {
    try {
      localStorage.removeItem("accessToken");
      const response = await axios.post(
        "https://cheesersband-backend.onrender.com/logout",
        {},
        {}
      );

      if (response.status >= 200 && response.status < 300) {
        Swal.fire({
          icon: "success",
          title: "Succesfull Log Out",
          text: "See You Soon!",
        }).then(() => {
          window.location.assign(
            "https://cheesersband-frontend.onrender.com/index.html"
          );
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Log Out Error",
          text: `Error: ${response.statusText}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Log Out Error",
        text: `Error: ${error.message}`,
      });
    }
  }
});
