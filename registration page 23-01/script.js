
const passwordInput = document.getElementById('new-password');
const togglePasswordButton = document.getElementById('toggle-password');


togglePasswordButton.addEventListener('click', () => {

  const currentType = passwordInput.type;

  if (currentType === 'password') {
    passwordInput.type = 'text';
    togglePasswordButton.textContent = 'Hide';
  } else {
    passwordInput.type = 'password';
    togglePasswordButton.textContent = 'Show'; 
  }
});
