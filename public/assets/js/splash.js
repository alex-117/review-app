// Splash logic
const loginButton = document.getElementById('login-button');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const splashError = document.getElementById('splash-error-message');

const loginButtonText = {
  default: 'login',
  processing: 'processing',
  success: 'success'
};

// login button event listener
loginButton.addEventListener('click', event => {
  event.preventDefault();

  // login processing
  loginButton.innerText = loginButtonText.processing;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value
    })
  };

  fetch('/api/user/login', options)
    .then(response => {
      if (response.ok) {
        loginButton.innerText = loginButtonText.success;
        return location.reload();
      }

      return response.text().then(errorMessage => {
        loginButton.innerText = loginButtonText.default;
        throw errorMessage;
      })
    })
    .catch(error => splashError.innerText = error);
});