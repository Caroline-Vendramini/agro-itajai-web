// import { useState } from "react";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import Typography from "../../../components/typography/Typography";
import { formatMoney } from "../../../utils/money";

const BalanceDetailsModal = ({
  isModalOpen,
  toggleModal,
  balanceDetails,
  closeBalance,
  date,
}) => {
  // const [activeTab, setActiveTab] = useState("cashins");
  const closeModal = () => {
    // setActiveTab("cashins");
    toggleModal();
  };
  return (
    balanceDetails && (
      <Modal width={"80%"} zIndex={9} show={isModalOpen} onClose={closeModal}>
        <Modal.Title width={"100%"}>
          Detalhes do caixa do dia {date}
        </Modal.Title>
        <Modal.Content width={"100%"}>
          <div className="balance-details-modal-content">
            <div className="balance-details-modal-header">
              <Typography variant={"h4"}>
                Caixa {balanceDetails.closed ? "Fechado" : "Aberto"}
              </Typography>
              <div className="balance-details-modal-info-pay">
                {!balanceDetails?.closed && (
                  <Button
                    variant="success"
                    onClick={() => closeBalance(balanceDetails.balanceId)}
                  >
                    Fechar caixa
                  </Button>
                )}
              </div>
            </div>
            <div className="dashboard-cards-container">
              <div className="dashboard-cards-container-areas">
                <div className="dashboard-paymenttypesales">
                  <Typography variant={"h5"}>
                    Venda por forma de pagamento
                  </Typography>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {balanceDetails.ordersByPaymentMethodForTheDay?.map(
                      ({ item, value }) => (
                        <li key={item} className="flex-space-between">
                          <Typography
                            variant={"span"}
                            style={{ fontSize: "14px" }}
                          >
                            {item}
                          </Typography>
                          <span
                            style={{
                              fontWeight: "bold",
                              color: item === "Fiado" ? "red" : "green",
                            }}
                          >
                            {formatMoney(value)}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="dashboard-receipts">
                  <div className="flex-column">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <Typography variant={"h5"}>Recebimentos</Typography>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        <li className="flex-space-between">
                          <Typography
                            variant={"span"}
                            style={{ fontSize: "14px" }}
                          >
                            Vendas em dinheiro
                          </Typography>
                          <Typography variant={"span"} className="gree-bold">
                            {formatMoney(balanceDetails.moneyOrders)}
                          </Typography>
                        </li>
                        <li className="flex-space-between">
                          <Typography
                            variant={"span"}
                            style={{ fontSize: "14px" }}
                          >
                            Pagamento de fiados
                          </Typography>
                          <Typography variant={"span"} className="gree-bold">
                            {formatMoney(balanceDetails.debitPaymentsToday)}
                          </Typography>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  className="total-saled-today"
                  title="Lembre-se de que o lucro bruto não é o lucro líquido. O lucro bruto é o valor total das vendas menos o custo dos produtos vendidos. Você ainda precisa subtrair as despesas operacionais, como aluguel, água, luz e impostos, para calcular o lucro líquido."
                >
                  <Typography variant={"h5"}>Total vendido hoje</Typography>
                  <span className="gree-bold">
                    {formatMoney(balanceDetails?.totalPrice)}
                  </span>
                </div>
                <div
                  className="total-discount"
                  title="Lembre-se de que o lucro bruto não é o lucro líquido. O lucro bruto é o valor total das vendas menos o custo dos produtos vendidos. Você ainda precisa subtrair as despesas operacionais, como aluguel, água, luz e impostos, para calcular o lucro líquido."
                >
                  <Typography variant={"h5"}>
                    Total de desconto concedido
                  </Typography>
                  <span
                    className={balanceDetails.discount > 0 ? "red-bold" : ""}
                  >
                    {formatMoney(balanceDetails.discount)}
                  </span>
                </div>
                <div
                  className="today-profit"
                  title="Lembre-se de que o lucro bruto não é o lucro líquido. O lucro bruto é o valor total das vendas menos o custo dos produtos vendidos.
              Você ainda precisa subtrair as despesas operacionais, como aluguel, água, luz e impostos, para calcular o lucro líquido."
                >
                  <Typography variant={"h5"}>Lucro bruto do dia</Typography>
                  <span className="gree-bold">
                    {formatMoney(
                      balanceDetails.totalPrice - balanceDetails.totalCost
                    )}{" "}
                    (
                    {(
                      (balanceDetails.totalPrice
                        ? (balanceDetails.totalPrice -
                          balanceDetails.totalCost) /
                        balanceDetails.totalPrice
                        : 0) * 100
                    ).toFixed(2)}
                    %)
                  </span>
                </div>
                <div className="month-profit">
                  <Typography variant={"h5"}>
                    {balanceDetails.totalPrice - balanceDetails.totalCost > 0
                      ? "Houve Lucro"
                      : "Não houve lucro"}
                  </Typography>
                </div>
              </div>
            </div>
            {/* <div className="balance-details-tabs">
            <Button
              variant={activeTab === "cashins" ? "info" : "primary"}
              onClick={() => setActiveTab("cashins")}
              className={activeTab === "cashins" ? "active" : ""}
            >
              Entradas de caixa
            </Button>
            <Button
              variant={activeTab === "cashouts" ? "info" : "primary"}
              onClick={() => setActiveTab("cashouts")}
              className={activeTab === "cashouts" ? "active" : ""}
            >
              Saídas de caixa
            </Button>
          </div> */}
            {/* {activeTab === "cashins" && (
            <>
              <Typography variant={"h5"}>Histórico de fiado</Typography>
              <Table>
                <Table.Head>
                  <Table.Cell>Data</Table.Cell>
                  <Table.Cell>Valor</Table.Cell>
                  <Table.Cell>Loja</Table.Cell>
                  <Table.Cell>Ação</Table.Cell>
                </Table.Head>
                <Table.Body>
                  {balanceDetails?.debits?.map((debit, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{formatDate(debit.date)}</Table.Cell>
                      <Table.Cell>{formatMoney(debit.total)}</Table.Cell>
                      <Table.Cell>{debit.Store.name}</Table.Cell>
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

          {activeTab === "cashouts" && (
            <>
              <Typography variant={"h5"}>Histórico de pagamentos</Typography>
              <Table>
                <Table.Head>
                  <Table.Cell>Data</Table.Cell>
                  <Table.Cell>Valor</Table.Cell>
                  <Table.Cell>Loja</Table.Cell>
                </Table.Head>
                <Table.Body>
                  {balanceDetails?.debitsPaid?.map((payment, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{formatDate(payment.paymentDate)}</Table.Cell>
                      <Table.Cell>{formatMoney(payment.amount)}</Table.Cell>
                      <Table.Cell>{payment.Store.name}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </>
          )} */}
          </div>
        </Modal.Content>
      </Modal>
    )
  );
};

export default BalanceDetailsModal;
