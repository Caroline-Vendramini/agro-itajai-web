import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";

const AddCategoryModal = ({
  addCategoryModal,
  toggleAddCategoryModal,
  handleSubmitCategory,
}) => {
  return (
    <Modal
      zIndex={11}
      show={addCategoryModal}
      onClose={() => toggleAddCategoryModal()}
    >
      <Modal.Title>Cadastrar categoria</Modal.Title>
      <Modal.Content>
        <form
          className="estoque-modal-content-register"
          onSubmit={(e) => handleSubmitCategory(e)}
        >
          <div className="estoque-modal-content-register-inputs">
            <Input name="name" required placeholder={"Nome"} label={"Nome da categoria"} />
          </div>

          <Button type="submit">Cadastrar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default AddCategoryModal;
