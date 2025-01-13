import { useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import Table from "../../../components/table/Table";
import Typography from "../../../components/typography/Typography";
import { formatDate } from "../../../utils/date";
import { formatMoney } from "../../../utils/money";

const columns = [
  { Header: "Produto", accessor: "product" },
  { Header: "Quantidade", accessor: "quantity" },
  { Header: "Preço unitário", accessor: "unitPrice" },
  { Header: "Total", accessor: "total" },
];

const OrderDetailsModal = ({
  orderDetails,
  showModal,
  toggleOrderDetailsModalOpen,
}) => {
  const [items, setItems] = useState([]);
  const nickname = orderDetails?.Customer?.nickname

  useEffect(() => {
    if (orderDetails === null) return;
    const newItems = orderDetails.Items.map((item) => {
      return {
        ...item,
        total: formatMoney(item.unitPrice * item.quantity),
        unitPrice: formatMoney(item.unitPrice),
        product: item.Product.name,
      };
    });
    setItems(newItems);
  }, [orderDetails]);

  return (
    <>
      <Modal
        zIndex={12}
        show={showModal}
        onClose={() => toggleOrderDetailsModalOpen()}
        width={"80%"}
      >
        <Modal.Title>Detalhes da venda #{orderDetails?.id}</Modal.Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">
            Cliente: {orderDetails?.Customer.name}{" "}
            {
              nickname && (
                <Typography variant="span">
                  ({orderDetails?.Customer.nickname})
                </Typography>
              )
            }
            <Typography variant="span">
              {" "}
              - {formatDate(orderDetails?.date || null)}
            </Typography>
          </Typography>
          <Typography variant="h6">
            Desconto: {formatMoney(orderDetails?.discount)}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">
            Forma de pagamento: {orderDetails?.PaymentType.name}
          </Typography>
          <Typography variant="h6">
            Total: {formatMoney(orderDetails?.total)}
          </Typography>
        </div>
        <Modal.Content>
          <Table>
            <Table.Head>
              {columns.map((column, index) => (
                <Table.Cell key={index}>{column.Header}</Table.Cell>
              ))}
            </Table.Head>
            <Table.Body>
              {items.map((row, index) => (
                <Table.Row key={index}>
                  {columns.map((column, index) => (
                    <Table.Cell key={index}>{row[column.accessor]}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default OrderDetailsModal;
