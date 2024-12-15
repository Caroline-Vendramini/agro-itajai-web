import { useCallback, useEffect, useState } from "react";
import axios from "../../../axios";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Table from "../../../components/table/Table";
import Typography from "../../../components/typography/Typography";
import { useLoader } from "../../../hooks/useLoader";
import useModal from "../../../hooks/useModal";
import { searchString } from "../../../utils/string";
import RegisterUserModal from "../component/RegisterUserModal";
import UpdateUserModal from "../component/UpdateUserModal";
import UpdateUserPasswordModal from "../component/UpdateUserPasswordModal";
import "./index.css";

const columns = [
  { Header: "Nome", accessor: "name" },
  { Header: "Usuário", accessor: "username" },
  { Header: "Ação", accessor: "action" },
];

function Usuarios() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [updateUser, setUpdateUser] = useState(null);
  const [updateUserPassword, setUpdateUserPassword] = useState(null);

  const { showLoader, hideLoader } = useLoader();

  const {
    isModalOpen: registerUserModal,
    toggleModal: toggleRegisterUserModal,
  } = useModal();
  const { isModalOpen: updateUserModal, toggleModal: toggleUpdateUserModal } =
    useModal();
  const {
    isModalOpen: updateUserPasswordModal,
    toggleModal: toggleUpdateUserPasswordModal,
  } = useModal();

  const handleSearch = useCallback(() => {
    if (!search) {
      setFilteredUsers(users);
      return;
    }
    showLoader();
    const filtered = users.filter(
      (user) =>
        searchString(user.name, search) ||
        searchString(user.username, search) ||
        searchString(user.name + user.username, search) ||
        searchString(user.username + user.name, search)
    );
    setFilteredUsers(filtered);
    hideLoader();
  }, [search, users]);

  const fetchUsers = useCallback(async () => {
    showLoader();
    try {
      const response = await axios.get("users");
      const mappedUsers = response.data.map((user) => {
        return {
          ...user,
          action: (
            <>
              <Button
                onClick={() => {
                  setUpdateUser(user);
                  toggleUpdateUserModal();
                }}
              >
                Editar
              </Button>
              <Button
                variant="warning"
                onClick={() => {
                  setUpdateUserPassword(user);
                  toggleUpdateUserPasswordModal();
                }}
              >
                Alterar senha
              </Button>
            </>
          ),
        };
      });
      setUsers(mappedUsers);
      handleSearch();
    } catch (error) {
      console.error(error);
    }
    hideLoader();
  }, [
    toggleUpdateUserModal,
  ]);

  const handleOpenRegisterUser = () => {
    toggleRegisterUserModal();
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    handleSearch();
  }, [search, users, handleSearch]);

  const handleSubmitUpdateUser = (e) => {
    e.preventDefault();
    const { name, username, id } = updateUser;

    if (!name || !username) {
      alert("Preencha todos os campos");
      return;
    }

    axios
      .patch(`users/${id}`, {
        name,
        username,
      })
      .then(() => {
        fetchUsers();
        toggleUpdateUserModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitUpdateUserPassword = (e) => {
    e.preventDefault();
    const { password, repeatedPassword, id } = updateUserPassword;

    if (!password || !repeatedPassword) {
      alert("Preencha todos os campos");
      return;
    }

    if (password !== repeatedPassword) {
      alert("As senhas não conferem");
      return;
    }

    axios
      .patch(`users/${id}`, {
        password,
      })
      .then(() => {
        fetchUsers();
        toggleUpdateUserPasswordModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const username = formData.get("username");
    const password = formData.get("password");
    const repeatedPassword = formData.get("repeatedPassword");

    if (!name || !username || !password || !repeatedPassword) {
      alert("Preencha todos os campos");
      return;
    }

    if (password !== repeatedPassword) {
      alert("As senhas não conferem");
      return;
    }

    axios
      .post("users", {
        name,
        username,
        password,
      })
      .then(() => {
        fetchUsers();
        toggleRegisterUserModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="usuarios-container">
      {/* Modal de cadastro de usuário */}
      <RegisterUserModal
        registerUserModal={registerUserModal}
        toggleRegisterUserModal={toggleRegisterUserModal}
        handleSubmitUser={handleSubmitUser}
      />

      {/* Modal de atualização de usuário */}
      <UpdateUserModal
        updateUserModal={updateUserModal}
        toggleUpdateUserModal={toggleUpdateUserModal}
        handleSubmitUpdateUser={handleSubmitUpdateUser}
        updateUser={updateUser}
        setUpdateUser={setUpdateUser}
      />

      {/* Modal de atualização de senha do usuário */}
      <UpdateUserPasswordModal
        updateUserPasswordModal={updateUserPasswordModal}
        toggleUpdateUserPasswordModal={toggleUpdateUserPasswordModal}
        handleSubmitUpdateUserPassword={handleSubmitUpdateUserPassword}
        updateUserPassword={updateUserPassword}
        setUpdateUserPassword={setUpdateUserPassword}
      />

      <Typography variant={"h3"}>Usuários</Typography>
      <div className="usuarios-search-area">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          outerClassname="usuarios-grow"
          placeholder={"Nome ou usuário"}
        />
        <Button variant="success" onClick={handleOpenRegisterUser}>
          Cadastrar usuário
        </Button>
      </div>

      <Table>
        <Table.Head>
          {columns.map((column, index) => (
            <Table.Cell key={index}>{column.Header}</Table.Cell>
          ))}
        </Table.Head>
        <Table.Body>
          {filteredUsers.map((row, index) => (
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

export default Usuarios;
