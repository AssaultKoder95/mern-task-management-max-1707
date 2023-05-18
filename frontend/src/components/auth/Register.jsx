import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../spinner/Spinner';
import classes from './AuthForm.module.scss';

function Register() {
  const [isLoading, setLoadingState] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setLoadingState(true);

    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    setTimeout(async () => {
      try {
        await axios.post(`/api/auth/register`, user);
        toast.success('Registered successfully');
      } catch (err) {
        console.log(err);
        toast.error('Something went wrong');
      }
      setLoadingState(false);
    }, 2000);
  };

  return (
    <div className={classes.register}>
      <h1 className={classes.title}>Register</h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="name">
          Full Name:
          <input name="name" type="text" required />
        </label>
        <label htmlFor="email">
          Email:
          <input name="email" type="email" required />
        </label>
        <br />
        <label htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            required
          />
        </label>
        <br />
        <button type="submit">{isLoading ? <Spinner /> : 'Register'}</button>
      </form>
    </div>
  );
}

export default Register;
