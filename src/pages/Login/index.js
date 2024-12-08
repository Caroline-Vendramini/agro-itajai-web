import Button from "../../components/button/Button";
import Checkbox from "../../components/checkbox/Checkbox";
import Input from "../../components/input/Input";
import Typography from "../../components/typography/Typography";

import "./index.css"
function Login() {
    return (
      <div className="container">
        <div className="content">
          <Typography variant="h2">
            Login
          </Typography>
          <Input
            type="text"
            label={"Usuário"}
            placeholder="Digite seu usuário"
            // value={value}
            // onChange={handleInputChange}
          />
          <Input
            type="password"
            label={"Senha"}
            placeholder="Digite sua senha"
            // value={value}
            // onChange={handleInputChange}
          />
          <div className="remember">
            <Checkbox
              label="Lembrar-me"
              // checked={isChecked}
              // onChange={handleCheckboxChange}
            />

            <a className="link">Esqueci minha senha</a>
          </div>
          <Button onClick={() => alert('Botão clicado!')}>ENTRAR</Button>

        </div>
      </div>
    );
  }
  
  export default Login;
  