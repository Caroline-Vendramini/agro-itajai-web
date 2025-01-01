import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";

const UpdateCustomerModal = ({
  updateCustomerModal,
  toggleUpdateCustomerModal,
  handleSubmitUpdateCustomer,
  updateCustomer,
  setUpdateCustomer,
}) => {
  return (
    <Modal
      show={updateCustomerModal}
      onClose={() => toggleUpdateCustomerModal()}
    >
      <Modal.Title>Editar cliente</Modal.Title>
      <Modal.Content>
        <form
          className="clientes-modal-content"
          onSubmit={(e) => handleSubmitUpdateCustomer(e)}
        >
          <Input
            value={updateCustomer?.name}
            onChange={(e) => {
              setUpdateCustomer({ ...updateCustomer, name: e.target.value });
            }}
            required
            placeholder={"Nome"}
          />
          <Input
            value={updateCustomer?.nickname}
            placeholder={"Apelido"}
            onChange={(e) => {
              setUpdateCustomer({
                ...updateCustomer,
                nickname: e.target.value,
              });
            }}
          />
          <Input
            value={updateCustomer?.phone}
            placeholder={"Telefone"}
            onChange={(e) => {
              setUpdateCustomer({ ...updateCustomer, phone: e.target.value });
            }}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateCustomerModal;
