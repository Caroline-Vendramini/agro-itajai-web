import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import CustomSelect from "../../../components/select/CustomSelect";
import { formatMoney, profitMargin } from "../../../utils/money";

const RegisterProductModal = ({
  registerProductModal,
  toggleRegisterProductModal,
  handleSubmitProduct,
  price,
  setPrice,
  cost,
  setCost,
  brands,
  categories,
  selectedBrand,
  selectedCategory,
  setSelectedBrand,
  setSelectedCategory,
}) => {
  return (
    <Modal
      show={registerProductModal}
      onClose={() => toggleRegisterProductModal()}
      width={"80%"}
      maxWidth={"1152px"}
    >
      <Modal.Title>Cadastrar produto</Modal.Title>
      <Modal.Content>
        <form
          className="estoque-modal-content-register"
          onSubmit={(e) => handleSubmitProduct(e)}
        >
          <div className="estoque-modal-content-register-inputs">
            <Input outerClassname="w350" name="name" required placeholder={"Nome"} label={"Nome do produto"} />
            <Input
              outerClassname="w350"
              name="measureUnit"
              required
              placeholder={"Kg, Litros, Unidade, Pacote, Saco, etc..."}
              label={"Unidade de medida"}
            />
            <Input
              outerClassname="w350"
              name="stock"
              type={"number"}
              required
              label={"Quantidade comprada"}
            />
          </div>

          <div className="estoque-modal-content-register-inputs">
            <Input
              outerClassname="w350"
              name="cost"
              required
              value={cost}
              onChange={(e) => setCost(formatMoney(e.target.value))}
              label={"Custo unitátio na compra"}
            />
            <Input
              outerClassname="w350"
              name="price"
              required
              value={price}
              onChange={(e) => setPrice(formatMoney(e.target.value))}
              label={"Preço unitário de venda"}
            />
            <Input
              outerClassname="w350"
              name="profit"
              readOnly
              value={profitMargin(cost, price, true)}
              label={"Lucro (%)"}
            />
          </div>

          <div className="estoque-modal-content-register-inputs">
            <CustomSelect
              className="w350"
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
              className="w350"
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
            <Input
              outerClassname="w350"
              name="description"
              placeholder={"Descrição"}
              label={"Descrição"}
            />
          </div>

          <Button type="submit">Cadastrar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default RegisterProductModal;
