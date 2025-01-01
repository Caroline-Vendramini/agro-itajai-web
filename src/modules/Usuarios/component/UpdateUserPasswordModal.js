import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";

const UpdateUserPasswordModal = ({
  updateUserPasswordModal,
  toggleUpdateUserPasswordModal,
  handleSubmitUpdateUserPassword,
  updateUserPassword,
  setUpdateUserPassword,
}) => {
  return (
    <Modal
      width={'400px'}
      show={updateUserPasswordModal}
      onClose={() => toggleUpdateUserPasswordModal()}
    >
      <Modal.Title>Editar senha do usuário</Modal.Title>
      <Modal.Content>
        <form
          className="usuarios-modal-content"
          onSubmit={(e) => handleSubmitUpdateUserPassword(e)}
        >
          <Input
            value={updateUserPassword?.password}
            onChange={(e) => {
              setUpdateUserPassword({ ...updateUserPassword, password: e.target.value });
            }}
            required
            name={"password"}
            placeholder={"Senha"}
          />
          <Input
            value={updateUserPassword?.repeatedPassword}
            required
            name={"repeatedPassword"}
            placeholder={"Repetir a senha"}
            onChange={(e) => {
              setUpdateUserPassword({
                ...updateUserPassword,
                repeatedPassword: e.target.value,
              });
            }}
          />
          <Button type="submit">Salvar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateUserPasswordModal;
