

import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import Typography from "../../components/typography/Typography";
import "./index.css"
function Senha() {
  return (
    <div className="container">
      <div className="content">
        <Typography variant="h2">
          Senha
        </Typography>
        <Input
          type="text"
          label={"Usuário"}
          placeholder="Digite seu usuário"
        />
        <Input
          type="password"
          label={"Senha"}
          placeholder="Digite sua nova senha"
        />
         <Input
          type="password"
          label={"Senha"}
          placeholder="Repita sua nova senha"
        />
        <Button onClick={() => alert('Senha alterada com sucesso!')}>CRIAR</Button>
      </div>
    </div>
  );
}
  
  export default Senha;
  