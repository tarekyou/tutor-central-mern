import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const mainWidth = "350px";

const [formState, setFormState] = useState({ email: '', password: '' });
const [login, { error }] = useMutation(LOGIN);

const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
    const mutationResponse = await login({
      variables: { email: formState.email, password: formState.password },
    });
    const token = mutationResponse.data.login.token;
    Auth.login(token);
  } catch (e) {
    console.log(e);
  }
};

const handleChange = (event) => {
  const { name, value } = event.target;
  setFormState({
    ...formState,
    [name]: value,
  });
};



  return (

    <div className="my-1">
      <form onSubmit={handleFormSubmit}>
      <Link to="/signup">
      <img src="https://www.freeiconspng.com/uploads/blue-sign-up-button-png-4.png" width={mainWidth} alt="Clipart Collection Png Sign Up Button" /></Link>
        <div className="flex-row space-between my-2">
          <label htmlFor="email">Username✥Email:</label>
          <input
            placeholder="youremail@test.com"
            name="username"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex-row flex-end">
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
