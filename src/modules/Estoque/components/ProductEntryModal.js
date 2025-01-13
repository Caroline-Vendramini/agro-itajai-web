import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import { formatMoney, profitMargin } from "../../../utils/money";

const ProductEntryModal = ({
  productEntry,
  setProductEntry,
  productEntryModal,
  toggleProductEntryModal,
  handleSubmitProductEntry,
}) => {
  return (
    <Modal show={productEntryModal} onClose={() => toggleProductEntryModal()}>
      <Modal.Title>Entrada do produto no estoque</Modal.Title>
      <Modal.Content>
        <form
          className="estoque-modal-content-register"
          onSubmit={(e) => handleSubmitProductEntry(e)}
        >
          <div className="estoque-modal-content-register-inputs">
            <Input
              outerClassname="w350"
              value={productEntry?.name}
              readOnly
              label={"Nome do produto"}
            />

            <Input
              outerClassname="w350"
              name="quantity"
              type={"number"}
              onChange={(e) =>
                setProductEntry({ ...productEntry, quantity: e.target.value })
              }
              label={"Quantidade"}
            />
          </div>

          <div className="estoque-modal-content-register-inputs">
            <Input
              outerClassname="w1third690"
              name="cost"
              required
              value={formatMoney(productEntry?.cost)}
              onChange={(e) =>
                setProductEntry({
                  ...productEntry,
                  cost: formatMoney(e.target.value),
                })
              }
              label={"Custo unitátio na compra"}
            />
            <Input
              outerClassname="w1third690"
              name="price"
              required
              value={formatMoney(productEntry?.price)}
              onChange={(e) =>
                setProductEntry({
                  ...productEntry,
                  price: formatMoney(e.target.value),
                })
              }
              label={"Preço unitário de venda"}
            />
            <Input
              outerClassname="w1third690"
              name="profit"
              readOnly
              value={profitMargin(productEntry?.cost, productEntry?.price, true)}
              label={"Lucro (%)"}
            />
          </div>

          <Button type="submit">Salvar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default ProductEntryModal;
