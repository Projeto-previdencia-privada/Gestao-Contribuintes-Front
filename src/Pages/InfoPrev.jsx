import React, { useState } from "react";
import styles from "../Form/Form.module.css";

function InfoPrev() {
  const [cpf, setCpf] = useState("");
  const [contribuinte, setContribuinte] = useState(null);
  const [mensagemErro, setMensagemErro] = useState("");

  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSearch = async () => {
    try {
      setMensagemErro("");
      const response = await fetch(`${backendUrl}/contribuintes/${cpf}`);
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error("400");
        } else if (response.status === 404) {
          throw new Error("404");
        } else {
          throw new Error("Erro na resposta da API");
        }
      }
      const data = await response.json();
      console.log("Dados recebidos da API:", data); // Log da resposta da API
      setContribuinte(data.info);
    } catch (error) {
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

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.h1}>Dados da Contribuição</h1>
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

        {contribuinte && (
          <div className="br-list" role="list">
            <div className="header">
              <div className="title">Dados do Contribuinte</div>
            </div>
            <span className="br-divider"></span>
            <div className="br-item" role="listitem">
              Início da Contribuição: {contribuinte.inicioContribuicao}
            </div>
            <div className="br-item" role="listitem">
              Salário: {contribuinte.salario}
            </div>
            <div className="br-item" role="listitem">
              Categoria: {contribuinte.categoria}
            </div>
            <div className="br-item" role="listitem">
              CPF: {contribuinte.cpf}
            </div>
            <div className="br-item" role="listitem">
              Status: {contribuinte.status ? "Ativo" : "Inativo"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoPrev;
