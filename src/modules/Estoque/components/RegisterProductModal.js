import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import Select from "../../../components/select/Select";
import { formatMoney, ignoreNaN, moneyToNumber, profitMargin, roundToTwo } from "../../../utils/money";

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
              value={profitMargin(cost, price)}
              label={"Lucro (%)"}
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
