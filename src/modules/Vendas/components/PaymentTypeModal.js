import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import CustomSelect from "../../../components/select/CustomSelect";
import useAxios from "../../../hooks/useAxios";
import { formatMoney, moneyMask } from "../../../utils/money";
import { stringToNumber } from "../../../utils/number";

const PaymentTypeModal = ({
  paymentTypeModal,
  togglePaymentTypeModal,
  handleSubmitPayment,
  total,
}) => {
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showCashInput, setShowCashInput] = useState(false);
  const [customerRequired, setCustomerRequired] = useState(false);
  const [cash, setCash] = useState(0);
  const [change, setChange] = useState("R$ 0,00");
  const [searchPaymentType, setSearchPaymentType] = useState(null);
  const [searchCustomers, setSearchCustomers] = useState(null);
  const [minHeight, setMinHeight] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [totalWithDiscount, setTotalWithDiscount] = useState(total);

  useEffect(() => {
    const newTotal = formatMoney(
      total - stringToNumber(formatMoney(discount))
    );
    setTotalWithDiscount(newTotal);

    const changeNumber = stringToNumber(cash) - stringToNumber(newTotal);
    const newChange = formatMoney(changeNumber < 0 ? 0 : changeNumber);
    setChange(newChange);
  }, [total])

  const { fetchData } = useAxios();

  useEffect(() => {
    console.log(searchCustomers)
    const customer = customers.find(
      (customer) => customer.id === searchCustomers?.value
    );
    console.log(customer)
  }, [searchCustomers]);

  useEffect(() => {
    const fetchPaymentTypes = async () => {
      try {
        const response = await fetchData({
          url: "/payment-type",
        });
        setPaymentTypes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPaymentTypes();


    const fetchCustomers = async () => {
      try {
        const response = await fetchData({
          url: "/customers",
        });
        setCustomers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomers();

    return () => {
      setPaymentTypes([]);
      setCustomers([]);
    };
  }, []);

  const resetValues = () => {
    setCash(0);
    setChange("R$ 0,00");
    setDiscount(0);
    setTotalWithDiscount(total);
    setSearchPaymentType(null);
    setShowCashInput(false);
    setCustomerRequired(false);
    setSearchCustomers(null);
  }

  return (
    <Modal
      zIndex={13}
      show={paymentTypeModal}
      onClose={() => {
        resetValues();
        togglePaymentTypeModal();
      }}
      minHeight={minHeight}
      width={"70%"}
    >
      <Modal.Title>Forma de pagamento</Modal.Title>
      <Modal.Content>
        <form
          className="vendas-modal-content-payment"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitPayment(searchPaymentType?.value, searchCustomers?.value, stringToNumber(formatMoney(discount)));
            resetValues();
            togglePaymentTypeModal();
          }}
        >
          <div className="vendas-modal-content-register-inputs">

            <CustomSelect
              className="vendas-select-grow"
              label="Forma de pagamento"
              name="payment-type"
              placeholder="Forma de pagamento"
              isClearable
              required
              options={paymentTypes.map((paymentType) => ({
                value: paymentType.id,
                label: paymentType.name,
              }))}
              maxMenuHeight={200}
              value={searchPaymentType}
              onChange={(selected) => {
                if (selected?.label === "Dinheiro") {
                  setShowCashInput(true);
                } else {
                  setShowCashInput(false);
                }
                if (selected?.label === "Fiado") {
                  setCustomerRequired(true);
                } else {
                  setCustomerRequired(false);
                }
                setSearchPaymentType(selected);
              }}
              onMenuClose={() => setMinHeight(null)}
              onMenuOpen={() => setMinHeight("355px")}
            />
            <CustomSelect
              className="vendas-select-grow"
              label="Cliente"
              name="customers"
              placeholder="Cliente"
              isClearable
              required={customerRequired}
              options={customers.map((customer) => ({
                value: customer.id,
                label: customer.name,
              }))}
              maxMenuHeight={200}
              value={searchCustomers}
              onChange={(selected) => {
                setSearchCustomers(selected);
              }}
              onMenuClose={() => setMinHeight(null)}
              onMenuOpen={() => setMinHeight("355px")}
            />
          </div>
          <div className="vendas-modal-content-register-inputs">
            <Input
              outerClassname="w350"
              name="discount"
              label="Desconto"
              value={formatMoney(discount)}
              onChange={(e) => {
                const newDiscount = e.target.value;
                setDiscount(newDiscount);

                const newTotal = formatMoney(
                  total - stringToNumber(formatMoney(newDiscount))
                )
                setTotalWithDiscount(
                  newTotal
                );

                const changeNumber = stringToNumber(cash) - stringToNumber(newTotal);
                const newChange = formatMoney(changeNumber < 0 ? 0 : changeNumber
                );
                setChange(newChange);
              }}
            />
            <Input
              outerClassname="w350"
              name="total"
              disabled
              value={formatMoney(totalWithDiscount)}
              label="Total"
            />
          </div>
          {showCashInput && (
            <div className="vendas-modal-content-register-inputs">
              <Input
                outerClassname="w350"
                name="cash"
                required
                value={formatMoney(cash)}
                onChange={(e) => {
                  const newCash = formatMoney(e.target.value);
                  setCash(newCash);

                  const changeNumber = stringToNumber(newCash) - stringToNumber(totalWithDiscount);
                  const newChange = formatMoney(changeNumber < 0 ? 0 : changeNumber
                  );
                  setChange(newChange);
                }}
                label="Dinheiro recebido"
              />

              <Input
                outerClassname="w350"
                name="change"
                label="Troco"
                readOnly
                value={change}
              />
            </div>
          )}
          <Button type="submit">Finalizar venda</Button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default PaymentTypeModal;
