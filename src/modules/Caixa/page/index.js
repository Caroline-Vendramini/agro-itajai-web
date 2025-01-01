import { ptBR } from "date-fns/locale";
import { useCallback, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Button from "../../../components/button/Button";
import Table from "../../../components/table/Table";
import Typography from "../../../components/typography/Typography";
import useAxios from "../../../hooks/useAxios";
import { useLoader } from "../../../hooks/useLoader";
import useModal from "../../../hooks/useModal";
import { seeBalanceDetails } from "../../../utils/balance";
import { formatDate } from "../../../utils/date";
import { formatMoney } from "../../../utils/money";
import BalanceDetailsModal from "../../Dashboard/components/BalanceDetailsModal";
import "./index.css";

const columns = [
  { Header: "Data", accessor: "date" },
  { Header: "Total vendido", accessor: "amount" },
  { Header: "Caixa fechado", accessor: "closed" },
  { Header: "Ação", accessor: "action" },
];

function Caixas() {
  const [caixas, setCaixas] = useState([]);
  const [balanceDetails, setBalanceDetails] = useState(null);
  const [showSelectMonth, setShowSelectMonth] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const { showLoader, hideLoader } = useLoader();
  const { fetchData } = useAxios();

  const {
    isModalOpen: isBalanceDetailsModalOpen,
    toggleModal: toggleBalanceDetailsModalOpen,
  } = useModal();

  const fetchCaixas = useCallback(async () => {
    showLoader();
    try {
      const date = `${selectedMonth.getFullYear()}-${selectedMonth.getMonth() + 1
        }-15`;
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
            <Button
              onClick={() => {
                const details = seeBalanceDetails(caixa);
                setBalanceDetails(details);
                toggleBalanceDetailsModalOpen();
              }}
            >
              Detalhes
            </Button>
          ),
        };
      });
      setCaixas(mappedCaixas);
    } catch (error) {
      console.error(error);
    }
    hideLoader();
  }, [toggleBalanceDetailsModalOpen, selectedMonth]);

  useEffect(() => {
    fetchCaixas();
  }, [fetchCaixas, selectedMonth]);

  const handleCloseCaixaClick = async (id) => {
    fetchData({
      url: `/cash-balance/${id}/close`,
      method: "PATCH",
    })
      .then(() => {
        alert("Caixa fechado com sucesso");
        return window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="caixas-container">
      {/* Modal de atualização de caixa */}
      <BalanceDetailsModal
        toggleModal={toggleBalanceDetailsModalOpen}
        isModalOpen={isBalanceDetailsModalOpen}
        balanceDetails={balanceDetails}
        date={formatDate(balanceDetails?.date || null)}
        closeBalance={handleCloseCaixaClick}
      />

      <Typography variant={"h3"}>Caixas</Typography>

      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant={"h5"}>
          Caixas do mês:{" "}
          {selectedMonth.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <Button onClick={() => setShowSelectMonth(!showSelectMonth)}>
          Selecionar mês
        </Button>
      </div>

      <div>
        {showSelectMonth && (
          <DayPicker
            startMonth={new Date(2024, 11)}
            hideNavigation
            locale={ptBR} // Define o idioma para Português do Brasil
            timeZone="America/Sao_Paulo"
            defaultMonth={selectedMonth}
            className="caixas-day-picker"
            onMonthChange={(month) => setSelectedMonth(month)} // Salva o mês selecionado
            captionLayout="dropdown" // Permite alternar por dropdown
          />
        )}
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
