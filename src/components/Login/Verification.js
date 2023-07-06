import React from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
    const navigate = useNavigate();
    var temp = {
        to_name : localStorage.getItem("forgetuser"),
        html_message : 'Heeekjnfkenkf, hola',
        subject : "Verify your email",
        to_email : localStorage.getItem("forgetemail"),
        from_name : "APSRTC"
    }
  function sendEmail() {
    // temp.preventDefault();    //This is important, i'm not sure why, but the email won't send without it
    console.log(temp);
    emailjs.send(`service_cxgydkb`, `template_el9p5l8`, temp, `rleDP9eS6hWLfzUYl`)
      .then((result) => {
          //window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          console.log(result);
          navigate('/forget');
      }, (error) => {
          console.log(error.text);
      });
  }
  return (
    // <form className="contact-form" onSubmit={sendEmail}>
    //   <input type="hidden" name="contact_number" />
    //   <label>Name</label>
    //   <input type="text" name="to_name" />
    //   <label>Email</label>
    //   <input type="email" name="to_email" />
    //   <label>Subject</label>
    //   <input type="text" name="subject" />
    //   <label>Message</label>
    //   <textarea name="html_message" />
    //   <input type="submit" value="Send" />
    //    </form>
    sendEmail()
  );
};


export default Verification;