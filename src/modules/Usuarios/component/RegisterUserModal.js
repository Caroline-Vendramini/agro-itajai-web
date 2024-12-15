import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";

const RegisterUserModal = ({
  registerUserModal,
  toggleRegisterUserModal,
  handleSubmitUser,
}) => {
  return (
    <Modal
      show={registerUserModal}
      onClose={() => toggleRegisterUserModal()}
    >
      <Modal.Title>Cadastrar usuário</Modal.Title>
      <Modal.Content>
        <form
          className="usuarios-modal-content"
          onSubmit={(e) => handleSubmitUser(e)}
        >
          <Input name="name" required placeholder={"Nome"} />
          <Input name="username" required placeholder={"Usuário"} />
          <Input name="password" required placeholder={"Senha"} />
          <Input name="repeatedPassword" required placeholder={"Repetir a senha"} />
          <Button type="submit">Cadastrar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterUserModal;
