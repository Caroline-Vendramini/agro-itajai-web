import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { SELECTED_UNIT_ID, TOKEN } from "../../constants";
import useStorage from "../../hooks/useStorage";
import "./Layout.css";
import { useUnit } from "../../hooks/useUnit";

const routes = [
  { path: "/", label: "Início", key: "home" },
  { path: "/vendas", label: "Vendas", key: "vendas" },
  { path: "/clientes", label: "Clientes", key: "clientes" },
  { path: "/caixa", label: "Caixa", key: "caixa" },
  { path: "/estoque", label: "Estoque", key: "estoque" },
  { path: "/usuarios", label: "Usuário", key: "usuarios" },
  { path: "/configuracoes", label: "Configurações", key: "configuracoes" },
];

const Layout = () => {
  const { storedValue, removeValue } = useStorage(TOKEN, "");
  const { selectedUnit, setSelectedUnit, units } = useUnit();
  const { setValue } = useStorage(SELECTED_UNIT_ID, null);
  const [activeTab, setActiveTab] = useState("home");

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("home");
    } else {
      setActiveTab(location.pathname.replace("/", ""));
    }
  }, [location]);

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
            {routes.map(route => (
              <li key={route.key} onClick={() => setActiveTab(route.key)}>
                <Link to={route.path} className={activeTab === route.key ? "route-tab-active" : ""}>{route.label}</Link>
              </li>
            ))}

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
