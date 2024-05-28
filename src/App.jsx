import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./Components/Footer/Footer.jsx";
import Header from "./Components/Header/Header.jsx";
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

const Private = ({ Item }) => {
  const { signed } = useAuth();

  return signed ? <Item /> : <CadastroContribuintes />;
};

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "cadastroLogin",
    element: <CadastroLogin />,
  },
  {
    path: "cadastroContribuintes",
    element: <Private Item={CadastroContribuintes} />,
    exact: true,
  },
  {
    path: "cadastro",
    element: <Cadastro />,
  },
  {
    path: "atualizaCadastro",
    element: <AtualizaCadastro />,
  },
  {
    path: "infoContribuicao",
    element: <InfoPrev />,
  },
  {
    path: "cadastroDependentes",
    element: <CadastroDependentes />,
  },
  {
    path: "arvoreGenealogica",
    element: <ArvoreGenealogica />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </AuthProvider>
  </React.StrictMode>
);
