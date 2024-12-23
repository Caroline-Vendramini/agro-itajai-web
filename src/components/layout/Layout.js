import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { SELECTED_UNIT_ID, TOKEN } from "../../constants";
import useStorage from "../../hooks/useStorage";
import "./Layout.css";
import { useUnit } from "../../hooks/useUnit";

const Layout = () => {
  const { storedValue, removeValue } = useStorage(TOKEN, "");
  const { selectedUnit, setSelectedUnit, units } = useUnit();
  const { setValue } = useStorage(SELECTED_UNIT_ID, null);

  const handleLogoutClick = () => {
    removeValue();
    window.location.reload();
  };

  const handleChangeUnit = (e) => {
    const selected = units.find(unit => unit.id.toString() === e.target.value);
    setSelectedUnit(selected);
    setValue(selected.id);
    window.location.reload();
  }

  if (storedValue && !selectedUnit) {
    return <div>Carregando...</div>
  }

  if (!storedValue) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/vendas">Vendas</Link>
            </li>
            <li>
              <Link to="/clientes">Clientes</Link>
            </li>
            <li>
              <Link to="/contabilidade">Contabilidade</Link>
            </li>
            <li>
              <Link to="/estoque">Estoque</Link>
            </li>
            <li>
              <Link to="/usuarios">Usuário</Link>
            </li>
            <li>
              <Link to="/configuracoes">Configurações</Link>
            </li>
            <li>
              <Link onClick={handleLogoutClick}>Sair</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="main-content">
        <header className="header roboto-medium">
          <h1>Agro Itajaí - Unidade {selectedUnit.name}</h1>
          <select
            onChange={handleChangeUnit}
            value={selectedUnit?.id}
          >
            {units.map(unit => (
              <option key={unit.id} value={unit.id}>{unit.name}</option>
            ))}
          </select>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
