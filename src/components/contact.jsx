import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";

const initialState = {
  name: "",
  email: "",
  message: "",
};

export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Existing code to send email to yourself
    emailjs.sendForm('service_gvy0tc1', 'template_d4jfbqd', e.target, 'GM0bgFceMsWrtDbI2')
      .then((result) => {
        console.log(result.text);
        // After sending the notification to yourself, send a response to the sender
        emailjs.send('service_gvy0tc1', 'template_ycuqufw', {
          to_name: name,
          to_email: email,
          response_message: "Thank you for reaching out. We will get back to you soon.",
        }, 'GM0bgFceMsWrtDbI2')
        .then((response) => {
          console.log("Response Email SENT!", response.status, response.text);
          clearState();
        }, (error) => {
          console.log("Response Email FAILED...", error);

        });
        clearState();
      }, (error) => {
        console.log(error.text);
      });
  };
  

  return (
    <div id="contact" className="bg-customcolor text-black py-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
              <p className="mb-8">
                Please fill out the form below to send us an email and we will get back to you as soon as possible.
              </p>
              <form name="sentMessage" onSubmit={handleSubmit}>
                <div className="flex flex-wrap mb-6">
                  <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder="Name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      placeholder="Email"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="px-3">
                  <textarea
                    name="message"
                    value={message}
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    rows="4"
                    placeholder="Message"
                    required
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="px-3 mt-6">
                  <button type="submit" className="bg-transparent hover:bg-white text-black font-semibold hover:text-indigo-500 py-2 px-4 border border-black hover:border-transparent rounded">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <div className="mb-8">
              <h3 className="text-2xl mb-8">CONTACT INFO</h3>
              <div className="mb-4">
                <p>
                  <span className="inline-block mr-4"><i className="fas fa-map-marker-alt"></i> Address</span>
                  {props.data ? props.data.address : "loading"}
                </p>
              </div>
              <div className="mb-4">
                <p>
                  <span className="inline-block mr-4"><i className="fas fa-phone"></i> Phone</span>
                  {props.data ? props.data.phone : "loading"}
                </p>
              </div>
              <div className="mb-8">
                <p>
                  <span className="inline-block mr-4"><i className="fas fa-envelope"></i> Email</span>
                  {props.data ? props.data.email : "loading"}
                </p>
              </div>
            </div>
            <div className="social flex justify-center lg:justify-start">
              <ul className="flex">
                <li className="mr-4">
                  <a href={props.data ? props.data.facebook : "/"}>
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li className="mr-4">
                  <a href={props.data ? props.data.twitter : "/"}>
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href={props.data ? props.data.youtube : "/"}>
                    <i className="fa fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
