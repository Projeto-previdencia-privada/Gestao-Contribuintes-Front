import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Components/Footer/Footer.jsx";
import Header from "./Components/Header/Header.jsx";
import HomeHeader from "./Components/Header/HomeHeader.jsx"
import { AuthProvider } from "./Contexts/Auth.jsx";
import useAuth from "./Hooks/useAuth.jsx";
import ArvoreGenealogica from "./Pages/ArvoreGenealogica";
import AtualizaCadastro from "./Pages/AtualizaCadastro.jsx";
import Cadastro from "./Pages/Cadastro.jsx";
import CadastroContribuintes from "./Pages/CadastroContribuintes.jsx";
import CadastroDependentes from "./Pages/CadastroDependentes";
import CadastroLogin from "./Pages/CadastroLogin.jsx";
import InfoPrev from "./Pages/InfoPrev.jsx";
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home";
import EsqueceSenha from "./Pages/EsqueceSenha.jsx";
import StatusContribuinte from "./Pages/StatusContribuinte.jsx";

const Private = ({ Item }) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <CadastroContribuintes />;
};

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/home' ? <HomeHeader /> : <Header />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroLogin" element={<CadastroLogin />} />
        <Route path="/esqueceuSenha" element={<EsqueceSenha />} />
        <Route path="/cadastroContribuintes" element={<Private Item={CadastroContribuintes} />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/atualizaCadastro" element={<AtualizaCadastro />} />
        <Route path="/infoContribuicao" element={<InfoPrev />} />
        <Route path="/cadastroDependentes" element={<CadastroDependentes />} />
        <Route path="/arvoreGenealogica" element={<ArvoreGenealogica />} />
        <Route path="/statusContribuinte" element={<StatusContribuinte />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => (
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
