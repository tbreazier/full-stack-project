async function editFormHandler(event) {
    console.log("edited");
    event.preventDefault();
  
    // const title = document.querySelector('textarea[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/home');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('#edit-post-form').addEventListener('submit', editFormHandler);