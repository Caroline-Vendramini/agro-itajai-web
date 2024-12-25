import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import Table from "../../../components/table/Table";
import useAxios from "../../../hooks/useAxios";
import useModal from "../../../hooks/useModal";
import AddBrandModal from "./AddBrandModal";

const BrandsModal = ({
  brandsModal,
  toggleBrandsModal,
  brands
}) => {

  const {
    isModalOpen: addBrandModal,
    toggleModal: toggleAddBrandModal
  } = useModal();

  const { fetchData } = useAxios();


  const handleRegisterBrand = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");

    fetchData({
      method: "POST",
      url: "/brands",
      data: { name }
    })
      .then(() => {
        toggleAddBrandModal();
        toggleBrandsModal();
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <>
      <AddBrandModal addBrandModal={addBrandModal} toggleAddBrandModal={toggleAddBrandModal} handleSubmitBrand={handleRegisterBrand} />
      <Modal
        zIndex={10}
        show={brandsModal}
        onClose={() => toggleBrandsModal()}
        width={"80%"}
      >
        <Modal.Title>
          Marcas
          <div style={{ display: "flex", marginRight: "4px" }}>
            <Button variant="success" onClick={() => toggleAddBrandModal()}>
              Nova marca
            </Button>
          </div>
        </Modal.Title>
        <Modal.Content>
          <Table>
            <Table.Head>
              <Table.Cell>Marca</Table.Cell>
              <Table.Cell>Cadastrado por</Table.Cell>
              <Table.Cell>Cadastrado na loja</Table.Cell>
            </Table.Head>
            <Table.Body>
              {brands.map((brand, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{brand.name}</Table.Cell>
                  <Table.Cell>
                    {brand.CreatedBy.name}
                  </Table.Cell>
                  <Table.Cell>
                    {brand.Store.name}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default BrandsModal;
