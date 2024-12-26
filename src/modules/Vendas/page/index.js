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
import { formatDate, formatDateToISO } from "../../../utils/date";
import { formatMoney } from "../../../utils/money";
import { DayPicker } from "react-day-picker";
import { ptBR } from 'date-fns/locale';
import "react-day-picker/style.css";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

const columns = [
  { Header: "#", accessor: "id" },
  { Header: "Data", accessor: "date" },
  { Header: "Cliente", accessor: "customer" },
  { Header: "Total", accessor: "total" },
  { Header: "Desconto", accessor: "discount" },
  { Header: "Forma de pagamento", accessor: "paymentType" },
  { Header: "Ação", accessor: "action" },
];
function Vendas() {

  const { showLoader, hideLoader } = useLoader();
  const { fetchData } = useAxios();
  const location = useLocation()
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showSelectDay, setShowSelectDay] = useState(false);

  const {
    isModalOpen: registerOrderModal,
    toggleModal: toggleRegisterOrderModal,
  } = useModal(location.state?.newSale);

  useEffect(() => {
    if (location.state?.newSale) {
      navigate(location.pathname, { state: { newSale: false } });
    }
  }, []);

  const handleSearch = useCallback(() => {
    if (!search) {
      setFilteredOrders(orders);
      return;
    }
    showLoader();
    const filtered = orders.filter(
      (order) =>
        searchString(order.Customer?.name, search) ||
        searchString(order.Customer?.nickname, search) ||
        searchString(order.Customer?.name + order.Customer?.nickname, search) ||
        searchString(order.Customer?.nickname + order.Customer?.name, search) ||
        searchString(order.paymentType, search) ||
        searchString(order.total, search) ||
        searchString(order.discount, search)
    );
    setFilteredOrders(filtered);
    hideLoader();
  }, [search, orders]);


  useEffect(() => {
    handleSearch();
  }, [orders, handleSearch]);

  const fetchOrders = useCallback(async () => {
    showLoader();
    try {
      const date = formatDateToISO(selectedDate)
      const response = await fetchData({
        url: `order/date/${date}/order`,
      });
      const mappedOrders = response.data.map((order) => {
        return {
          ...order,
          date: formatDate(order.date),
          customer: `${order.Customer.name} - ${order.Customer.nickname}`,
          total: formatMoney(order.total),
          discount: formatMoney(order.discount),
          paymentType: order.PaymentType.name,
          action: <>
            <Button variant="warning">Detalhes</Button>
          </>,
        };
      });
      setOrders(mappedOrders);
      handleSearch();
    } catch (error) {
      console.error(error);
    }
    hideLoader();
  }, [
    selectedDate
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

        <Typography variant={"h3"}>Vendas</Typography>
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
        <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant={'h5'}>Vendas do dia: {formatDate(selectedDate)}</Typography>
          <Button onClick={() => setShowSelectDay(!showSelectDay)}>Selecionar dia</Button>

        </div>
        {
          showSelectDay && (<DayPicker
            locale={ptBR} // Define o idioma para Português do Brasil
            timeZone="America/Sao_Paulo"
            mode="single"
            selected={selectedDate}
            onSelect={(e) => {
              setSelectedDate(e);
              setShowSelectDay(false);
            }}
          />)
        }

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
