import "./index.css"
function Login() {
    return (
      <div className="container">
        <div className="content">
          <h1 className="roboto-black login-title">Login</h1>
          <input className="input" placeholder="Usuário" type="text"/>
          <input className="input" placeholder="Senha" type="password"/>
          <div className="remember">
            <div className="label">
              <input type="checkbox" id="remember-me"/>
              <label htmlFor="remember-me">Lembrar-me</label>
            </div>

            <a className="link">Esqueci minha senha</a>
          </div>
          <button className="button">ENTRAR</button>
        </div>
      </div>
    );
  }
  
  export default Login;
  