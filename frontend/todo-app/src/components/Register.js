import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const { username, email, password, confirmPassword } = formData;

  const history = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    const errors = {};
    if (!username) {
      errors.username = 'Username is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    } else if (password.length < 8){
      errors.password = "Length should be grater than 8"
    }

    setErrors(errors);

    // If there are no errors, submit the form
    if (Object.keys(errors).length === 0) {
      fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          history('/');
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className='register-container'>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={onChange}
            className={errors.username ? 'input-error' : ''}
          />
          {errors.username && (
            <span className='error'>{errors.username}</span>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className='error'>{errors.email}</span>}
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            className={errors.password ? 'input-error' : ''}
          />
          {errors.password && (
            <span className='error'>{errors.password}</span>
          )}
        </div>
        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={confirmPassword}
            onChange={onChange}
            className={errors.confirmPassword ? 'input-error' : ''}
          />
          {errors.confirmPassword && (
            <span className='error'>{errors.confirmPassword}</span>
          )}
        </div>
        <button type='submit' className='btn-primary'>
         
        Register
    </button>
  </form>
  <p>
    Already have an account? <Link to='/login'>Login</Link>
  </p>
</div>
);
};

export default Register;