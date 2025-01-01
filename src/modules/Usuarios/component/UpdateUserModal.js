import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";

const UpdateUserModal = ({
  updateUserModal,
  toggleUpdateUserModal,
  handleSubmitUpdateUser,
  updateUser,
  setUpdateUser,
}) => {
  return (
    <Modal
      show={updateUserModal}
      onClose={() => toggleUpdateUserModal()}
    >
      <Modal.Title>Editar usuário</Modal.Title>
      <Modal.Content>
        <form
          className="usuarios-modal-content"
          onSubmit={(e) => handleSubmitUpdateUser(e)}
        >
          <Input
            value={updateUser?.name}
            onChange={(e) => {
              setUpdateUser({ ...updateUser, name: e.target.value });
            }}
            required
            name={"name"}
            placeholder={"Nome"}
          />
          <Input
            value={updateUser?.username}
            required
            name={"username"}
            placeholder={"Usuário"}
            onChange={(e) => {
              setUpdateUser({
                ...updateUser,
                username: e.target.value,
              });
            }}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateUserModal;
