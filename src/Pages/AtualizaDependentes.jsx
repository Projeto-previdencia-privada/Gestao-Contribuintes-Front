import React, { useState } from "react";
import styles from "../Form/Form.module.css";

function AtualizaDependentes() {
  const [contribuinte, setContribuinte] = useState(null);
  const [dependentes, setDependentes] = useState([]);
  const [cpf, setCpf] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [noDependentsMessage, setNoDependentsMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedDependente, setSelectedDependente] = useState(null);

  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSearch = async (cpf) => {
    if (cpf.trim() === "" || !/^\d{11}$/.test(cpf)) {
      setCpfError("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfError("");
    }

    try {
      const response = await fetch(
        `${backendUrl}/contribuintes/${cpf}/dependentes`
      );

      if (response.status === 404) {
        setNotFoundMessage("O contribuinte não está cadastrado.");
        return;
      }
      if (response.status === 400) {
        setErrorMessage("O CPF não é válido.");
        return;
      }
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API: " + response.statusText);
      }
      const data = await response.json();
      setContribuinte(data.info);
      setDependentes(data.dependentes || []);
      if (!data.dependentes || data.dependentes.length === 0) {
        setNoDependentsMessage("Não existe dependentes vinculados a este CPF.");
      } else {
        setNoDependentsMessage("");
      }
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      setErrorMessage("Erro ao buscar dados da API");
    }
  };

  const handleDelete = async (cpfDependente) => {
    try {
      const response = await fetch(
        `${backendUrl}/contribuintes/dependentes/${cpf}/${cpfDependente}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setSuccessMessage("Dependente excluído com sucesso.");
        setDependentes(dependentes.filter((dep) => dep.cpf !== cpfDependente));
      } else {
        const data = await response.json();
        setErrorMessage(data.message || "Erro ao excluir dependente.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
      setErrorMessage("Erro ao enviar dados para a API.");
    }
  };

  const handleCpfChange = (e) => {
    const inputCpf = e.target.value;
    setCpf(inputCpf);
    if (e.target.value.trim() === "" || !/^\d{11}$/.test(e.target.value)) {
      setCpfError("CPF inválido. Deve conter apenas números e 11 dígitos.");
    } else {
      setCpfError("");
    }
    setNotFoundMessage("");
    setErrorMessage("");
    setSuccessMessage("");
    setNoDependentsMessage("");
  };

  const confirmDelete = (cpfDependente) => {
    setSelectedDependente(cpfDependente);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedDependente);
    setShowConfirmation(false);
    setSelectedDependente(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setSelectedDependente(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.h1}>Excluir Dependentes</h1>

        {successMessage && (
          <div className="br-message success">
            <div className="icon">
              <i className="fas fa-check-circle fa-lg" aria-hidden="true"></i>
            </div>
            <div
              className="content"
              aria-label="Sucesso. Os dados foram atualizados!."
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
                onClick={() => setSuccessMessage("")}
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="br-message danger">
            <div className="icon">
              <i className="fas fa-times-circle fa-lg" aria-hidden="true"></i>
            </div>
            <div className="content" aria-label="CPF inválido " role="alert">
              <span className="message-title">
                Campo inválido! Por favor, revise a informação.
              </span>
            </div>
            <div className="close">
              <button
                className="br-button circle small"
                type="button"
                aria-label="Fechar a mensagem alerta"
                onClick={() => setErrorMessage("")}
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        )}

        {notFoundMessage && (
          <div className="br-message danger">
            <div className="icon">
              <i className="fas fa-times-circle fa-lg" aria-hidden="true"></i>
            </div>
            <div
              className="content"
              aria-label="CPF não encontrado."
              role="alert"
            >
              <span className="message-title">
                O contribuinte não está cadastrado.
              </span>
            </div>
            <div className="close">
              <button
                className="br-button circle small"
                type="button"
                aria-label="Fechar a mensagem alerta"
                onClick={() => setNotFoundMessage("")}
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        )}

        {noDependentsMessage && (
          <div className="br-message warning">
            <div className="icon">
              <i className="fas fa-exclamation-triangle fa-lg" aria-hidden="true"></i>
            </div>
            <div className="content" aria-label="Em caso de dúvida, não compartilhe sua senha com terceiros. Ligue para a Central de atendimento." role="alert">
              <span className="message-title">Atenção.</span>
              <span className="message-body">Não existe dependentes vinculados a este CPF.</span>
            </div>
            <div className="close">
              <button className="br-button circle small" type="button" aria-label="Fechar a mensagem alerta" onClick={() => setNoDependentsMessage("")}>
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        )}

        {showConfirmation && (
          <div className="br-message warning">
            <div className="icon">
              <i className="fas fa-exclamation-triangle fa-lg" aria-hidden="true"></i>
            </div>
            <div className="content" aria-label="Em caso de dúvida, não compartilhe sua senha com terceiros. Ligue para a Central de atendimento." role="alert">
              <span className="message-title">Atenção.</span>
              <span className="message-body">O dependente será desvinculado do Contribuinte, Gostaria de realizar essa ação?</span>
            </div>
            <div className="actions">
              <button className="br-button primary" onClick={handleConfirmDelete}>Sim</button>
              <button className="br-button secondary" onClick={handleCancelDelete}>Não</button>
            </div>
            <div className="close">
              <button className="br-button circle small" type="button" aria-label="Fechar a mensagem alerta" onClick={() => setShowConfirmation(false)}>
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        )}

        <div className="col-sm-5 col-lg-5 mb-3">
          <div className="br-input large input-button">
            <label htmlFor="input-search-large">CPF do contribuinte:</label>
            <input
              type="text"
              id="cpf"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={handleCpfChange}
            />

            <button
              className="br-button"
              onClick={() => handleSearch(cpf)}
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

        {dependentes.length > 0 && (
          <>
            <h2>Dependentes vinculados</h2>
            {dependentes.map((dependente, index) => (
              <div key={index} className="col-sm-20 col-lg-30 mb-2">
                <div className="input-label">
                  <label className="text-nowrap" htmlFor={`nomeCivil-${index}`}>
                    Nome Civil:
                  </label>
                </div>
                <div className="br-input input-inline">
                  <input
                    type="text"
                    id={`nomeCivil-${index}`}
                    value={dependente.nomeCivil}
                    readOnly
                  />
                </div>

                <button
                  className="br-button danger"
                  onClick={() => confirmDelete(dependente.cpf)}
                >
                  Excluir
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default AtualizaDependentes;
