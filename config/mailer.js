const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: 'simple.social.fullstack@gmail.com', 
        pass: 'FullStack#2020'
    } 
  }); 
  
  let mailDetails = { 
    from: 'simple.social.fullstack@gmail.com', 
    to: 'simple.social.fullstack@gmail.com', 
    subject: 'Test mail', 
    text: 'Node.js testing mail for GeeksforGeeks'
  }; 
  
  mailTransporter.sendMail(mailDetails, function(err, data) { 
    if(err) { 
        console.log('Error Occurs'); 
    } else { 
        console.log('Email sent successfully'); 
    } 
  });


document.getElementById("#invite-btn").addEventListener("click", mail.send());