console.log('Script loaded');

document.addEventListener("DOMContentLoaded", function () {
  checkUserAuthentication();

  async function checkUserAuthentication() {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('https://cheesersband-backend.onrender.com/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

      console.log('Response from /user:', response);

      if (response.status === 200) {
        const userData = response.data;

        if (userData && userData.user && userData.user.name) {
          console.log('User name found:', userData.user.name);
          updateUserName(userData.user.name);
        } else {
          console.error('Error: username not found.');
          showLoginMessage();
        }
      } else {
        console.error('username info not found:', response.statusText);

        if (response.status === 401) {
          redirectToLogin();
        } else {
          showLoginMessage();
        }
      }
    } catch (error) {
      console.error('user info not found:', error);
      showLoginMessage();
    }
  }

  function updateUserName(userName) {
    const userNameContainer = document.getElementById("user-name-container");
    userNameContainer.textContent = `${userName}!`;
  }

  function showLoginMessage() {
    const userNameContainer = document.getElementById("user-name-container");
    const userWelcomeMessage = '';

    const storedUserName = userNameContainer.textContent.trim();

    if (storedUserName) {
      userNameContainer.textContent = `${userWelcomeMessage}, ${storedUserName}!`;
    } else {
      userNameContainer.textContent = `${userWelcomeMessage}`;
    }
  }

  function redirectToLogin() {
    window.location.assign('https://cheesersband-frontend.onrender.com/index.html?');
  }
});
