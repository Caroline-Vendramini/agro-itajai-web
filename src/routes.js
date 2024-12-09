import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./modules/Login/page";
import Dashboard from "./modules/Dashboard/page";
import Vendas from "./modules/Vendas/page";
import Clientes from "./modules/Clientes/page";
import Contabilidade from "./modules/Contabilidade/page";
import Usuarios from "./modules/Usuarios/page";
import Estoque from "./modules/Estoque/page";
import Configuracoes from "./modules/Configuracoes/page";
import Layout from "./components/layout/Layout";

function RoutesApp() {
    // TODO: Implementar a lógica de autenticação
    const isLogged = true; // Simulando que o usuário está logado
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={<PublicRoute isLogged={isLogged} element={<Login />} />}
                />
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <ProtectedRoute isLogged={isLogged} element={<Dashboard />} />
                        }
                    />
                    <Route
                        path="/vendas"
                        element={
                            <ProtectedRoute isLogged={isLogged} element={<Vendas />} />
                        }
                    />
                    <Route
                        path="/clientes"
                        element={
                            <ProtectedRoute isLogged={isLogged} element={<Clientes />} />
                        }
                    />
                    <Route
                        path="/contabilidade"
                        element={
                            <ProtectedRoute isLogged={isLogged} element={<Contabilidade />} />
                        }
                    />
                    <Route
                        path="/estoque"
                        element={
                            <ProtectedRoute isLogged={isLogged} element={<Estoque />} />
                        }
                    />
                    <Route
                        path="/usuarios"
                        element={
                            <ProtectedRoute isLogged={isLogged} element={<Usuarios />} />
                        }
                    />
                    <Route
                        path="/configuracoes"
                        element={
                            <ProtectedRoute isLogged={isLogged} element={<Configuracoes />} />
                        }
                    />
                </Route>
                <Route path="*" element={<NavigateTo isLogged={isLogged} />} />
            </Routes>
        </BrowserRouter>
    );
}

const ProtectedRoute = ({ isLogged, element }) => {
    return isLogged ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ isLogged, element }) => {
    return !isLogged ? element : <Navigate to="/" replace />;
};

const NavigateTo = ({ isLogged }) => {
    return !isLogged ? (
        <Navigate to="/login" replace />
    ) : (
        <Navigate to="/" />
    );
};

export default RoutesApp;
