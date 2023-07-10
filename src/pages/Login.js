import { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';

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

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        name="email"
        placeholder="E-mail"
        onChange={ (e) => { setEmail(e.target.value); } }
      />
      <input
        type="password"
        data-testid="password-input"
        name="password"
        placeholder="Senha"
        onChange={ (e) => { setPassword(e.target.value); } }
      />
      <button
        data-testid="login-submit-btn"
        disabled={ isButtonDisabled }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
