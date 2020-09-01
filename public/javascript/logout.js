async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
  
    if (response.ok) {
      document.location.replace('/landingpage');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#log-out-btn').addEventListener('click', logout);