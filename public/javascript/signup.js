async function signupFormHandler(event) {
    event.preventDefault();
  
    const first = document.querySelector('#firstname').value.trim();
    const last = document.querySelector('#lastname').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (first && last && email && password) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          first,
          last,
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