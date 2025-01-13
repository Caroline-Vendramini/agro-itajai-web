import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import CustomSelect from "../../../components/select/CustomSelect";
import Table from "../../../components/table/Table";
import useAxios from "../../../hooks/useAxios";
import useModal from "../../../hooks/useModal";
import { formatMoney } from "../../../utils/money";
import { stringToNumber } from "../../../utils/number";
import PaymentTypeModal from "./PaymentTypeModal";

const columns = [
  { Header: "Produto", accessor: "product" },
  { Header: "Quantidade", accessor: "quantity" },
  { Header: "Preço unitário", accessor: "unitPrice" },
  { Header: "Total", accessor: "total" },
  { Header: "Ação", accessor: "action" },
];

const RegisterOrderModal = ({
  registerOrderModal,
  toggleRegisterOrderModal,
  handleSubmitOrder,
}) => {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);
  const [searchProduct, setSearchProduct] = useState(null);

  const { isModalOpen: paymentTypeModal, toggleModal: togglePaymentTypeModal } =
    useModal();

  const { fetchData } = useAxios();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetchData({
          url: "/products/store/products",
        });
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();

    return () => {
      setProducts([]);
      setItems([]);
    };
  }, [registerOrderModal, fetchData]);

  const removeItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const addItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const quantity = +formData.get("quantity").replace(",", ".");
    const productId = searchProduct.value;

    // Quantidade deve ser maior que 0
    if (quantity <= 0) {
      alert("A quantidade deve ser maior que 0");
      return;
    }

    const product = products.find((product) => product.id === productId);
    // Produto deve existir
    if (!product) {
      alert("Produto não encontrado");
      return;
    }

    // Quantidade em estoque deve ser maior que a quantidade vendida
    if (product.stock < quantity) {
      alert("Quantidade em estoque insuficiente");
      return;
    }

    // Verifica se a quantidade vendida + a quantidade em estoque é maior que a quantidade em estoque
    const stockInItems = items.reduce((acc, item) => {
      if (item.product === product.name) {
        return acc + stringToNumber(item.quantity);
      }
      return acc;
    }, 0);
    // Se a quantidade vendida + a quantidade em estoque for maior que a quantidade em estoque, exibe um alerta
    if (stockInItems) {
      if (stockInItems + quantity > product.stock) {
        alert("Quantidade em estoque insuficiente");
        return;
      }
    }

    e.target.reset();
    setSearchProduct(null);
    // Verifica se o produto já foi adicionado e incrementa a quantidade
    const itemIndex = items.findIndex((item) => item.id === product.id);
    if (itemIndex !== -1) {
      const newQuantity = +items[itemIndex].quantity + quantity;
      const newTotal = formatMoney(product.price * newQuantity);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: newQuantity, total: newTotal }
            : item
        )
      );
      formData.set("quantity", "");
      formData.set("product", "");
      return;
    }

    const item = {
      id: product.id,
      product: product.name,
      quantity: formData.get("quantity"),
      unitPrice: formatMoney(product.price),
      total: formatMoney(product.price * quantity),
      action: (
        <div style={{ display: "flex", gap: "6px" }}>
          <Button
            small
            onClick={() => {
              const newQuantity = prompt("Digite a nova quantidade:");
              if (newQuantity && !isNaN(newQuantity) && newQuantity > 0) {
                setItems((prevItems) =>
                  prevItems.map((item) =>
                    item.id === product.id
                      ? {
                        ...item,
                        quantity: newQuantity,
                        total: formatMoney(product.price * newQuantity),
                      }
                      : item
                  )
                );
              } else {
                alert("Quantidade inválida");
              }
            }}
            variant="warning"
          >
            Alterar quantidade
          </Button>
          <Button
            small
            onClick={() => {
              removeItem(product.id);
            }}
            variant="danger"
          >
            Remover
          </Button>
        </div>
      ),
    };
    setItems([...items, item]);
  };

  const handleOpenPaymentTypeSelect = () => {
    togglePaymentTypeModal();
  };

  return (
    <>
      <PaymentTypeModal
        paymentTypeModal={paymentTypeModal}
        togglePaymentTypeModal={togglePaymentTypeModal}
        total={items.reduce((acc, curr) => {
          return acc + stringToNumber(curr.total);
        }, 0)}
        handleSubmitPayment={(paymentTypeId, customerId, discount) => {
          handleSubmitOrder(items.map(i => ({
            ...i,
            total: stringToNumber(i.total),
            unitPrice: stringToNumber(i.unitPrice),
            quantity: stringToNumber(i.quantity),
          })), paymentTypeId, customerId, discount);
          toggleRegisterOrderModal();
        }}
      />

      <Modal
        zIndex={12}
        show={registerOrderModal}
        onClose={() => toggleRegisterOrderModal()}
        width={"80%"}
      >
        <Modal.Title>Nova venda</Modal.Title>
        <Modal.Content>
          <form
            id="registerOrderForm"
            className="vendas-modal-content-register"
            onSubmit={(e) => addItem(e)}
          >
            <div className="vendas-modal-content-register-inputs">
              <CustomSelect
                className="vendas-select-grow"
                id={"product"}
                name={"product"}
                placeholder="Produto"
                label={"Produto"}
                isClearable
                required
                value={searchProduct}
                onChange={setSearchProduct}
                options={products.map((product) => ({
                  label: product.name,
                  value: product.id,
                }))}
              />
              <Input
                name="quantity"
                outerClassname="w350"
                label={"Quantidade"}
                required
                placeholder={"Quantidade"}
              />
              <Button type="submit" variant="success">
                Adicionar
              </Button>
            </div>
          </form>

          <div className="vendas-table-div">
            <Table tableClassname="fill-available">
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
          </div>
          <Button
            onClick={handleOpenPaymentTypeSelect}
            disabled={items.length === 0}
            type="submit"
          >
            {items.length === 0 ? "Adicione items..." : "Ir para pagamento"}
          </Button>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default RegisterOrderModal;
