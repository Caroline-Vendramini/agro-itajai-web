import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import { formatMoney, ignoreNaN, moneyToNumber, profitMargin, roundToTwo } from "../../../utils/money";

const UpdateProductPriceModal = ({
  updateProductPrice,
  setUpdateProductPrice,
  updateProductPriceModal,
  toggleUpdateProductPriceModal,
  handleSubmitUpdateProductPrice,
}) => {
  return (
    <Modal
      show={updateProductPriceModal}
      onClose={() => toggleUpdateProductPriceModal()}
    >
      <Modal.Title>Atualizar preço do produto</Modal.Title>
      <Modal.Content>
        <form
          className="estoque-modal-content-register"
          onSubmit={(e) => handleSubmitUpdateProductPrice(e)}
        >
          <div className="estoque-modal-content-register-inputs">
            <Input outerClassname="w350" value={updateProductPrice?.name} readOnly label={"Nome do produto"} />

            <Input
              outerClassname="w350"
              name="profit"
              readOnly
              value={profitMargin(updateProductPrice?.cost, updateProductPrice?.price)}
              label={"Lucro (%)"}
            />
          </div>

          <div className="estoque-modal-content-register-inputs">
            <Input
              outerClassname="w350"
              name="cost"
              required
              value={formatMoney(updateProductPrice?.cost)}
              onChange={(e) => setUpdateProductPrice({ ...updateProductPrice, cost: formatMoney(e.target.value) })}
              label={"Custo unitátio na compra"}
            />
            <Input
              outerClassname="w350"
              name="price"
              required
              value={formatMoney(updateProductPrice?.price)}
              onChange={(e) => setUpdateProductPrice({ ...updateProductPrice, price: formatMoney(e.target.value) })}
              label={"Preço unitário de venda"}
            />
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateProductPriceModal;
