import React, { useState } from "react";
import styles from "../Form/Form.module.css";
import { useLocation } from "react-router-dom";

function FormDependente() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const cpfContribuinte = queryParams.get("cpfContribuinte");

  const [cpf, setCpf] = useState("");
  const [nomeCivil, setNomeCivil] = useState("");
  const [mensagem, setMensagem] = useState(null);
  const [cpfError, setCpfError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cpf.trim() === "" || !/^\d{11}$/.test(cpf)) {
      setCpfError("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfError("");
    }

    try {
      const response = await fetch(
        `http://localhost:8080/contribuintes/${cpfContribuinte}/dependentes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cpf: cpf,
            nomeCivil: nomeCivil,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMensagem(
          "Dependente cadastrado com sucesso e vinculado ao contribuinte."
        );
      } else {
        setMensagem(data.error || "Erro ao cadastrar dependente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar dependente:", error);
      setMensagem("Erro ao cadastrar dependente.");
    }

    setCpf("");
    setNomeCivil("");
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.h1}>Cadastro de Dependentes</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className="br-input input-inline">
          <input
            type="text"
            id="cpf"
            value={cpf}
            placeholder="Digite o cpf"
            className={cpfError ? "error" : ""}
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
        </div>
        {cpfError && (
          <div className="mb-3">
            <span className="feedback danger" role="alert">
              <i className="fas fa-times-circle" aria-hidden="true"></i>
              {cpfError}
            </span>
          </div>
        )}

        <div className="col-sm-20 col-lg-30 mb-2">
          <div className="input-label">
            <label className="text-nowrap" htmlFor="lateral">
              Nome Civil:
            </label>
          </div>
          <div className="br-input input-inline">
            <input
              type="text"
              id="nomeCivil"
              value={nomeCivil}
              placeholder="Nome do dependente"
              onChange={(e) => setNomeCivil(e.target.value)}
            ></input>
          </div>
        </div>
        <button className={styles.button_dep} type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormDependente;
