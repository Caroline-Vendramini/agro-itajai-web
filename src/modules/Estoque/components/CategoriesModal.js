import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import Table from "../../../components/table/Table";
import useAxios from "../../../hooks/useAxios";
import useModal from "../../../hooks/useModal";
import AddCategoryModal from "./AddCategoryModal";

const CategoriesModal = ({
  categoriesModal,
  toggleCategoriesModal,
  categories
}) => {

  const {
    isModalOpen: addCategoryModal,
    toggleModal: toggleAddCategoryModal
  } = useModal();

  const { fetchData } = useAxios();


  const handleRegisterCategory = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");

    fetchData({
      method: "POST",
      url: "/categories",
      data: { name }
    })
      .then(() => {
        toggleAddCategoryModal();
        toggleCategoriesModal();
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <>
      <AddCategoryModal addCategoryModal={addCategoryModal} toggleAddCategoryModal={toggleAddCategoryModal} handleSubmitCategory={handleRegisterCategory} />
      <Modal
        zIndex={10}
        show={categoriesModal}
        onClose={() => toggleCategoriesModal()}
        width={"80%"}
      >
        <Modal.Title>
          Categorias
          <div>
            <Button variant="success" onClick={() => toggleAddCategoryModal()}>
              Nova categoria
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
              {categories.map((category, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{category.name}</Table.Cell>
                  <Table.Cell>
                    {category.CreatedBy.name}
                  </Table.Cell>
                  <Table.Cell>
                    {category.Store.name}
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

export default CategoriesModal;
