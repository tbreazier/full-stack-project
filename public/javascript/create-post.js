async function newFormHandler(event) {
    event.preventDefault();
  
    // const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="post-content"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.replace('/home');
     } 
    else {
      window.alert("you must log in first!!");
      alert(response.statusText);
    }
  }


  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);