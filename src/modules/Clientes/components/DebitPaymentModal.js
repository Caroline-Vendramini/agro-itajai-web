import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import Typography from "../../../components/typography/Typography";
import { formatMoney } from "../../../utils/money";

const DebitPaymentModal = ({
  payModal,
  togglePayModal,
  payValue,
  setPayValue,
  handlePayDebit,
  customerDetails,
}) => {
  return (
    <Modal
      zIndex={10}
      show={payModal}
      onClose={() => {
        togglePayModal();
        setPayValue("");
      }}
    >
      <Modal.Title>Pagar fiado</Modal.Title>
      <Modal.Content>
        <form
          onSubmit={(e) => handlePayDebit(e)}
          className="clientes-modal-content"
        >
          <Typography variant={"body1"}>
            Cliente: {customerDetails?.name}
          </Typography>
          <Typography variant={"body1"}>
            Fiado:{" "}
            {formatMoney(
              customerDetails?.totalDebit - customerDetails?.totalDebitPaid
            )}
          </Typography>
          <Input
            autoFocus
            value={payValue}
            onChange={(e) => setPayValue(formatMoney(e.target.value))}
            required
            placeholder={"Valor"}
          />
          <Button type="submit">Pagar</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default DebitPaymentModal;
