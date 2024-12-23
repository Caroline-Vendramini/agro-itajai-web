import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import { formatMoney, profitMargin } from "../../../utils/money";

const ProductOutModal = ({
  productOut,
  setProductOut,
  productOutModal,
  toggleProductOutModal,
  handleSubmitProductOut,
}) => {
  return (
    <Modal show={productOutModal} onClose={() => toggleProductOutModal()}>
      <Modal.Title>Saída do produto do estoque</Modal.Title>
      <Modal.Content>
        <form
          className="estoque-modal-content-register"
          onSubmit={(e) => handleSubmitProductOut(e)}
        >
          <div className="estoque-modal-content-register-inputs">
            <Input
              outerClassname="w350"
              value={productOut?.name}
              readOnly
              label={"Nome do produto"}
            />

            <Input
              outerClassname="w350"
              name="quantity"
              type={"number"}
              onChange={(e) =>
                setProductOut({ ...productOut, quantity: e.target.value })
              }
              label={"Quantidade"}
            />
          </div>

          <div className="estoque-modal-content-register-inputs">
            <Input
              outerClassname="w1third690"
              name="cost"
              readOnly
              value={formatMoney(productOut?.cost)}
              label={"Custo unitátio na compra"}
            />
            <Input
              outerClassname="w1third690"
              name="price"
              readOnly
              value={formatMoney(productOut?.price)}
              label={"Preço unitário de venda"}
            />
            <Input
              outerClassname="w1third690"
              name="profit"
              readOnly
              value={profitMargin(productOut?.cost, productOut?.price)}
              label={"Lucro (%)"}
            />
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default ProductOutModal;
