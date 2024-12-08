import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <div />
        <nav>
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/vendas">Vendas</Link></li>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/contabilidade">Contabilidade</Link></li>
            <li><Link to="/estoque">Estoque</Link></li>
            <li><Link to="/usuarios">Usuário</Link></li>
            <li><Link to="/configuracoes">Configurações</Link></li>
          </ul>
        </nav>
      </aside>
      <div className="main-content">
        <header className="header roboto-medium">
          <h1>Agro Itajaí</h1>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;