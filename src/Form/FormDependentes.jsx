import React, { useState, useEffect } from "react";
import styles from "../Form/Form.module.css";
import { useLocation } from "react-router-dom";

function FormDependente() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cpfContribuinteQueryParam = queryParams.get("cpfContribuinte");

  const [cpfContribuinte, setCpfContribuinte] = useState(
    cpfContribuinteQueryParam || ""
  );
  const [contribuinte, setContribuinte] = useState(null);
  const [cpfDependente, setCpfDependente] = useState("");
  const [nomeCivil, setNomeCivil] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSearchContribuinte = async (cpf) => {
    if (cpf.trim() === "" || !/^\d{11}$/.test(cpf)) {
      setSearchError("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setSearchError("");
    }

    try {
      const response = await fetch(`${backendUrl}/contribuintes/${cpf}`);
      const data = await response.json();

      if (response.ok) {
        setContribuinte(data);
      } else {
        setContribuinte(null);
        setErrorMessage(data.error || "Contribuinte não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar contribuinte:", error);
      setErrorMessage("Erro ao buscar contribuinte.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cpfDependente.trim() === "" || !/^\d{11}$/.test(cpfDependente)) {
      setCpfError("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfError("");
    }

    try {
      const response = await fetch(
        `${backendUrl}/contribuintes/${cpfContribuinte}/dependentes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cpf: cpfDependente,
            nomeCivil: nomeCivil,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(
          "Dependente cadastrado com sucesso e vinculado ao contribuinte."
        );
      } else {
        setErrorMessage(data.error || "Erro ao cadastrar dependente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar dependente:", error);
      setErrorMessage("Erro ao cadastrar dependente.");
    }

    setCpfDependente("");
    setNomeCivil("");
  };

  const handleCloseMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  useEffect(() => {
    setContribuinte(null);
  }, [cpfContribuinte]);

  return (
    <div className={styles.form}>
      <h1 className={styles.h1}>Cadastro de Dependentes</h1>

      {successMessage && (
        <div className="br-message success">
          <div className="icon">
            <i className="fas fa-check-circle fa-lg" aria-hidden="true"></i>
          </div>
          <div
            className="content"
            aria-label="Sucesso. Os dados foram registrados!."
            role="alert"
          >
            <span className="message-title">Sucesso.</span>
            <span className="message-body">{successMessage}</span>
          </div>
          <div className="close">
            <button
              className="br-button circle small"
              type="button"
              aria-label="Fechar a mensagem alerta"
              onClick={handleCloseMessage}
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="br-message danger">
          <div className="icon">
            <i
              className="fas fa-exclamation-triangle fa-lg"
              aria-hidden="true"
            ></i>
          </div>
          <div
            className="content"
            aria-label="Erro. Ocorreu um erro ao tentar realizar o cadastro."
            role="alert"
          >
            <span className="message-title">Erro.</span>
            <span className="message-body">{errorMessage}</span>
          </div>
          <div className="close">
            <button
              className="br-button circle small"
              type="button"
              aria-label="Fechar a mensagem alerta"
              onClick={handleCloseMessage}
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      )}

      <div className="col-sm-5 col-lg-5 mb-3">
        <div className="br-input large input-button">
          <label htmlFor="input-search-large">CPF do contribuinte:</label>
          <input
              id="cpfContribuinte"
              type="search"
              placeholder="Digite o CPF"
              value={cpfContribuinte}
              onChange={(e) => {
                setCpfContribuinte(e.target.value);
                if (
                  e.target.value.trim() === "" ||
                  !/^\d{11}$/.test(e.target.value)
                ) {
                  setCpfError(
                    "CPF inválido. Deve conter apenas números e 11 dígitos."
                  );
                } else {
                  setCpfError("");
                }
              }}
            />
          <button
            className="br-button"
            onClick={() => handleSearchContribuinte(cpfContribuinte)}
            aria-label="Buscar"
          >
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
          {cpfError && (
              <div className="mb-3">
                <span className="feedback danger" role="alert">
                  <i className="fas fa-times-circle" aria-hidden="true"></i>
                  {cpfError}
                </span>
              </div>
            )}
        </div>
      </div>

      {searchError && (
        <div className="mb-3">
          <span className="feedback danger" role="alert">
            <i className="fas fa-times-circle" aria-hidden="true"></i>
            {searchError}
          </span>
        </div>
      )}
      {contribuinte && (
        <>
          <div>
            <h2 className={styles.h1}>Cadastre o dependente</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="cpfDependente">
                  CPF do dependente:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfDependente"
                  value={cpfDependente}
                  placeholder="Digite o CPF do dependente"
                  className={cpfError ? "error" : ""}
                  onChange={(e) => {
                    setCpfDependente(e.target.value);
                    if (
                      e.target.value.trim() === "" ||
                      !/^\d{11}$/.test(e.target.value)
                    ) {
                      setCpfError(
                        "CPF inválido. Deve conter apenas números e 11 dígitos."
                      );
                    } else {
                      setCpfError("");
                    }
                  }}
                />
              </div>
            </div>

            
            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="nomeCivil">
                  Nome Civil:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="nomeCivil"
                  value={nomeCivil}
                  placeholder="Nome civil do dependente"
                  onChange={(e) => setNomeCivil(e.target.value)}
                />
              </div>
            </div>
            <button className={styles.button_dep} type="submit">
              Enviar
            </button>
          </form>
        </>
      )}
      {!contribuinte && (
        <div className="mb-3">
          <span className="feedback info" role="alert">
            <i className="fas fa-info-circle" aria-hidden="true"></i>Busque o
            CPF do contribuinte ao qual deseja vincular um dependente.
          </span>
        </div>
      )}
    </div>
  );
}

export default FormDependente;
