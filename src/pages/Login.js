import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../styles/Login.css';
import logo from '../images/logo.svg';
import tomato from '../images/tomato.svg';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isButtonDisabled,
    setButtonDisabled,
  } = useContext(RecipesContext);

  useEffect(() => {
    const regex = /\S+@\S+\.\S+/;
    const n = 6;
    if (regex.test(email) && password.length > n) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password, setButtonDisabled]);

  const history = useHistory();
  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div className="login-page">
      <img src={ logo } alt="logo" className="logo" />
      <img src={ tomato } alt="" className="tomato" />
      <div className="login-form">
        <p>LOGIN</p>
        <form className="login-inputs">
          <input
            type="email"
            data-testid="email-input"
            name="email"
            placeholder="Email"
            onChange={ (e) => { setEmail(e.target.value); } }
          />
          <input
            type="password"
            data-testid="password-input"
            name="password"
            placeholder="Password"
            onChange={ (e) => { setPassword(e.target.value); } }
          />
          <button
            type="submit"
            data-testid="login-submit-btn"
            disabled={ isButtonDisabled }
            onClick={ handleClick }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
