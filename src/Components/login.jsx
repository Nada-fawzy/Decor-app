import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/login.css';

const LoginComponent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({ email: false, password: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
    validate();
  };

  const validate = () => {
    const newErrors = { email: '', password: '' };
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    if (!errors.email && !errors.password) {
      console.log(form);
      try {
        const response = await axios.get('http://localhost:3000/users');
        console.log('Response:', response);
        const users = response.data;
        
        const user = users.find(u => u.email === form.email && u.password === form.password);
        if (user) {
          console.log('Login successful');
          localStorage.setItem('id' , user.id)
          navigate('/home');
          
        } else {
          setErrors({ ...errors, form: 'Invalid email or password' });
        }
      } catch (error) {
        console.error(error);
        setErrors({ ...errors, form: 'Error connecting to the server' });
      }
    }
  };

  return (
    <div className="LoginContainer mt-5 w-50">
      <form onSubmit={handleSubmit} className='d-flex align-items-center'>
        <img src='sign-up.png' alt='Login_img' className='w-50' ></img>
        <div className='w-50'>
          <div className="mb-2">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              className="input form-control"
              id="email"
              placeholder='nada20@gmail.com'
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.email && errors.email && (
              <div className="alert alert-danger">
                <p className="m-0">{errors.email}</p>
              </div>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              name="password"
              placeholder='12345678'
              className="input form-control"
              id="password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password && (
              <div className="alert alert-danger">
                <p className="m-0">{errors.password}</p>
              </div>
            )}
          </div>

          {errors.form && (
            <div className="alert alert-danger">
              <p className="m-0">{errors.form}</p>
            </div>
          )}

          <button type="submit" className="button btn btn-outline-dark w-100 mt-4" disabled={errors.email || errors.password}>
            LOGIN
          </button>
        </div>

      </form>
    </div>
  );
};

export default LoginComponent;
