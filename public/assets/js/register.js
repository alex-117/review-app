// nodes
const registerButton = document.getElementById('register-button');
const firstName = document.getElementById('register-first-name');
const lastName = document.getElementById('register-last-name');
const email = document.getElementById('register-email');
const password = document.getElementById('register-password');
const passwordMatch = document.getElementById('register-password-match');
const registerError = document.getElementById('register-error-message');

const registerButtonText = {
  default: 'register',
  processing: 'processing',
  success: 'welcome!'
};

// event handlers
registerButton.addEventListener('click', event => {
  event.preventDefault();
  console.log('hit');
  // processing registration
  registerButton.innerText = registerButtonText.processing;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
      passwordMatch: passwordMatch.value
    })
  };

  fetch('/api/user/register', options)
    .then(response => {
      console.log('res: ', response);
      if (response.ok) {
        registerButton.innerText = registerButtonText.success;
        return setTimeout(() => location.href = "/", 1500);
      }

      return response.text().then(errorMessage => {
        registerButton.innerText = registerButtonText.default;
        throw errorMessage;
      });
    })
    .catch(error => registerError.innerText = error);
})