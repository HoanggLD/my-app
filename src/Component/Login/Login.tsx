import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { Logins } from '../../Authorization/Api';
import { Spin } from 'antd';
import { message } from 'antd';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate()
  const [, contextHolder] = message.useMessage();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(Logins, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      } else {
        setSuccessMessage('Đang chuyển sang trang chủ sau 2s');
        setError('')
        setTimeout(() => {
          navigate('/list');
        }, 2000);
      }
    } catch (error) {
      setError('Tài khoản hoặc mật khẩu không chính xác. Vui lòng thử lại.');
      setSuccessMessage('')
    }
  };
  return (
    <div className="containers">
      <form className="form_mains" onSubmit={handleLogin}>
        <p className="heading">Đăng nhập</p>
        {error && <p className="error">{error}</p>}
        {successMessage && <div className='success'>{successMessage}  <p className='icon'>    <Spin size="large" /></p></div>}
        <div className="inputContainer">
          <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#2e2e2e" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
          </svg>
          <input type="email" className="inputField" id="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="inputContainer">
          <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#2e2e2e" viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
          </svg>
          <input type="password" className="inputField" id="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {contextHolder}
        <button type="submit" id="button">Đăng nhập</button>
        <a className="forgotLink" href="/sigin">Đăng ký tài khoản mới.</a>
      </form>
    </div>
  );
};
export default Login;
