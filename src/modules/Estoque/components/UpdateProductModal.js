import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import CustomSelect from "../../../components/select/CustomSelect";

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
            <Input outerClassname="w710" value={updateProduct?.name} onChange={
              (e) => setUpdateProduct({ ...updateProduct, name: e.target.value })
            } name="name" required placeholder={"Nome"} label={"Nome do produto"} />
            <Input
              outerClassname="w710"
              name="measureUnit"
              value={updateProduct?.measureUnit}
              onChange={(e) => setUpdateProduct({ ...updateProduct, measureUnit: e.target.value })}
              required
              placeholder={"Kg, Litros, Unidade, Pacote, Saco, etc..."}
              label={"Unidade de medida"}
            />
          </div>

          <div className="estoque-modal-content-register-inputs">
            <CustomSelect
              className="w710"
              id={"brand"}
              name={"brand"}
              placeholder="Marca"
              label={"Marca"}
              required
              value={selectedBrand ? {
                value: selectedBrand,
                label: selectedBrand,
              } : null}
              onChange={(e) => setSelectedBrand(e.value)}
              options={brands.map((brand) => ({
                label: brand,
                value: brand,
              }))}
            />
            <CustomSelect
              className="w710"
              id={"category"}
              name={"category"}
              placeholder="Categoria"
              label={"Categoria"}
              required
              value={selectedCategory ? {
                value: selectedCategory,
                label: selectedCategory,
              } : null}
              onChange={(e) => setSelectedCategory(e.value)}
              options={categories.map((category) => ({
                label: category,
                value: category,
              }))}
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
