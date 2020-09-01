async function newFormHandler(event) {
    event.preventDefault();
  
    const content = document.querySelector('input[name="post-content"]').value;
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(content)

    if (response.ok) {
<<<<<<< HEAD
      document.location.replace('/homepage');
    } else {
=======
      document.location.replace('/home');
     } 
    else {
>>>>>>> develop
      window.alert("you must log in first!!");
      alert(response.statusText);
    }
  }
<<<<<<< HEAD
  
  document.querySelector('#create-post-form').addEventListener('submit', newFormHandler);
=======


  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
>>>>>>> develop
