import React, { useState } from "react";
import styles from "../Form/Form.module.css";

function AtualizaDependentes() {
  const [contribuinte, setContribuinte] = useState(null);
  const [cpf, setCpf] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notFoundMessage, setNotFoundMessage] = useState("");
  const [dependentes, setDependentes] = useState([]);

  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSearch = async (cpf) => {
    try {
      const response = await fetch(`${backendUrl}/contribuintes/${cpf}/dependentes`);
      
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
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
      setErrorMessage("Erro ao buscar dados da API");
    }
  };

  const handleDelete = async (cpfDependente) => {
    try {
      const response = await fetch(`${backendUrl}/contribuintes/dependentes/${cpf}/${cpfDependente}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    setNotFoundMessage("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className={styles.container}>
      {successMessage && (
        <div className="br-message success">
          <div className="icon">
            <i className="fas fa-check-circle fa-lg" aria-hidden="true"></i>
          </div>
          <div className="content" aria-label="Sucesso. Os dados foram atualizados!." role="alert">
            <span className="message-title">Sucesso.</span>
            <span className="message-body">{successMessage}</span>
          </div>
          <div className="close">
            <button className="br-button circle small" type="button" aria-label="Fechar a mensagem alerta" onClick={() => setSuccessMessage("")}>
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
            <button className="br-button circle small" type="button" aria-label="Fechar a mensagem alerta" onClick={() => setErrorMessage("")}>
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
          <div className="content" aria-label="CPF não encontrado." role="alert">
            <span className="message-title">
              O contribuinte não está cadastrado.
            </span>
          </div>
          <div className="close">
            <button className="br-button circle small" type="button" aria-label="Fechar a mensagem alerta" onClick={() => setNotFoundMessage("")}>
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      )}

      <div className={styles.form}>
        <h1 className={styles.h1}>Excluir Dependentes</h1>

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
            <button className="br-button" onClick={() => handleSearch(cpf)} aria-label="Buscar">
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
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
                <button className="br-button danger" onClick={() => handleDelete(dependente.cpf)}>
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
