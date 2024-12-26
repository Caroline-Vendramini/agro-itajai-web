import { useEffect, useState } from "react";
import { GoAlert } from "react-icons/go";
import Button from "../../../components/button/Button";
import Table from "../../../components/table/Table";
import Typography from "../../../components/typography/Typography";
import useAxios from "../../../hooks/useAxios";
import { formatDate, formatDateToISO } from "../../../utils/date";
import { formatMoney } from "../../../utils/money";
import { useNavigate } from "react-router-dom";
import './index.css'

const columns = [
  { Header: "Data", accessor: "date" },
  { Header: "Saldo", accessor: "amount" },
  { Header: "Entradas de caixa", accessor: "entries" },
  { Header: "Saídas de caixa", accessor: "exits" },
  { Header: "Caixa fechado?", accessor: "closed" },
  { Header: "Detalhes", accessor: "details" },
];

function Dashboard() {
  const [caixas, setCaixas] = useState([]);
  const [currentCaixa, setCurrentCaixa] = useState(null);
  const [openCaixas, setOpenCaixas] = useState([]);
  const [ordersByPaymentMethod, setOrdersByPaymentMethod] = useState([]);
  const [moneyOrders, setMoneyOrders] = useState(0);
  const [debitPaymentsToday, setDebitPaymentsToday] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [dayProfit, setDayProfit] = useState(0);
  const [dayProfitPct, setDayProfitPct] = useState(0);
  const [monthProfit, setMonthProfit] = useState(0);
  const [monthProfitPct, setMonthProfitPct] = useState(0);

  const { fetchData } = useAxios();
  const navigate = useNavigate();

  useEffect(() => {
    const date = formatDateToISO(new Date());
    const fn = async () => {
      fetchData({
        url: `/cash-balance/store/monthYear/${date}/month-profit`,
      })
        .then((res) => {
          const { price, cost } = res.data;
          setMonthProfit(price - cost);
          setMonthProfitPct((price - cost) / price);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    fn()
  }, [])

  const fetchCaixas = async () => {
    const response = await fetchData({
      url: "/cash-balance/dashboard",
    });
    const newCaixas = response.data.map((caixa) => {
      const date = formatDateToISO(caixa.date);
      const isCurrent = !caixa.closed && date === formatDateToISO(new Date());
      if (isCurrent) {
        const orders = caixa.Orders;
        let moneyOrders = 0;
        let discount = 0;
        const totalPrice = caixa.amount;
        let totalCost = 0;
        const ordersByPaymentMethod = orders.reduce((acc, curr) => {
          const paymentMethod = curr.PaymentType.name;
          if (!acc[paymentMethod]) {
            acc[paymentMethod] = 0;
          }
          if (paymentMethod === "Dinheiro") {
            moneyOrders += curr.total;
          }
          totalCost = curr.Items.reduce((a, c) => a + c.unitCost * c.quantity, 0);
          // Items.unitCost * curr.Items.quantity;
          discount += curr.discount;
          acc[paymentMethod] += curr.total;
          return acc;
        }, {});

        const _debitPaymentsToday = caixa.DebitPayment.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );
        setDayProfitPct((totalPrice - totalCost) / totalPrice);
        setDayProfit(totalPrice - totalCost);
        setTotalDiscount(discount);
        setDebitPaymentsToday(_debitPaymentsToday);
        setMoneyOrders(moneyOrders);
        setOrdersByPaymentMethod(Object.entries(ordersByPaymentMethod).map(([item, value]) => ({
          item,
          value,
        })));
        setCurrentCaixa(caixa);
      } else if (!caixa.closed) {
        setOpenCaixas((prev) => [...prev, caixa]);
      }
      return {
        date: formatDate(caixa.date),
        amount: formatMoney(caixa.amount),
        entries: formatMoney(
          caixa.CashIns.reduce((acc, curr) => acc + curr.amount, 0)
        ),
        exits: formatMoney(
          caixa.CashOuts.reduce((acc, curr) => acc + curr.amount, 0)
        ),
        closed: caixa.closed ? "Sim" : "Não",
        details: <Button>Detalhes</Button>,
      };
    });
    setCaixas(newCaixas);
  };

  useEffect(() => {
    fetchCaixas();
  }, []);

  const handleNewSaleClick = () => {
    navigate("/vendas", {
      state: {
        newSale: true,
      },
    });
  };

  async function handleOpenCaixaClick() {
    if (currentCaixa) {
      // show alert
      return alert("Você já possui um caixa aberto");
    }
    if (openCaixas.length > 0) {
      // show alert
      return alert("Você possui um caixa aberto de um dia anterior");
    }

    try {
      // create caixa passing date: "YYYY-MM-DD" in the post body
      await fetchData({
        url: "/cash-balance",
        method: "POST",
        data: {
          date: formatDateToISO(new Date()),
        },
      });
    } catch (error) {
      if (error.response.status === 409) {
        const choice = window.confirm("Você já fechou o caixa de hoje, deseja reabri-lo?");
        const cashBalance = error.response.data.cashBalance;
        if (choice) {
          // call api to reopen caixa
          return fetchData({
            url: `/cash-balance/${cashBalance.id}/reopen`,
            method: "PATCH",
          })
            .then((res) => {
              setCurrentCaixa(res.data);
              alert("Caixa reaberto com sucesso");
              return window.location.reload();
            })
            .catch((error) => {
              console.error(error);
              return alert("Erro ao reabrir caixa");
            });
        }
        return;
      }
      console.error(error);
      alert("Erro ao abrir caixa");
    }
  }

  const handleCloseCaixaClick = async () => {
    // call api to close caixa
    fetchData({
      url: `/cash-balance/${currentCaixa.id}/close`,
      method: "PATCH",
    })
      .then(() => {
        setCurrentCaixa(null);
        alert("Caixa fechado com sucesso");
        return window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      className="dashboard-container"
    >
      <div className="flex-space-between">
        <Typography variant={"h3"}>Dashboard -
          {currentCaixa ? (
            <span className="font-green"> Caixa aberto</span>
          ) : (
            <span className="font-red"> Caixa fechado</span>
          )}
        </Typography>
        <Button variant="success" onClick={handleNewSaleClick}>
          Nova venda
        </Button>
      </div>

      {currentCaixa ? (
        <div className="flex-space-between">
          <Button onClick={handleCloseCaixaClick}>Fechar caixa</Button>
        </div>
      ) : (
        <div className="flex-space-between">
          <Button onClick={handleOpenCaixaClick}>Abrir caixa</Button>
        </div>
      )}

      {openCaixas.length > 0 && (
        <div
          className="dashboard-warning"
        >
          <GoAlert color="#c76a1e" fontSize={48} />
          <div className="flex-column">
            <span className="dashboard-warning-title">Atenção</span>
            <span>
              Há um caixa aberto de um dia anterior. Por favor, feche-o antes de
              continuar.
            </span>
          </div>
        </div>
      )}

      <div
        className="dashboard-cards-container"
      >
        <div
          className="dashboard-cards-container-areas"
        >
          <div
            className="dashboard-paymenttypesales"
          >
            <Typography variant={"h5"}>Venda por forma de pagamento</Typography>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {ordersByPaymentMethod.map(({ item, value }) => (
                <li
                  key={item}
                  className="flex-space-between"
                >
                  <Typography variant={"span"} style={{ fontSize: "14px" }}>
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
              ))}
            </ul>
          </div>
          <div className="dashboard-receipts"
          >
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
                  <li
                    className="flex-space-between"
                  >
                    <Typography variant={"span"} style={{ fontSize: "14px" }}>
                      Vendas em dinheiro
                    </Typography>
                    <Typography
                      variant={"span"}
                      className="gree-bold"
                    >
                      {formatMoney(moneyOrders)}
                    </Typography>
                  </li>
                  <li
                    className="flex-space-between"
                  >
                    <Typography variant={"span"} style={{ fontSize: "14px" }}>
                      Pagamento de fiados
                    </Typography>
                    <Typography
                      variant={"span"}
                      className="gree-bold"
                    >
                      {formatMoney(debitPaymentsToday)}
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
            <span
              className="gree-bold"
            >
              {formatMoney(currentCaixa?.amount)}
            </span>
          </div>
          <div className="total-discount"
            title="Lembre-se de que o lucro bruto não é o lucro líquido. O lucro bruto é o valor total das vendas menos o custo dos produtos vendidos. Você ainda precisa subtrair as despesas operacionais, como aluguel, água, luz e impostos, para calcular o lucro líquido."
          >
            <Typography variant={"h5"}>Total de desconto concedido</Typography>
            <span
              className={totalDiscount > 0 ? "red-bold" : ''}
            >
              {formatMoney(totalDiscount)}
            </span>
          </div>
          <div
            className="today-profit"
            title="Lembre-se de que o lucro bruto não é o lucro líquido. O lucro bruto é o valor total das vendas menos o custo dos produtos vendidos.
              Você ainda precisa subtrair as despesas operacionais, como aluguel, água, luz e impostos, para calcular o lucro líquido."
          >
            <Typography variant={"h5"}>Lucro bruto do dia</Typography>
            <span
              className="gree-bold"
            >
              {formatMoney(dayProfit)} ({(dayProfitPct * 100).toFixed(2)}%)
            </span>
          </div>
          <div
            className="month-profit"
            title="Lembre-se de que o lucro bruto não é o lucro líquido. O lucro bruto é o valor total das vendas menos o custo dos produtos vendidos. Você ainda precisa subtrair as despesas operacionais, como aluguel, água, luz e impostos, para calcular o lucro líquido."
          >
            <Typography variant={"h5"}>Lucro bruto do mês</Typography>
            <span
              className="gree-bold"
            >
              {formatMoney(monthProfit)} ({(monthProfitPct * 100).toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="dashboard-cards-container">
          <Typography variant={"h5"}>Histórico de caixa</Typography>
          <Table>
            <Table.Head>
              {columns.map((column) => (
                <Table.Cell key={column.Header}>{column.Header}</Table.Cell>
              ))}
            </Table.Head>
            <Table.Body>
              {caixas.map((_, index) => (
                <Table.Row key={index}>
                  {columns.map((column) => (
                    <Table.Cell key={column.Header}>
                      {_[column.accessor]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
