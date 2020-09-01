async function reply_click(clicked_id)
{
    alert(clicked_id);
    document.location.replace('/viewpost');
    console.log(clicked_id);
}

// async function viewPostFormHandler(event) {
//   event.preventDefault();

//   const email = document.querySelector('#email').value.trim();
//   const password = document.querySelector('#password').value.trim();

//   if (email && password) {
//     const response = await fetch('/api/users/login', {
//       method: 'post',
//       body: JSON.stringify({
//         email,
//         password
//       }),
//       headers: { 'Content-Type': 'application/json' }
//     });

//     if (response.ok) {
//       document.location.replace('/home');
//     } else {
//       alert(response.statusText);
//     }
//   }
// }

  document.querySelector('.post').addEventListener('click', reply_click);