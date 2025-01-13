import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import Typography from "../../../components/typography/Typography";
import useModal from "../../../hooks/useModal";
import "./index.css";

function Relatorios() {
  const { isModalOpen, toggleModal } = useModal();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showSelectRange, setShowSelectRange] = useState(false);

  const generateReport = async (type) => {
    // TODO: Implementar a geração de relatórios
    // Perguntar data inicial e data final, periodo do relatório (diário, semanal, mensal, anual)
    // Perguntar loja ou todas as lojas
    // Perguntar se deseja exportar o relatório para PDF ou Excel
    // Gerar o relatório e exibir em tela/abrir para download
    // try {
    //   const response = await api.get(`/reports/${type}`);
    //   setData(response.data);
    //   openModal();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="relatorios-container">
      <Modal show={isModalOpen} onClose={toggleModal}>
        <Modal.Title>Em Breve</Modal.Title>
        <Modal.Content>
          <Typography variant={"span"}>Em breve estas funcionalidades estarão disponíveis.</Typography>
          <Button onClick={toggleModal}>OK</Button>
        </Modal.Content>
      </Modal>
      <div className="relatorios-header">
        <Typography variant="h1">Relatórios</Typography>

        <div className="relatorios-date-range">
          <Typography variant="h6">
            {`Período selecionado: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
          </Typography>
          <Button className="relatorios-h-40" onClick={() => setShowSelectRange(!showSelectRange)}>
            Selecionar período
          </Button>
          {showSelectRange && (
            <div className="relatorios-date-range-picker">
              <DayPicker
                locale={ptBR} // Define o idioma para Português do Brasil
                timeZone="America/Sao_Paulo"
                mode="range"
                selected={{ from: startDate, to: endDate }}
                numberOfMonths={2}
                onSelect={(e) => {
                  setStartDate(e.from);
                  setEndDate(e.to);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="relatorios-report-sections">
        <div className="relatorios-report-section">
          <Typography variant="h2">Operacionais</Typography>
          <div className="relatorios-report-section-buttons">
            <Button
              onClick={() => generateReport("vendas")}
              title={
                "Este relatório exibe informações detalhadas sobre as vendas realizadas em um determinado período. Inclui dados como quantidade de produtos vendidos, valor total das vendas, e comparações com períodos anteriores."
              }
            >
              Relatório de Vendas
            </Button>
            <Button
              title={
                "Este relatório apresenta o status atual do estoque, incluindo a quantidade de produtos disponíveis, produtos em falta, e a movimentação de entrada e saída de mercadorias."
              }
              onClick={() => generateReport("estoque")}
            >
              Relatório de Estoque
            </Button>
            <Button
              title={
                "Este relatório fornece uma visão abrangente sobre os clientes, incluindo dados sobre meios de pagamentos, histórico de compras, e comportamento de consumo."
              }
              onClick={() => generateReport("clientes")}
            >
              Relatório de Clientes
            </Button>
          </div>
        </div>
        <div className="relatorios-report-section">
          <Typography variant="h2">Financeiros</Typography>
          <div className="relatorios-report-section-buttons">
            <Button
              title={
                "Este relatório mostra o fluxo de caixa da empresa, detalhando as entradas e saídas de dinheiro, saldos diários, e previsões financeiras."
              }
              onClick={() => generateReport("financeiro")}
            >
              Relatório de Fluxo de Caixa
            </Button>
            <Button
              title={
                "Este relatório analisa a margem de lucro dos produtos e serviços, destacando os itens mais e menos lucrativos, e ajudando na tomada de decisões estratégicas."
              }
              onClick={() => generateReport("financeiro")}
            >
              Relatório de margem de lucro
            </Button>
            <Button
              title={
                "Este relatório detalha os pagamentos realizados e recebidos, incluindo datas, valores, e status de cada transação."
              }
              onClick={() => generateReport("financeiro")}
            >
              Relatório de pagamentos
            </Button>
          </div>
        </div>
        <div className="relatorios-report-section">
          <Typography variant="h2">Gerenciais</Typography>
          <div className="relatorios-report-section-buttons">
            <Button
              title={
                "Este relatório apresenta um resumo das compras realizadas pela empresa, incluindo fornecedores, quantidades adquiridas, e valores gastos."
              }
              onClick={() => generateReport("gerencial")}
            >
              Relatório de Compras
            </Button>
            <Button
              title={
                "Este relatório avalia o desempenho das diferentes lojas, comparando métricas como vendas, lucro, e satisfação do cliente."
              }
              onClick={() => generateReport("gerencial")}
            >
              Relatório de Performance de Lojas
            </Button>
          </div>
        </div>
        <div className="relatorios-report-section">
          <Typography variant="h2">Estratégicos</Typography>
          <div className="relatorios-report-section-buttons">
            <Button
              title={
                "Este relatório analisa a rentabilidade de diferentes categorias de produtos, ajudando a identificar quais categorias são mais lucrativas."
              }
              onClick={() => generateReport("estrategico")}
            >
              Relatório de rentabilidade por categoria
            </Button>
            <Button
              title={
                "Este relatório detalha a rentabilidade de cada produto individualmente, permitindo uma análise precisa de quais produtos geram mais lucro."
              }
              onClick={() => generateReport("estrategico")}
            >
              Relatório de rentabilidade por produto
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Relatorios;
