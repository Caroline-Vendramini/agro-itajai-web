import { useState } from "react";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import Table from "../../../components/table/Table";
import Typography from "../../../components/typography/Typography";
import { formatDate } from "../../../utils/date";
import { formatMoney } from "../../../utils/money";

const CustomerDetailsModal = ({
  isModalOpen,
  toggleModal,
  customerDetails,
  togglePayModal,
}) => {
  const [activeTab, setActiveTab] = useState("debits");
  const closeModal = () => {
    setActiveTab("debits");
    toggleModal();
  }
  const closePayModal = () => {
    setActiveTab("debits");
    togglePayModal();
  }
  return (
    <Modal maxWidth={"80%"} zIndex={9} show={isModalOpen} onClose={closeModal}>
      <Modal.Title width={"100%"}>Detalhes do cliente</Modal.Title>
      <Modal.Content width={"100%"}>
        <div className="clientes-modal-content">
          <div className="clientes-modal-header">
            <Typography variant={"h4"}>{customerDetails?.name}</Typography>
            <Typography variant={"body1"}>
              {customerDetails?.nickname}
            </Typography>
            <div className="clientes-modal-info-pay">
              {!!customerDetails?.debits.length && (
                <Button variant="success" onClick={closePayModal}>
                  Pagar fiado
                </Button>
              )}
            </div>
          </div>
          <div className="clientes-modal-info">
            <div className="clientes-modal-info-debits">
              <div className="clientes-modal-info-debits-info">
                <Typography variant={"body1"}>Total comprado fiado:</Typography>
                <Typography variant={"body1"}>
                  {formatMoney(customerDetails?.totalDebit)}
                </Typography>
              </div>
              <div className="clientes-modal-info-debits-info">
                <Typography variant={"body1"}>Total pago: </Typography>
                <Typography variant={"body1"}>
                  {formatMoney(customerDetails?.totalDebitPaid)}
                </Typography>
              </div>
              <div className="clientes-modal-info-debits-info">
                <Typography variant={"body1"}>Fiado devido: </Typography>
                <Typography variant={"body1"}>
                  {formatMoney(
                    customerDetails?.totalDebit -
                    customerDetails?.totalDebitPaid
                  )}
                </Typography>
              </div>
            </div>
          </div>
          <div className="clientes-tabs">
            <Button
              variant={activeTab === "debits" ? "info" : "primary"}
              onClick={() => setActiveTab("debits")}
              className={activeTab === "debits" ? "active" : ""}
            >
              Histórico de fiado
            </Button>
            <Button
              variant={activeTab === "payments" ? "info" : "primary"}
              onClick={() => setActiveTab("payments")}
              className={activeTab === "payments" ? "active" : ""}
            >
              Histórico de pagamentos
            </Button>
          </div>
          {activeTab === "debits" && (
            <>
              <Typography variant={"h5"}>Histórico de fiado</Typography>
              <Table>
                <Table.Head>
                  <Table.Cell>Data</Table.Cell>
                  <Table.Cell>Valor</Table.Cell>
                  {/* TODO: add descrição */}
                  {/* <Table.Cell>Descrição</Table.Cell> */}
                  <Table.Cell>Ação</Table.Cell>
                </Table.Head>
                <Table.Body>
                  {customerDetails?.debits.map((debit, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{formatDate(debit.date)}</Table.Cell>
                      <Table.Cell>{formatMoney(debit.total)}</Table.Cell>
                      {/* <Table.Cell>{debit.description}</Table.Cell> */}
                      <Table.Cell>
                        <Button
                          onClick={() =>
                            console.log(
                              "redireciona para vendas, passando o id da venda"
                            )
                          }
                        >
                          Detalhes
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </>
          )}

          {activeTab === "payments" && (
            <>
              <Typography variant={"h5"}>Histórico de pagamentos</Typography>
              <Table>
                <Table.Head>
                  <Table.Cell>Data</Table.Cell>
                  <Table.Cell>Valor</Table.Cell>
                  {/* TODO: add descrição */}
                  {/* <Table.Cell>Descrição</Table.Cell> */}
                </Table.Head>
                <Table.Body>
                  {customerDetails?.debitsPaid.map((payment, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{formatDate(payment.paymentDate)}</Table.Cell>
                      <Table.Cell>{formatMoney(payment.amount)}</Table.Cell>
                      {/* <Table.Cell>{payment.description}</Table.Cell> */}
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </>
          )}
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default CustomerDetailsModal;
