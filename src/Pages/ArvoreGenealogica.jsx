import React, { useState } from "react";
import styles from "../Form/Form.module.css";
import { Tree, TreeNode } from "react-organizational-chart";

function ArvoreGenealogica() {
  const [cpf, setCpf] = useState("");
  const [familiares, setFamiliares] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleSearch = async () => {
    try {
      setLoading(true);
      setMensagemErro(""); // Limpar mensagem de erro anterior
      const response = await fetch(
        `http://localhost:8080/contribuintes/familia/${cpf}`
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
        setMensagemErro(
          `<div class="br-message danger">
            <div class="icon"><i class="fas fa-times-circle fa-lg" aria-hidden="true"></i></div>
            <div class="content" aria-label="CPF inválido." role="alert">
              <span class="message-title">O cpf não é válido.</span>
            </div>
          </div>`
        );
      } else if (error.message === "404") {
        setMensagemErro(
          `<div class="br-message danger">
            <div class="icon"><i class="fas fa-times-circle fa-lg" aria-hidden="true"></i></div>
            <div class="content" aria-label="CPF não encontrado." role="alert">
              <span class="message-title">O contribuinte não está cadastrado.</span>
            </div>
          </div>`
        );
      } else {
        setMensagemErro("Erro ao buscar dados da API");
      }
    }
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
        <div className="col-sm-5 col-lg-5 mb-3">
          <div className="br-input large input-button">
            <label htmlFor="input-search-large">Buscar</label>
            <input
              id="input-search-large"
              type="search"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <button
              className="br-button"
              type="button"
              aria-label="Buscar"
              onClick={handleSearch}
            >
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        
        {mensagemErro && (
          <div dangerouslySetInnerHTML={{ __html: mensagemErro }} />
        )}

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
