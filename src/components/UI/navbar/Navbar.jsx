import React, {useContext} from 'react';
import cl from './Navbar.module.css'
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context";
import MyButton from "../button/MyButton";

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

  return (
    <nav className={cl.navbar}>
      <Link className={cl.navbar__item} to="/about">О сайте</Link>
      <Link className={cl.navbar__item} to="/posts">Посты</Link>
      <Link className={cl.navbar__item} to="/postsRibbon">Посты лентой</Link>
      {isAuth && <MyButton onClick={logout}>Выйти</MyButton>}
    </nav>
  );
};

export default Navbar;
