import { useCallback, useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Table from "../../../components/table/Table";
import Typography from "../../../components/typography/Typography";
import { useLoader } from "../../../hooks/useLoader";
import useModal from "../../../hooks/useModal";
import { formatDateToISO } from "../../../utils/date";
import { formatMoney } from "../../../utils/money";
import { searchString } from "../../../utils/string";
import CustomerDetailsModal from "../components/CustomerDetailsModal";
import DebitPaymentModal from "../components/DebitPaymentModal";
import DebitPaymentSuccessModal from "../components/DebitPaymentSuccessModal";
import RegisterCustomerModal from "../components/RegisterCustomerModal";
import UpdateCustomerModal from "../components/UpdateCustomerModal";
import "./index.css";
import useAxios from "../../../hooks/useAxios";

const columns = [
  { Header: "Nome", accessor: "name" },
  { Header: "Apelido", accessor: "nickname" },
  { Header: "Telefone", accessor: "phone" },
  { Header: "Fiado", accessor: "debit" },
  { Header: "Ação", accessor: "action" },
];

function Clientes() {
  // Modais
  const { isModalOpen, toggleModal } = useModal();
  const { isModalOpen: payModal, toggleModal: togglePayModal } = useModal();
  const { isModalOpen: feedbackModal, toggleModal: toggleFeedbackModal } =
    useModal();
  const {
    isModalOpen: registerCustomerModal,
    toggleModal: toggleRegisterCustomerModal,
  } = useModal();
  const {
    isModalOpen: updateCustomerModal,
    toggleModal: toggleUpdateCustomerModal,
  } = useModal();

  // Estados
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [payValue, setPayValue] = useState("");
  const [updateCustomer, setUpdateCustomer] = useState(null);

  const { showLoader, hideLoader } = useLoader();
  const { fetchData } = useAxios();

  const handleCustomerDetails = useCallback(
    (customer) => {
      setCustomerDetails(customer);
      toggleModal();
    },
    [toggleModal]
  );

  const handleSearch = useCallback(() => {
    if (!search) {
      setFilteredCustomers(customers);
      return;
    }
    showLoader();
    const filtered = customers.filter(
      (customer) =>
        searchString(customer.name, search) ||
        searchString(customer.nickname, search) ||
        searchString(customer.name + customer.nickname, search) ||
        searchString(customer.nickname + customer.name, search)
    );
    setFilteredCustomers(filtered);
    hideLoader();
  }, [search, customers, hideLoader, showLoader]);

  const fetchCustomers = useCallback(async () => {
    showLoader();
    try {
      const response = await fetchData({
        url: "customers",
      });
      const mappedCustomers = response.data.map((customer) => {
        return {
          ...customer,
          debit: formatMoney(customer.totalDebit - customer.totalDebitPaid),
          action: (
            <div style={{ display: "flex", gap: "4px" }}>
              <Button onClick={() => handleCustomerDetails(customer)}>
                Detalhes
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  setUpdateCustomer(customer);
                  toggleUpdateCustomerModal();
                }}
              >
                Editar
              </Button>
            </div>
          ),
        };
      });
      setCustomers(mappedCustomers);
    } catch (error) {
      console.error(error);
    }
    hideLoader();
  }, [
    handleCustomerDetails,
    toggleUpdateCustomerModal,
    fetchData,
    hideLoader,
    showLoader,
  ]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  useEffect(() => {
    handleSearch();
  }, [search, customers, handleSearch]);

  const handlePayDebit = (e) => {
    e.preventDefault();
    const value = parseFloat(payValue.replace("R$", "").replace(",", "."));

    if (value <= 0) {
      // TODO: Mostrar erro
      alert('Valor inválido');
      return;
    }

    if (value > customerDetails.totalDebit - customerDetails.totalDebitPaid) {
      // TODO: Mostrar erro
      alert('Valor maior que o fiado');
      return;
    }

    fetchData({
      url: "debit-payment",
      method: "post",
      data: {
        customerId: customerDetails.id,
        amount: value,
        date: formatDateToISO(new Date()),
        // TODO: Adicionar descrição
        // description: 'Pagamento de fiado'
      },
    })
      .then(() => {
        fetchCustomers();
        toggleModal();
        togglePayModal();
        toggleFeedbackModal();
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 404) {
          alert('Caixa não encontrado ou fechado');
        }
      });
  };

  const handleOpenRegisterCustomer = () => {
    toggleRegisterCustomerModal();
  };

  const handleSubmitCustomer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const nickname = formData.get("nickname");
    const phone = formData.get("phone");

    if (!name) {
      alert("Preencha o nome do cliente");
      return;
    }

    fetchData({
      url: "customers",
      method: "post",
      data: {
        name,
        nickname,
        phone,
      },
    })
      .then(() => {
        fetchCustomers();
        toggleRegisterCustomerModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitUpdateCustomer = (e) => {
    e.preventDefault();
    const { name, nickname, phone, id } = updateCustomer

    if (!name || !id) {
      alert("Preencha todos os campos");
      return;
    }

    fetchData({
      url: `customers/${id}`,
      method: "patch",
      data: {
        name,
        nickname,
        phone,
      },
    })
      .then(() => {
        fetchCustomers();
        toggleUpdateCustomerModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="clientes-container">
      {/* Pagamento realizado com sucesso */}
      <DebitPaymentSuccessModal
        feedbackModal={feedbackModal}
        toggleFeedbackModal={toggleFeedbackModal}
        payValue={payValue}
        setPayValue={setPayValue}
        customerDetails={customerDetails}
      />

      {/* Modal de pagamento */}
      <DebitPaymentModal
        payModal={payModal}
        togglePayModal={togglePayModal}
        payValue={payValue}
        setPayValue={setPayValue}
        handlePayDebit={handlePayDebit}
        customerDetails={customerDetails}
      />

      {/* Modal de detalhes do cliente */}
      <CustomerDetailsModal
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
        customerDetails={customerDetails}
        togglePayModal={togglePayModal}
      />

      {/* Modal de cadastro de cliente */}
      <RegisterCustomerModal
        registerCustomerModal={registerCustomerModal}
        toggleRegisterCustomerModal={toggleRegisterCustomerModal}
        handleSubmitCustomer={handleSubmitCustomer}
      />

      {/* Modal de atualização de cliente */}
      <UpdateCustomerModal
        updateCustomerModal={updateCustomerModal}
        toggleUpdateCustomerModal={toggleUpdateCustomerModal}
        handleSubmitUpdateCustomer={handleSubmitUpdateCustomer}
        updateCustomer={updateCustomer}
        setUpdateCustomer={setUpdateCustomer}
      />

      <Typography variant={"h3"}>Clientes</Typography>
      <div className="clientes-search-area">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          outerClassname="clientes-grow"
          placeholder={"Nome/Apelido do cliente"}
        />
        <Button variant="success" onClick={handleOpenRegisterCustomer}>
          Novo cliente
        </Button>
      </div>

      <Table>
        <Table.Head>
          {columns.map((column, index) => (
            <Table.Cell key={index}>{column.Header}</Table.Cell>
          ))}
        </Table.Head>
        <Table.Body>
          {filteredCustomers.map((row, index) => (
            <Table.Row key={index}>
              {columns.map((column, index) => (
                <Table.Cell key={index}>{row[column.accessor]}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Clientes;
