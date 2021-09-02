import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const LoginPage = () => {
  const {setIsAuth} = useContext(AuthContext)
  const login = () => {
    setIsAuth(true)
    localStorage.setItem('auth', 'true')
  }

  return (
    <div className='loginPage'>
      <form>
        <MyInput type="text" placeholder="Логин"/>
        <MyInput type="password" placeholder="Пароль"/>
        <MyButton onClick={login}> Войти </MyButton>
      </form>
    </div>
  );
};

export default LoginPage;
