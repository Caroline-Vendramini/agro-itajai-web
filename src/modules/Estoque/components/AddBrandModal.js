import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";

const AddBrandModal = ({
  addBrandModal,
  toggleAddBrandModal,
  handleSubmitBrand,
}) => {
  return (
    <Modal
      zIndex={11}
      show={addBrandModal}
      onClose={() => toggleAddBrandModal()}
    >
      <Modal.Title>Cadastrar marca</Modal.Title>
      <Modal.Content>
        <form
          className="estoque-modal-content-register"
          onSubmit={(e) => handleSubmitBrand(e)}
        >
          <div className="estoque-modal-content-register-inputs">
            <Input name="name" required placeholder={"Nome"} label={"Nome da marca"} />
          </div>

          <Button type="submit">Cadastrar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default AddBrandModal;
