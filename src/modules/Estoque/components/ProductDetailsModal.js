import { useState } from "react";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import Table from "../../../components/table/Table";
import Typography from "../../../components/typography/Typography";
import { formatMoney, profitMargin, roundToTwo } from "../../../utils/money";
import { formatDate } from "../../../utils/date";

const ProductDetailsModal = ({
  isModalOpen,
  toggleModal,
  productDetails,
}) => {
  const [activeTab, setActiveTab] = useState("price-history");
  const closeModal = () => {
    setActiveTab("price-history");
    toggleModal();
  }

  return (
    <Modal width={"95%"} zIndex={9} show={isModalOpen} onClose={closeModal}>
      <Modal.Title width={"100%"}>{productDetails?.name}</Modal.Title>
      <Modal.Content width={"100%"}>
        <div className="estoque-modal-content">
          <div className="estoque-modal-header">
          </div>
          <div className="estoque-modal-info">
            <div className="estoque-modal-info-price-history">
              <div className="estoque-modal-info-price-history-info">
                <Typography variant={"body1"}>Custo médio de compra:</Typography>
                <Typography variant={"body1"}>
                  {formatMoney(productDetails?.averageCost)}
                </Typography>
              </div>
              <div className="estoque-modal-info-price-history-info">
                <Typography variant={"body1"}>Preço médio de venda: </Typography>
                <Typography variant={"body1"}>
                  {formatMoney(productDetails?.averagePrice)}
                </Typography>
              </div>
              <div className="estoque-modal-info-price-history-info">
                <Typography variant={"body1"}>Lucro médio: </Typography>
                <Typography variant={"body1"}>
                  {profitMargin(
                    productDetails?.averageCost,
                    productDetails?.averagePrice
                  )}
                </Typography>
              </div>
            </div>
          </div>
          <div className="estoque-tabs">
            <Button
              variant={activeTab === "price-history" ? "info" : "primary"}
              onClick={() => setActiveTab("price-history")}
              className={activeTab === "price-history" ? "active" : ""}
            >
              Histórico de preço
            </Button>
            <Button
              variant={activeTab === "buy-history" ? "info" : "primary"}
              onClick={() => setActiveTab("buy-history")}
              className={activeTab === "buy-history" ? "active" : ""}
            >
              Histórico de compra
            </Button>
          </div>
          {activeTab === "price-history" && (
            <>
              <Typography variant={"h5"}>Histórico de preço</Typography>
              <Table>
                <Table.Head>
                  <Table.Cell>Data</Table.Cell>
                  <Table.Cell>Antigo custo de compra</Table.Cell>
                  <Table.Cell>Antigo preço de venda</Table.Cell>
                  <Table.Cell>Antiga margem de lucro</Table.Cell>
                  <Table.Cell>Novo custo de compra</Table.Cell>
                  <Table.Cell>Novo preço de venda</Table.Cell>
                  <Table.Cell>Nova margem de lucro</Table.Cell>
                </Table.Head>
                <Table.Body>
                  {productDetails?.PriceHistory.map((history, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{formatDate(history.createdAt)}</Table.Cell>
                      <Table.Cell>{formatMoney(history.oldCost)}</Table.Cell>
                      <Table.Cell>{formatMoney(history.oldPrice)}</Table.Cell>
                      <Table.Cell>{profitMargin(history.oldCost, history.oldPrice)}</Table.Cell>
                      <Table.Cell>{formatMoney(history.newCost)}</Table.Cell>
                      <Table.Cell>{formatMoney(history.newPrice)}</Table.Cell>
                      <Table.Cell>{profitMargin(history.newCost, history.newPrice)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </>
          )}

          {activeTab === "buy-history" && (
            <>
              <Typography variant={"h5"}>Histórico de compra</Typography>
              <Table>
                <Table.Head>
                  <Table.Cell>Data</Table.Cell>
                  <Table.Cell>Custo de compra unitário</Table.Cell>
                  <Table.Cell>Quantidade comprada</Table.Cell>
                  <Table.Cell>Custo total</Table.Cell>
                  <Table.Cell>Preço de venda unitário</Table.Cell>
                </Table.Head>
                <Table.Body>
                  {productDetails?.StockEntries.map((entry, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{formatDate(entry.createdAt)}</Table.Cell>
                      <Table.Cell>{formatMoney(entry.unitCost)}</Table.Cell>
                      <Table.Cell>{roundToTwo(entry.quantity)}</Table.Cell>
                      <Table.Cell>{formatMoney(entry.totalCost)}</Table.Cell>
                      <Table.Cell>{formatMoney(entry.unitPrice)}</Table.Cell>
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

export default ProductDetailsModal;
