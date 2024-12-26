import { useCallback, useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Table from "../../../components/table/Table";
import Typography from "../../../components/typography/Typography";
import { useLoader } from "../../../hooks/useLoader";
import useModal from "../../../hooks/useModal";
import useAxios from "../../../hooks/useAxios";
import { formatMoney } from "../../../utils/money";
import { formatDate } from "../../../utils/date";
import { DayPicker } from "react-day-picker";
import { ptBR } from 'date-fns/locale';
import "react-day-picker/style.css";
import "./index.css";
// import RegisterCaixaModal from "../component/RegisterCaixaModal";
// import UpdateCaixaModal from "../component/UpdateCaixaModal";

const columns = [
  { Header: "Data", accessor: "date" },
  { Header: "Total vendido", accessor: "amount" },
  { Header: "Caixa fechado", accessor: "closed" },
  { Header: "Ação", accessor: "action" },
];

function Caixas() {
  const [caixas, setCaixas] = useState([]);
  const [updateCaixa, setUpdateCaixa] = useState(null);
  const [showSelectMonth, setShowSelectMonth] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const { showLoader, hideLoader } = useLoader();
  const { fetchData } = useAxios();

  const { isModalOpen: updateCaixaModal, toggleModal: toggleUpdateCaixaModal } =
    useModal();

  const fetchCaixas = useCallback(async () => {
    showLoader();
    try {
      const date = `${selectedMonth.getFullYear()}-${selectedMonth.getMonth() + 1}-15`;
      const response = await fetchData({
        url: `cash-balance/store/monthYear/${date}/cash-balance`,
        method: "get",
      });
      const mappedCaixas = response.data.map((caixa) => {
        return {
          ...caixa,
          date: formatDate(caixa.date),
          amount: formatMoney(caixa.amount),
          closed: caixa.closed ? "Sim" : "Não",
          action: (
            <div style={{ display: "flex", gap: "4px" }}>
              <Button
                onClick={() => {
                  setUpdateCaixa(caixa);
                  toggleUpdateCaixaModal();
                }}
              >
                Detalhes
              </Button>
            </div>
          ),
        };
      });
      setCaixas(mappedCaixas);
    } catch (error) {
      console.error(error);
    }
    hideLoader();
  }, [toggleUpdateCaixaModal]);

  useEffect(() => {
    fetchCaixas();
  }, [fetchCaixas]);

  const handleSubmitUpdateCaixa = (e) => {
    e.preventDefault();
    const { name, description, id } = updateCaixa;

    if (!name || !description) {
      alert("Preencha todos os campos");
      return;
    }

    fetchData({
      url: `cash-balance/${id}`,
      method: "patch",
      data: {
        name,
        description,
      },
    })
      .then(() => {
        fetchCaixas();
        toggleUpdateCaixaModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitCaixa = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");

    if (!name || !description) {
      alert("Preencha todos os campos");
      return;
    }

    fetchData({
      url: "caixas",
      method: "post",
      data: {
        name,
        description,
      },
    })
      .then(() => {
        fetchCaixas();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="caixas-container">

      {/* Modal de atualização de caixa */}
      {/* <UpdateCaixaModal
        updateCaixaModal={updateCaixaModal}
        toggleUpdateCaixaModal={toggleUpdateCaixaModal}
        handleSubmitUpdateCaixa={handleSubmitUpdateCaixa}
        updateCaixa={updateCaixa}
        setUpdateCaixa={setUpdateCaixa}
      /> */}

      <Typography variant={"h3"}>Caixas</Typography>

      <div style={{ display: "flex", gap: "8px", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant={'h5'}>Caixas do mês: {selectedMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</Typography>
        <Button onClick={() => setShowSelectMonth(!showSelectMonth)}>Selecionar mês</Button>

      </div>

      <div>
        {
          showSelectMonth && (
            <DayPicker
              startMonth={new Date(2024, 11)}
              hideNavigation
              locale={ptBR} // Define o idioma para Português do Brasil
              timeZone="America/Sao_Paulo"
              defaultMonth={selectedMonth}
              className="caixas-day-picker"
              onMonthChange={(month) => setSelectedMonth(month)} // Salva o mês selecionado
              captionLayout="dropdown" // Permite alternar por dropdown

            />)
        }
      </div>


      <Table>
        <Table.Head>
          {columns.map((column, index) => (
            <Table.Cell key={index}>{column.Header}</Table.Cell>
          ))}
        </Table.Head>
        <Table.Body>
          {caixas.map((row, index) => (
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

export default Caixas;