async function mailerFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#invite-textarea').value.trim();
  
    if (email) {
      const response = await fetch('/send', {
        method: 'post',
        body: JSON.stringify({
          email
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/home');
      } else {
        alert(response.statusText);
      }
    }
  }

  document.querySelector('#invite-a-friend').addEventListener('submit', mailerFormHandler);