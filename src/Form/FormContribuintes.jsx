import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import styles from "../Form/Form.module.css";

function Form() {
  const [cpf, setCpf] = useState("");
  const [nomeCivil, setNomeCivil] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [salario, setSalario] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [inicioContribuicao, setInicioContribuicao] = useState("");
  const [cpfConjuge, setCpfConjuge] = useState("");
  const [cpfPai, setCpfPai] = useState("");
  const [cpfMae, setCpfMae] = useState("");
  const [multiParentalidade, setMultiparentalidade] = useState(false);
  const [cpfPai2, setCpfPai2] = useState("");
  const [cpfMae2, setCpfMae2] = useState("");
  const [cpfPai3, setCpfPai3] = useState("");
  const [cpfMae3, setCpfMae3] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [cpfPaiError, setCpfPaiError] = useState("");
  const [cpfPai2Error, setCpfPai2Error] = useState("");
  const [cpfPai3Error, setCpfPai3Error] = useState("");
  const [cpfMaeError, setCpfMaeError] = useState("");
  const [cpfMae2Error, setCpfMae2Error] = useState("");
  const [cpfMae3Error, setCpfMae3Error] = useState("");
  const [cpfConjugeError, setCpfConjugeError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const backendUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('http://192.168.37.8:3000/aliquotas');
        const data = await response.json();
        const categoriasUnicas = [...new Set(data.map(aliquota => aliquota.categoria))];
        setCategorias(categoriasUnicas);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
  
    fetchCategorias();
  }, []);
  

  const handleCloseMessage = () => {
    setSuccessMessage("");
  };

  const toggleListVisibility = () => {
    setIsListVisible(!isListVisible);
  };

  const handleCategorySelect = (categoria) => {
    setCategorias([categoria]);
    setIsListVisible(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (cpf.trim() === "" || !/^\d{11}$/.test(cpf)) {
      setCpfError("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfError("");
    }

    if (cpfPai.trim() !== "" && !/^\d{11}$/.test(cpfPai)) {
      setCpfPaiError("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfPaiError("");
    }

    if (cpfPai2.trim() !== "" && !/^\d{11}$/.test(cpfPai2)) {
      setCpfPai2Error("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfPai2Error("");
    }

    if (cpfPai3.trim() !== "" && !/^\d{11}$/.test(cpfPai3)) {
      setCpfPai3Error("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfPai3Error("");
    }

    if (cpfMae.trim() !== "" && !/^\d{11}$/.test(cpfMae)) {
      setCpfMaeError("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfMaeError("");
    }

    if (cpfMae2.trim() !== "" && !/^\d{11}$/.test(cpfMae2)) {
      setCpfMae2Error("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfMae2Error("");
    }

    if (cpfMae3.trim() !== "" && !/^\d{11}$/.test(cpfMae3)) {
      setCpfMae3Error("CPF inválido. Deve conter apenas números e 11 dígitos.");
      return;
    } else {
      setCpfMae3Error("");
    }

    if (cpfConjuge.trim() !== "" && !/^\d{11}$/.test(cpfConjuge)) {
      setCpfConjugeError(
        "CPF inválido. Deve conter apenas números e 11 dígitos."
      );
      return;
    } else {
      setCpfConjugeError("");
    }

    let formattedInicioContribuicao = "";
    if (inicioContribuicao) {
      try {
        formattedInicioContribuicao = format(
          new Date(inicioContribuicao),
          "dd/MM/yyyy"
        );
      } catch (error) {
        console.error("Erro na formatação da data:", error);
        return;
      }
    }

    const data = {
      cpf,
      nomeCivil,
      nomeSocial,
      endereco,
      email,
      salario: parseFloat(salario).toFixed(2),
      categorias,
      telefone,
      inicioContribuicao: formattedInicioContribuicao,
      cpfConjuge,
      cpfPai,
      cpfMae,
      multiParentalidade,
      cpfPai2,
      cpfMae2,
      cpfPai3,
      cpfMae3,
    };

    try {
      const response = await fetch(`${backendUrl}/contribuintes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          setErrorMessage(result.error);
        } else {
          throw new Error("Erro na requisição: " + response.statusText);
        }
        return;
      }

      console.log("Sucesso:", result);

      setCpf("");
      setNomeCivil("");
      setNomeSocial("");
      setEndereco("");
      setEmail("");
      setSalario("");
      setCategorias([]);
      setTelefone("");
      setInicioContribuicao("");
      setCpfConjuge("");
      setCpfPai("");
      setCpfMae("");
      setCpfPai2("");
      setCpfMae2("");
      setCpfPai3("");
      setCpfMae3("");

      setSuccessMessage("Cadastro do contribuinte realizado com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      setErrorMessage("Ocorreu um erro ao tentar realizar o cadastro.");
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.h1}>Cadastro de Contribuinte</h1>

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
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="col-sm-20 col-lg-30 mb-2">
          <label htmlFor="cpf">CPF</label>
          <input
            type="text"
            className={`br-input ${cpfError ? "danger" : ""}`}
            id="cpf"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          {cpfError && <p className="text-danger">{cpfError}</p>}
        </div>
        <div className="row">
          <div className="col-sm-10 col-lg-15 mb-2">
            <label htmlFor="nomeCivil">Nome Civil</label>
            <input
              type="text"
              className="br-input"
              id="nomeCivil"
              value={nomeCivil}
              onChange={(e) => setNomeCivil(e.target.value)}
            />
          </div>
          <div className="col-sm-10 col-lg-15 mb-2">
            <label htmlFor="nomeSocial">Nome Social</label>
            <input
              type="text"
              className="br-input"
              id="nomeSocial"
              value={nomeSocial}
              onChange={(e) => setNomeSocial(e.target.value)}
            />
          </div>
        </div>
        <div className="col-sm-20 col-lg-30 mb-2">
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            className="br-input"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
        <div className="col-sm-20 col-lg-30 mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="br-input"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="row">
          <div className="col-sm-10 col-lg-15 mb-2">
            <label htmlFor="salario">Salário</label>
            <input
              type="number"
              step="0.01"
              className="br-input"
              id="salario"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
            />
          </div>
          <div className="col-sm-10 col-lg-15 mb-2">
            <label htmlFor="categoria">Categoria</label>
            <div className="br-input">
              <button
                className="br-button"
                type="button"
                onClick={toggleListVisibility}
              >
                {categorias || "Selecione uma categoria"}
              </button>
              {isListVisible && (
                <ul className="br-list">
                  {categorias.map((aliquota) => (
                    <li key={aliquota.id} onClick={() => handleCategorySelect(aliquota.id, aliquota.categoria)}>
                      {aliquota.categoria}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-10 col-lg-15 mb-2">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              className="br-input"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </div>
          <div className="col-sm-10 col-lg-15 mb-2">
            <label htmlFor="inicioContribuicao">Início da Contribuição</label>
            <input
              type="date"
              className="br-input"
              id="inicioContribuicao"
              value={inicioContribuicao}
              onChange={(e) => setInicioContribuicao(e.target.value)}
            />
          </div>
        </div>
        <div className="col-sm-20 col-lg-30 mb-2">
          <label htmlFor="cpfConjuge">CPF do Cônjuge</label>
          <input
            type="text"
            className={`br-input ${cpfConjugeError ? "danger" : ""}`}
            id="cpfConjuge"
            value={cpfConjuge}
            onChange={(e) => setCpfConjuge(e.target.value)}
          />
          {cpfConjugeError && <p className="text-danger">{cpfConjugeError}</p>}
        </div>
        <div className="row">
          <div className="col-sm-10 col-lg-15 mb-2">
            <label htmlFor="cpfPai">CPF do Pai</label>
            <input
              type="text"
              className={`br-input ${cpfPaiError ? "danger" : ""}`}
              id="cpfPai"
              value={cpfPai}
              onChange={(e) => setCpfPai(e.target.value)}
            />
            {cpfPaiError && <p className="text-danger">{cpfPaiError}</p>}
          </div>
          <div className="col-sm-10 col-lg-15 mb-2">
            <label htmlFor="cpfMae">CPF da Mãe</label>
            <input
              type="text"
              className={`br-input ${cpfMaeError ? "danger" : ""}`}
              id="cpfMae"
              value={cpfMae}
              onChange={(e) => setCpfMae(e.target.value)}
            />
            {cpfMaeError && <p className="text-danger">{cpfMaeError}</p>}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-10 col-lg-15 mb-2">
            <label htmlFor="multiParentalidade">Multiparentalidade</label>
            <div className="br-switch">
              <input
                type="checkbox"
                id="multiParentalidade"
                className="br-switch-input"
                checked={multiParentalidade}
                onChange={(e) => setMultiparentalidade(e.target.checked)}
              />
              <label
                htmlFor="multiParentalidade"
                className="br-switch-label"
              ></label>
            </div>
          </div>
        </div>
        {multiParentalidade && (
          <>
            <div className="row">
              <div className="col-sm-10 col-lg-15 mb-2">
                <label htmlFor="cpfPai2">CPF do Segundo Pai</label>
                <input
                  type="text"
                  className={`br-input ${cpfPai2Error ? "danger" : ""}`}
                  id="cpfPai2"
                  value={cpfPai2}
                  onChange={(e) => setCpfPai2(e.target.value)}
                />
                {cpfPai2Error && <p className="text-danger">{cpfPai2Error}</p>}
              </div>
              <div className="col-sm-10 col-lg-15 mb-2">
                <label htmlFor="cpfMae2">CPF da Segunda Mãe</label>
                <input
                  type="text"
                  className={`br-input ${cpfMae2Error ? "danger" : ""}`}
                  id="cpfMae2"
                  value={cpfMae2}
                  onChange={(e) => setCpfMae2(e.target.value)}
                />
                {cpfMae2Error && <p className="text-danger">{cpfMae2Error}</p>}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-10 col-lg-15 mb-2">
                <label htmlFor="cpfPai3">CPF do Terceiro Pai</label>
                <input
                  type="text"
                  className={`br-input ${cpfPai3Error ? "danger" : ""}`}
                  id="cpfPai3"
                  value={cpfPai3}
                  onChange={(e) => setCpfPai3(e.target.value)}
                />
                {cpfPai3Error && <p className="text-danger">{cpfPai3Error}</p>}
              </div>
              <div className="col-sm-10 col-lg-15 mb-2">
                <label htmlFor="cpfMae3">CPF da Terceira Mãe</label>
                <input
                  type="text"
                  className={`br-input ${cpfMae3Error ? "danger" : ""}`}
                  id="cpfMae3"
                  value={cpfMae3}
                  onChange={(e) => setCpfMae3(e.target.value)}
                />
                {cpfMae3Error && <p className="text-danger">{cpfMae3Error}</p>}
              </div>
            </div>
          </>
        )}
        <button className="br-button primary" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Form;
