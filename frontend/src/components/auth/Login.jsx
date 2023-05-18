import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BsArrowRight } from 'react-icons/bs';
import useAuth from '../../hooks/useAuth';

import classes from './AuthForm.module.scss';
import Spinner from '../spinner/Spinner';

function Login() {
  const [isLoading, setLoadingState] = useState(false);

  const { verifyAuth, auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate('/');
    }
  }, [auth]);

  const login = async (e) => {
    e.preventDefault();
    setLoadingState(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    setTimeout(async () => {
      try {
        await axios.post('/api/auth/login', {
          email,
          password,
        });
        await verifyAuth();
        navigate('/');
        toast.success('Logged in successfully');
        setLoadingState(false);
      } catch (err) {
        console.log(err);
        verifyAuth();
        toast.error('Invalid username / password. Please try again.');
        setLoadingState(false);
      }
    }, 2000);
  };
  return (
    <div className={classes.login}>
      <h1 className={classes.title}>Login</h1>
      <form className={classes.authForm} onSubmit={login}>
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
        <button type="submit">{isLoading ? <Spinner /> : 'Login'}</button>

        <h3>
          {' '}
          Forgot password? reset
          {' '}
          {' '}
          <Link to="/reset-password">
            here
            <BsArrowRight />
          </Link>
        </h3>
      </form>
    </div>
  );
}

export default Login;
