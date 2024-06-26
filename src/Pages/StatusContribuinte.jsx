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
      const response = await fetch(`${backendUrl}/contribuintes/${cpf}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API: " + response.statusText);
      }
      const data = await response.json();
      setContribuinteEncontrado(data);
      setSearchCPF("");
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      setError(error.message);
    }
  };

  const atualizarStatusContribuinte = async (cpf, status) => {
    try {
      const response = await fetch(
        `${backendUrl}/contribuintes/${cpf}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao atualizar contribuinte: " + response.statusText);
      }
      fetchContribuinteDetalhado(cpf);
      fetchContribuintes();
    } catch (error) {
      console.error("Erro ao atualizar contribuinte:", error);
      setError(error.message);
    }
  };

  const fetchContribuinteDetalhado = async (cpf) => {
    try {
      const response = await fetch(`${backendUrl}/contribuintes/${cpf}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API: " + response.statusText);
      }
      const data = await response.json();
      setContribuinteEncontrado(data);
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      setError(error.message);
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.h1}>Ativar/Inativar Contribuinte</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className="col-sm-5 col-lg-5 mb-3">
        <div className="br-input large input-button">
          <label htmlFor="input-search-large">CPF do contribuinte:</label>
          <input
            type="text"
            value={searchCPF}
            onChange={(e) => setSearchCPF(e.target.value)}
            placeholder="Digite o CPF"
          />
          <button
            className="br-button"
            onClick={handleSearch}
            aria-label="Buscar"
          >
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <ul>
        {contribuinteEncontrado ? (
          <li>
            {contribuinteEncontrado.nome_civil} ({contribuinteEncontrado.cpf}) -{" "}
            <div className="d-flex align-items-center mt-1">
              {contribuinteEncontrado.status ? (
                <>
                  <span
                    className="br-tag status bg-success large"
                    aria-describedby="tag-status-03"
                  ></span>
                  <span className="ml-1" id="tag-status-03">
                    Ativo
                  </span>
                </>
              ) : (
                <>
                  <span
                    className="br-tag status bg-danger large"
                    aria-describedby="tag-status-01"
                  ></span>
                  <span className="ml-1" id="tag-status-01">
                    Inativo
                  </span>
                </>
              )}
            </div>
            <button
              onClick={() => atualizarStatusContribuinte(contribuinteEncontrado.cpf, true)}
            >
              Ativar
            </button>
            <button
              onClick={() => atualizarStatusContribuinte(contribuinteEncontrado.cpf, false)}
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
