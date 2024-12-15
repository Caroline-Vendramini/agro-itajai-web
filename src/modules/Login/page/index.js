import { useState } from "react";
import axios from "../../../axios";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import Typography from "../../../components/typography/Typography";
import { TOKEN } from "../../../constants";
import useModal from "../../../hooks/useModal";
import useStorage from "../../../hooks/useStorage";
import "./index.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    title: "",
    content: "",
  });
  const { isModalOpen, toggleModal } = useModal();
  const { setValue: setToken, removeValue: removeToken } = useStorage(TOKEN, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username,
        password,
      };
      const result = await axios.post("/auth/signin", data);
      if (result.status === 201) {
        setToken(result.data.access_token);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      removeToken();
      setError({
        title: "Credenciais inválidas",
        content: "Verifique o usuário e senha digitados e tente novamente",
      });
      toggleModal();
    }
  };

  return (
    <div className="container">
      <Modal show={isModalOpen} onClose={toggleModal}>
        <Modal.Title>{error.title}</Modal.Title>
        <Modal.Content>{error.content}</Modal.Content>
        <Modal.Footer>
          <Button onClick={toggleModal}>OK</Button>
        </Modal.Footer>
      </Modal>
      <form onSubmit={handleSubmit} className="content">
        <Typography variant="h2">Login</Typography>
        <Input
          type="text"
          label={"Usuário"}
          placeholder="Digite seu usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          label={"Senha"}
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">ENTRAR</Button>
      </form>
    </div>
  );
}

export default Login;
