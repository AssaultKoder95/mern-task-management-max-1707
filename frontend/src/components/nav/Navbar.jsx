import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Auth';
import classes from './Navbar.module.scss';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { verifyAuth } = useContext(AuthContext);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/users/me`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`/api/auth/logout`);
      setUser(null);
      verifyAuth();
      toast.success('Logged out successfully');
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;

  return (
    <header>
      <div className={classes.userInfo}>
        <FaUserAlt className={classes.userIcon} />
        <div>
          <h1 className={classes.name}>{user.name}</h1>
          <p className={classes.email}>{user.email}</p>
        </div>
      </div>
      <nav>
        <Link to="/edit-profile">
          <button className={classes.editBtn} type="button"> Edit </button>
        </Link>
        <button type="button" className={classes.logout} onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}
