import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import Select from "../../../components/select/Select";

const UpdateProductModal = ({
  updateProduct,
  setUpdateProduct,
  updateProductModal,
  toggleUpdateProductModal,
  handleSubmitUpdateProduct,
  brands,
  categories,
  selectedBrand,
  selectedCategory,
  setSelectedBrand,
  setSelectedCategory,
}) => {
  return (
    <Modal
      show={updateProductModal}
      onClose={() => toggleUpdateProductModal()}
    >
      <Modal.Title>Atualizar produto</Modal.Title>
      <Modal.Content>
        <form
          className="estoque-modal-content-register"
          onSubmit={(e) => handleSubmitUpdateProduct(e)}
        >
          <div className="estoque-modal-content-register-inputs">
            <Input outerClassname="w350" value={updateProduct?.name} onChange={
              (e) => setUpdateProduct({ ...updateProduct, name: e.target.value })
            } name="name" required placeholder={"Nome"} label={"Nome do produto"} />
            <Input
              outerClassname="w350"
              name="measureUnit"
              value={updateProduct?.measureUnit}
              onChange={(e) => setUpdateProduct({ ...updateProduct, measureUnit: e.target.value })}
              required
              placeholder={"Kg, Litros, Unidade, Pacote, Saco, etc..."}
              label={"Unidade de medida"}
            />
          </div>

          <div className="estoque-modal-content-register-inputs">
            <Select
              outerClassname="w350"
              id={"brand"}
              name={"brand"}
              label="Marca"
              options={brands}
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            />
            <Select
              outerClassname="w350"
              id={"category"}
              name={"category"}
              label="Categoria"
              options={categories}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
          </div>

          <div className="estoque-modal-content-register-inputs">
            <Input
              outerClassname="w710"
              name="description"
              placeholder={"Descrição"}
              label={"Descrição"}
              value={updateProduct?.description}
              onChange={(e) => setUpdateProduct({ ...updateProduct, description: e.target.value })}
            />
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateProductModal;
