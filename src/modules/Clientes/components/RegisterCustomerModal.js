import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";

const RegisterCustomerModal = ({
  registerCustomerModal,
  toggleRegisterCustomerModal,
  handleSubmitCustomer,
}) => {
  return (
    <Modal
      show={registerCustomerModal}
      onClose={() => toggleRegisterCustomerModal()}
    >
      <Modal.Title>Cadastrar cliente</Modal.Title>
      <Modal.Content>
        <form
          className="clientes-modal-content"
          onSubmit={(e) => handleSubmitCustomer(e)}
        >
          <Input name="name" required placeholder={"Nome"} />
          <Input name="nickname" placeholder={"Apelido"} />
          <Input name="phone" placeholder={"Telefone"} />
          <Button type="submit">Cadastrar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterCustomerModal;
