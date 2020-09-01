async function newFormHandler(event) {
    event.preventDefault();
  
    const post_content = document.querySelector('input[name="post-content"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      window.alert("you must log in first!!");
      alert(response.statusText);
    }
  }
  
  document.querySelector('#create-post-form').addEventListener('submit', newFormHandler);