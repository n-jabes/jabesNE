import React, { useRef, useState } from 'react';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faLinkedin,
  faGoogle,
} from '@fortawesome/free-brands-svg-icons';

function Forms() {
  const [opened, setOpened] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const formRef = useRef(null);

  const handleBtnClicked = () => {
    return setOpened(!opened);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();

    // Clear the form data
    formRef.current.reset();
  };

  const sendRequest = () => {
    console.log('formdata: ' + formData);
    fetch('http://localhost:5000/register', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    sendLoginRequest();

    // Clear the form data
    formRef.current.reset();
  };

  const sendLoginRequest = () => {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(loginFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 'ok') {
          window.localStorage.setItem('token', JSON.stringify(data.data));
          window.location.href = './home'
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div
      className={opened ? 'container  right-panel-active' : 'container'}
      id="main"
    >
      {/* signup  */}
      <div className="sign-up">
        <form onSubmit={handleSubmit} ref={formRef}>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <div className="social-container">
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} style={{ color: '#525252' }} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faGoogle} style={{ color: '#525252' }} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faLinkedin} style={{ color: '#525252' }} />
            </a>
          </div>
          <p>Or use your Email for registration</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required={true}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required={true}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone number"
            required={true}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            onChange={handleInputChange}
          />
          <button type="submit" onClick={() => handleBtnClicked()}>
            Sign Up
          </button>
        </form>
      </div>

      {/* login  */}
      <div className="sign-in">
        <form onSubmit={handleLoginSubmit} ref={formRef}>
          <h1>Login</h1>
          <div className="social-container">
            <a href="#">
              <FontAwesomeIcon icon={faFacebook} style={{ color: '#525252' }} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faGoogle} style={{ color: '#525252' }} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faLinkedin} style={{ color: '#525252' }} />
            </a>
          </div>
          <p>Or log into an existing account</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required={true}
            onChange={handleLoginInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            onChange={handleLoginInputChange}
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Login</button>
        </form>
      </div>

      {/* overlay  */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-left">
            <h1>Welcome back!</h1>
            <p>
              To keep connected with us please log in with your personal info
            </p>
            <button id="signIn" onClick={() => handleBtnClicked()}>
              Sign In
            </button>
          </div>
          <div className="overlay-right">
            <h1>Hello, Friend</h1>
            <p>Enter your personal details and start your journey with us</p>
            <button id="signUp" onClick={() => handleBtnClicked()}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forms;
