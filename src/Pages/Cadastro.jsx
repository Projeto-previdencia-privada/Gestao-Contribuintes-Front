import React, { useState } from "react";
import styles from "../Form/Form.module.css";
import { Link } from "react-router-dom";

function Cadastro() {
  const [cpf, setCpf] = useState("");
  const [contribuinte, setContribuinte] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/contribuintes/cadastroAtualizacao/${cpf}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API: " + response.statusText);
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
        <h1 className={styles.h1}>Dados do Contribuinte</h1>
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
        {contribuinte && (
          <>
            <div className="br-list" role="list">
              <div className="header">
                <div className="title">Dados do Contribuinte</div>
              </div>
              <span className="br-divider"></span>
              <div className="br-item" role="listitem">
                CPF: {contribuinte.cpf}
              </div>
              <div className="br-item" role="listitem">
                Nome Civil: {contribuinte.nomeCivil}
              </div>
              {contribuinte.nomeSocial && contribuinte.nomeSocial !== "" && (
                <div className="br-item" role="listitem">
                  Nome Social: {contribuinte.nomeSocial}
                </div>
              )}
              <div className="br-item" role="listitem">
                Endereço: {contribuinte.endereco}
              </div>
              <div className="br-item" role="listitem">
                Email: {contribuinte.email}
              </div>
              <div className="br-item" role="listitem">
                Salário: {contribuinte.salario}
              </div>
              <div className="br-item" role="listitem">
                Categoria: {contribuinte.categoria}
              </div>
              <div className="br-item" role="listitem">
                Telefone: {contribuinte.telefone}
              </div>
              <div className="br-item" role="listitem">
                Início da Contribuição: {contribuinte.inicioContribuicao}
              </div>
              <div className="br-item" role="listitem">
                CPF Conjuge: {contribuinte.cpfConjuge}
              </div>
              <div className="br-item" role="listitem">
                CPF Pai: {contribuinte.cpfPai}
              </div>
              <div className="br-item" role="listitem">
                CPF Mãe: {contribuinte.cpfMae}
              </div>
              {contribuinte.cpfPai2 && contribuinte.cpfPai2 !== "" && (
                <div className="br-item" role="listitem">
                  CPF Pai 2: {contribuinte.cpfPai2}
                </div>
              )}
              {contribuinte.cpfMae2 && contribuinte.cpfMae2 !== "" && (
                <div className="br-item" role="listitem">
                  CPF Mãe 2: {contribuinte.cpfMae2}
                </div>
              )}
              {contribuinte.cpfPai3 && contribuinte.cpfPai3 !== "" && (
                <div className="br-item" role="listitem">
                  CPF Pai 3: {contribuinte.cpfPai3}
                </div>
              )}
              {contribuinte.cpfMae3 && contribuinte.cpfMae3 !== "" && (
                <div className="br-item" role="listitem">
                  CPF Mãe 3: {contribuinte.cpfMae3}
                </div>
              )}

              <div className="p-3">
                <Link to={`/atualizaCadastro?cpf=${contribuinte.cpf}`}>
                  <button className="br-button primary mr-3" type="button">
                    Atualizar dados
                  </button>
                </Link>

                <Link
                  to={`/cadastroDependentes?cpfContribuinte=${contribuinte.cpf}`}
                >
                  <button className="br-button primary mr-3" type="button">
                    Adicionar Dependente
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cadastro;
