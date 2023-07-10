function Login() {
  return (
    <div>
      <input type="email" data-testid="email-input" placeholder="E-mail" />
      <input type="password" data-testid="password-input" placeholder="Senha" />
      <button data-testid="login-submit-btn">Enter</button>
    </div>
  );
}

export default Login;
