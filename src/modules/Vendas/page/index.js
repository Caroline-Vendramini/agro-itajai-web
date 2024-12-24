import { useCallback, useEffect, useState } from "react";
import { useLoader } from "../../../hooks/useLoader";
import useAxios from "../../../hooks/useAxios";
import { searchString } from "../../../utils/string";
import Typography from "../../../components/typography/Typography";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Table from "../../../components/table/Table";
import "./index.css";
import RegisterOrderModal from "../components/RegisterOrderModal";
import useModal from "../../../hooks/useModal";
import { formatDateToISO } from "../../../utils/date";
import { formatMoney } from "../../../utils/money";

const columns = [
  { Header: "#", accessor: "id" },
  { Header: "Cliente", accessor: "customer" },
  { Header: "Total", accessor: "total" },
  { Header: "Desconto", accessor: "discount" },
  { Header: "Forma de pagamento", accessor: "paymentType" },
  // { Header: "Ação", accessor: "action" },
];
function Vendas() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { showLoader, hideLoader } = useLoader();
  const { fetchData } = useAxios();


  const {
    isModalOpen: registerOrderModal,
    toggleModal: toggleRegisterOrderModal,
  } = useModal();

  const handleSearch = useCallback(() => {
    if (!search) {
      setFilteredOrders(orders);
      return;
    }
    showLoader();
    const filtered = orders.filter(
      (user) =>
        searchString(user.name, search) ||
        searchString(user.username, search) ||
        searchString(user.name + user.username, search) ||
        searchString(user.username + user.name, search)
    );
    setFilteredOrders(filtered);
    hideLoader();
  }, [search, orders]);




  const fetchOrders = useCallback(async () => {
    showLoader();
    try {
      const response = await fetchData({
        url: "/order/store/order",
      });
      const mappedOrders = response.data.map((order) => {
        return {
          ...order,
          customer: `${order.Customer.name} - ${order.Customer.nickname}`,
          total: formatMoney(order.total),
          discount: formatMoney(order.discount),
          paymentType: order.PaymentType.name,
        };
      });
      console.log(mappedOrders)
      setOrders(mappedOrders);
      handleSearch();
    } catch (error) {
      console.error(error);
    }
    hideLoader();
  }, [
    // date ?
  ]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    handleSearch();
  }, [search, orders, handleSearch]);

  const handleSubmitOrder = (items, paymentTypeId, customerId, discount) => {
    const orderItems = items.map((item) => {
      return {
        productId: item.id,
        quantity: item.quantity,
      };
    })

    const data = {
      customerId,
      paymentTypeId,
      discount,
      orderItems,
      date: formatDateToISO(),
    }

    fetchData({
      url: "/order",
      method: "POST",
      data,
    }).then(() => {
      fetchOrders();
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <>
      <div className="vendas-container">
        <RegisterOrderModal
          registerOrderModal={registerOrderModal}
          toggleRegisterOrderModal={toggleRegisterOrderModal}
          handleSubmitOrder={handleSubmitOrder}
        />

        <Typography variant={"h3"}>Usuários</Typography>
        <div className="vendas-search-area">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            outerClassname="vendas-grow"
            placeholder={"Nome ou usuário"}
          />
          <Button variant="success" onClick={() => toggleRegisterOrderModal()}>
            Nova venda
          </Button>
        </div>

        <Table>
          <Table.Head>
            {columns.map((column, index) => (
              <Table.Cell key={index}>{column.Header}</Table.Cell>
            ))}
          </Table.Head>
          <Table.Body>
            {filteredOrders.map((row, index) => (
              <Table.Row key={index}>
                {columns.map((column, index) => (
                  <Table.Cell key={index}>{row[column.accessor]}</Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}

export default Vendas;
