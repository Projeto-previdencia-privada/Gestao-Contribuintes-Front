import React, { useState } from "react";
import styles from "../Form/Form.module.css";

function InfoPrev() {
  const [cpf, setCpf] = useState("");
  const [contribuinte, setContribuinte] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/contribuintes/${cpf}`);
      if (!response.ok) {
        throw new Error('Erro na resposta da API');
      }
      const data = await response.json();
      setContribuinte(data.info);
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
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
            <button className="br-button" type="button" aria-label="Buscar" onClick={handleSearch}>
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        {contribuinte && (
          <div className="br-list" role="list">
            <div className="header">
              <div className="title">Dados do Contribuinte</div>
            </div>
            <span className="br-divider"></span>
            <div className="br-item" role="listitem">Início da Contribuição: {contribuinte.inicioContribuicao}</div>
            <div className="br-item" role="listitem">Salário: {contribuinte.salario}</div>
            <div className="br-item" role="listitem">Categoria: {contribuinte.categoria}</div>
            <div className="br-item" role="listitem">CPF: {contribuinte.cpf}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoPrev;
