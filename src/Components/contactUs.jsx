import React, { useState } from 'react';
import "../Styles/contactUs.css"
import animationData from './send-us-a-message.json'
// import animationData from './customer-service-chat.json'
import Lottie from 'lottie-react';
import Swal from 'sweetalert2';
const ContactUsComponent = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validate();
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Valid email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
    if (Object.keys(errors).length === 0) {
      console.log('Form Submitted', form);
      setForm({ name: '', email: '', message: '' });
      setTouched({});
      Swal.fire({
        title: "Message Sent",
        text: "Thank You",
        icon: "success"
      });  
    }
  };

  return (
    <div className="contactContainer mt-5 h-100 d-flex justify-content-center pt-0">
      <form onSubmit={handleSubmit} className='w-100'>
        <div className='w-100 d-flex align-items-center justify-content-around' >
          <Lottie animationData={animationData} loop={true} style={{ width: '300px' }} />

          <div className='w-50'>
            <div className="form-group w-100">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                type="text"
                id="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
              />
              {touched.name && errors.name && (
                <div className="invalid-feedback">
                  {errors.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
              />
              {touched.email && errors.email && (
                <div className="invalid-feedback">
                  {errors.email}
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            id="message"
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${touched.message && errors.message ? 'is-invalid' : ''}`}
          ></textarea>
          {touched.message && errors.message && (
            <div className="invalid-feedback">
              {errors.message}
            </div>
          )}
        </div>

        <div className='d-flex justify-content-center'>
          <button type="submit" className="btn btn-outline-dark w-25 " disabled={Object.keys(errors).length > 0}>
            Send
          </button>
        </div>

      </form>
    </div>
  );
};

export default ContactUsComponent;
