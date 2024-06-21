import React, { useEffect, useState } from "react";
import styles from "../Form/Form.module.css";

const StatusContribuinte = () => {
  const [contribuintes, setContribuintes] = useState([]);
  const [searchCPF, setSearchCPF] = useState("");
  const [contribuinteEncontrado, setContribuinteEncontrado] = useState(null);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchContribuintes();
  }, []);

  const fetchContribuintes = async () => {
    try {
      const response = await fetch(`${backendUrl}/contribuintes`);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API: " + response.statusText);
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        setContribuintes(data);
      } else {
        console.error("Resposta inesperada:", data);
      }
    } catch (error) {
      console.error("Erro ao buscar contribuintes:", error);
      setError(error.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`${backendUrl}/contribuintes/${searchCPF}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API: " + response.statusText);
      }
      const data = await response.json();
      setContribuinteEncontrado(data.info);
      setSearchCPF("");
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      setError(error.message);
    }
  };

  const ativarContribuinte = async (cpf) => {
    try {
      const response = await fetch(`${backendUrl}/contribuintes/${cpf}/ativar`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Erro ao ativar contribuinte: " + response.statusText);
      }
      await response.json();
      // Atualize o status do contribuinte encontrado
      setContribuinteEncontrado((prev) => prev && { ...prev, ativo: true });
      fetchContribuintes();
    } catch (error) {
      console.error("Erro ao ativar contribuinte:", error);
      setError(error.message);
    }
  };

  const inativarContribuinte = async (cpf) => {
    try {
      const response = await fetch(`${backendUrl}/contribuintes/${cpf}/inativar`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Erro ao inativar contribuinte: " + response.statusText);
      }
      await response.json();
      // Atualize o status do contribuinte encontrado
      setContribuinteEncontrado((prev) => prev && { ...prev, ativo: false });
      fetchContribuintes();
    } catch (error) {
      console.error("Erro ao inativar contribuinte:", error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.h1}>Ativar/Inativar Contribuinte</h1>
      {error && <p className={styles.error}>{error}</p>}
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
              onClick={() => ativarContribuinte(contribuinteEncontrado.cpf)}
            >
              Ativar
            </button>
            <button
              onClick={() => inativarContribuinte(contribuinteEncontrado.cpf)}
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
