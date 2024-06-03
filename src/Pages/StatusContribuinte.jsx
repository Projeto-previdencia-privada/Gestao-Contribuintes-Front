import React, { useEffect, useState } from "react";
import styles from "../Form/Form.module.css";

const StatusContribuinte = () => {
  const [contribuintes, setContribuintes] = useState([]);
  const [searchCPF, setSearchCPF] = useState("");
  const [contribuinteEncontrado, setContribuinteEncontrado] = useState(null);

  useEffect(() => {
    fetchContribuintes();
  }, []);

  const fetchContribuintes = async () => {
    try {
      const response = await fetch("/contribuintes");
      const data = await response.json();

      if (Array.isArray(data)) {
        setContribuintes(data);
      } else {
        console.error("Resposta inesperada:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar contribuintes:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/contribuintes/${searchCPF}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API: " + response.statusText);
      }
      const data = await response.json();
      setContribuinteEncontrado(data.info);
      setSearchCPF("");
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
    }
  };

  const ativarContribuinte = async (cpf) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contribuintes/${cpf}/ativar`, {
        method: "PUT",
      });
      const data = await response.json();
      console.log(data);
      fetchContribuintes();
    } catch (error) {
      console.error("Erro ao ativar contribuinte:", error);
    }
  };

  const inativarContribuinte = async (cpf) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/contribuintes/${cpf}/inativar`, {
        method: "PUT",
      });
      const data = await response.json();
      console.log(data);
      fetchContribuintes();
    } catch (error) {
      console.error("Erro ao inativar contribuinte:", error);
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.h1}>Ativar/Inativar Contribuinte</h1>
      <div>
        <input
          type="text"
          value={searchCPF}
          onChange={(e) => setSearchCPF(e.target.value)}
          placeholder="Buscar CPF"
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
      <ul>
        {contribuinteEncontrado ? (
          <li>
            {contribuinteEncontrado.nome} ({contribuinteEncontrado.cpf}) -{" "}
            {contribuinteEncontrado.ativo ? "Ativo" : "Inativo"}
            <button
              onClick={() => ativarContribuinte(contribuinteEncontrado?.cpf)}
            >
              Ativar
            </button>
            <button
              onClick={() => inativarContribuinte(contribuinteEncontrado?.cpf)}
            >
              Inativar
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default StatusContribuinte;
