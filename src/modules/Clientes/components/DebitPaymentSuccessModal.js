import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import Typography from "../../../components/typography/Typography";

const DebitPaymentSuccessModal = ({
  feedbackModal,
  toggleFeedbackModal,
  payValue,
  setPayValue,
  customerDetails,
}) => {
  return (
    <Modal
      zIndex={11}
      show={feedbackModal}
      onClose={() => {
        toggleFeedbackModal();
        setPayValue("");
      }}
      width={'300px'}
    >
      <Modal.Title>Pagamento registrado</Modal.Title>
      <Modal.Content>
        <div className="clientes-modal-content">
          <Typography variant={"body1"}>
            Cliente: {customerDetails?.name}
          </Typography>
          <Typography variant={"body1"}>Valor: {payValue}</Typography>
          <Button
            onClick={() => {
              toggleFeedbackModal();
              setPayValue("");
            }}
          >
            Fechar
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default DebitPaymentSuccessModal;
