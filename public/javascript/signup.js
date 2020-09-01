async function signupFormHandler(event) {
    event.preventDefault();
  
    const firstName = document.querySelector('#firstname').value.trim();
    const lastName = document.querySelector('#lastname').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (firstName && lastName && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        document.location.replace('/home');
      } else {
        alert(response.statusText);
      }
    }
}
  
document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);