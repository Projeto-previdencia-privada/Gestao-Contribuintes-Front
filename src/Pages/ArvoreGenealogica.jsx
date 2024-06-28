import React, { useState } from "react";
import styles from "../Form/Form.module.css";
import { Tree, TreeNode } from "react-organizational-chart";

function ArvoreGenealogica() {
  const [cpf, setCpf] = useState("");
  const [familiares, setFamiliares] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cpfError, setCpfError] = useState("");
  const [errorMessage, setErrorMessage ] = useState("");

  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSearch = async () => {
    if (cpf.trim() === "" || !/^\d{11}$/.test(cpf)) {
      setCpfError("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfError("");
    }

    try {
      setLoading(true);
      setErrorMessage("");
      const response = await fetch(
        `${backendUrl}/contribuintes/familia/${cpf}`
      );
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("400");
        } else if (response.status === 404) {
          throw new Error("404");
        } else {
          throw new Error("Erro ao buscar dados da API");
        }
      }

      const data = await response.json();
      setFamiliares(data.familia);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.message === "400") {
        setErrorMessage(
          `CPF inválido`
        );
      } else if (error.message === "404") {
        setErrorMessage(
          `CPF não encontrado`
        );
      } else {
        setErrorMessage("Erro ao buscar dados da API");
      }
    }
  };

  const handleCloseMessage = () => {
    setErrorMessage("");
  };

  const renderTree = (node) => {
    if (!node) return null;
    return (
      <TreeNode
        label={
          <div>
            {node.nomeCivil} ({node.cpf})
          </div>
        }
      >
        {node.pais && node.pais.map((paiOuMae) => renderTree(paiOuMae))}
        {node.avos &&
          node.avos.map((avo) => (
            <TreeNode
              key={avo.cpf}
              label={
                <div>
                  {avo.nomeCivil} ({avo.cpf})
                </div>
              }
            >
              {renderTree(avo)}
            </TreeNode>
          ))}
      </TreeNode>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.h1}>Árvore Genealógica</h1>

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
            <label htmlFor="input-search-large">Buscar</label>
            <input
              id="input-search-large"
              type="search"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={(e) => {
                setCpf(e.target.value);
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
            type="button"
            aria-label="Buscar"
            onClick={handleSearch}
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
        
        

        {familiares && (
          <div className="br-list" role="list">
            <div className="header">
              <div className="title">Contribuinte</div>
            </div>
            <span className="br-divider"></span>
            <>
              <div className="br-item" role="listitem">
                {familiares.nomeCivilPrincipal} ({familiares.cpfPrincipal})
              </div>
            </>

            <div className="header">
              <div className="title">Pais</div>
            </div>
            <span className="br-divider"></span>
            {familiares.pais &&
              familiares.pais.map((pai) => (
                <div className="br-item" role="listitem" key={pai.cpf}>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <i className="fas fa-heartbeat" aria-hidden="true"></i>
                    </div>
                    <div className="col">
                      {pai.nomeCivil} ({pai.cpf})
                    </div>
                  </div>
                </div>
              ))}

            <div className="header">
              <div className="title">Avós</div>
            </div>
            <span className="br-divider"></span>
            {familiares.avos &&
              familiares.avos.map((avo) => (
                <div className="br-item" role="listitem" key={avo.cpf}>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <i className="fas fa-heartbeat" aria-hidden="true"></i>
                    </div>
                    <div className="col">
                      {avo.nomeCivil} ({avo.cpf})
                    </div>
                  </div>
                </div>
              ))}

            <div className="header">
              <div className="title">Filhos</div>
            </div>
            <span className="br-divider"></span>
            {familiares.dependentes &&
              familiares.dependentes.map((filho) => (
                <div className="br-item" role="listitem" key={filho.cpf}>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <i className="fas fa-heartbeat" aria-hidden="true"></i>
                    </div>
                    <div className="col">
                      {filho.nomeCivil} ({filho.cpf})
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArvoreGenealogica;
