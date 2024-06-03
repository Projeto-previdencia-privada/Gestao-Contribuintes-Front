import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../Form/Form.module.css";

function AtualizaCadastro() {
  const [contribuinte, setContribuinte] = useState(null);
  const [cpf, setCpf] = useState("");
  const [nomeCivilAtualizado, setNomeCivilAtualizado] = useState("");
  const [enderecoAtualizado, setEnderecoAtualizado] = useState("");
  const [nomeSocialAtualizado, setNomeSocialAtualizado] = useState("");
  const [emailAtualizado, setEmailAtualizado] = useState("");
  const [salarioAtualizado, setSalarioAtualizado] = useState("");
  const [categoriaAtualizado, setCategoriaAtualizado] = useState("");
  const [telefoneAtualizado, setTelefoneAtualizado] = useState("");
  const [inicioContribuicaoAtualizado, setInicioContribuicaoAtualizado] =
    useState("");
  const [cpfConjugeAtualizado, setCpfConjugeAtualizado] = useState("");
  const [cpfPaiAtualizado, setCpfPaiAtualizado] = useState("");
  const [cpfMaeAtualizado, setCpfMaeAtualizado] = useState("");
  const [cpfPai2Atualizado, setCpfPai2Atualizado] = useState("");
  const [cpfMae2Atualizado, setCpfMae2Atualizado] = useState("");
  const [cpfPai3Atualizado, setCpfPai3Atualizado] = useState("");
  const [cpfMae3Atualizado, setCpfMae3Atualizado] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notFoundMessage, setNotFoundMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cpfParam = params.get("cpf");
    if (cpfParam) {
      setCpf(cpfParam);
      handleSearch(cpfParam);
    }
  }, [location]);

  const handleSearch = async (cpf) => {
    try {
      const response = await fetch(
        `http://localhost:8080/contribuintes/cadastroAtualizacao/${cpf}`
      );
      if (response.status === 404) {
        setNotFoundMessage("O contribuinte não está cadastrado.");
        return;
      }
      if (response.status === 400) {
        setErrorMessage("O cpf não é válido.");
        return;
      }
      if (!response.ok) {
        throw new Error("Erro ao buscar dados da API: " + response.statusText);
      }
      const data = await response.json();
      setContribuinte(data.info);
      setNomeCivilAtualizado(data.info.nomeCivil || "");
      setNomeSocialAtualizado(data.info.nomeSocial || "");
      setEnderecoAtualizado(data.info.endereco || "");
      setEmailAtualizado(data.info.email || "");
      setSalarioAtualizado(data.info.salario || "");
      setCategoriaAtualizado(data.info.categoria || "");
      setTelefoneAtualizado(data.info.telefone || "");
      setInicioContribuicaoAtualizado(
        data.info.inicioContribuicao
          ? format(new Date(data.info.inicioContribuicao), "dd/MM/yyyy")
          : ""
      );
      setCpfConjugeAtualizado(data.info.cpfConjuge || "");
      setCpfPaiAtualizado(data.info.cpfPai || "");
      setCpfMaeAtualizado(data.info.cpfMae || "");
      setCpfPai2Atualizado(data.info.cpfPai2 || "");
      setCpfMae2Atualizado(data.info.cpfMae2 || "");
      setCpfPai3Atualizado(data.info.cpfPai3 || "");
      setCpfMae3Atualizado(data.info.cpfMae3 || "");
    } catch (error) {
      console.error("Erro ao buscar dados da API", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {};

      if (nomeCivilAtualizado !== "")
        updatedData.nomeCivil = nomeCivilAtualizado;
      if (nomeSocialAtualizado !== "")
        updatedData.nomeSocial = nomeSocialAtualizado;
      if (enderecoAtualizado !== "") updatedData.endereco = enderecoAtualizado;
      if (emailAtualizado !== "") updatedData.email = emailAtualizado;
      if (salarioAtualizado !== "") updatedData.salario = salarioAtualizado;
      if (categoriaAtualizado !== "")
        updatedData.categoria = categoriaAtualizado;
      if (telefoneAtualizado !== "") updatedData.telefone = telefoneAtualizado;
      if (inicioContribuicaoAtualizado !== "")
        updatedData.inicioContribuicao = inicioContribuicaoAtualizado;

      if (cpfConjugeAtualizado !== "")
        updatedData.cpfConjuge = cpfConjugeAtualizado;
      if (cpfPaiAtualizado !== "") updatedData.cpfPai = cpfPaiAtualizado;
      if (cpfMaeAtualizado !== "") updatedData.cpfMae = cpfMaeAtualizado;
      if (cpfPai2Atualizado !== "") updatedData.cpfPai2 = cpfPai2Atualizado;
      if (cpfMae2Atualizado !== "") updatedData.cpfMae2 = cpfMae2Atualizado;
      if (cpfPai3Atualizado !== "") updatedData.cpfPai3 = cpfPai3Atualizado;
      if (cpfMae3Atualizado !== "") updatedData.cpfMae3 = cpfMae3Atualizado;

      if (cpfConjugeAtualizado !== "") {
        if (!/^\d{11}$/.test(cpfConjugeAtualizado)) {
            setErrorMessage("Campo CPF do cônjuge está inválido! Deve conter apenas números e 11 dígitos.");
            return;
        }
        updatedData.cpfConjuge = cpfConjugeAtualizado;
    }

    if (cpfPaiAtualizado !== "") {
      if (!/^\d{11}$/.test(cpfPaiAtualizado)) {
          setErrorMessage("Campo CPF do pai está inválido! Deve conter apenas números e 11 dígitos.");
          return;
      }
      updatedData.cpfPai = cpfPaiAtualizado;
  }
    if (cpfPai2Atualizado !== "") {
      if (!/^\d{11}$/.test(cpfPai2Atualizado)) {
          setErrorMessage("Campo CPF do pai está inválido! Deve conter apenas números e 11 dígitos.");
          return;
      }
      updatedData.cpfPai2 = cpfPai2Atualizado;
  }
    if (cpfPai3Atualizado !== "") {
      if (!/^\d{11}$/.test(cpfPai3Atualizado)) {
          setErrorMessage("Campo CPF do pai está inválido! Deve conter apenas números e 11 dígitos.");
          return;
      }
      updatedData.cpfPai3 = cpfPai3Atualizado;
  }

  if (cpfMaeAtualizado !== "") {
    if (!/^\d{11}$/.test(cpfMaeAtualizado)) {
        setErrorMessage("Campo CPF da mãe está inválido! Deve conter apenas números e 11 dígitos.");
        return;
    }
    updatedData.cpfMae = cpfMaeAtualizado;
}
  if (cpfMae2Atualizado !== "") {
    if (!/^\d{11}$/.test(cpfMae2Atualizado)) {
        setErrorMessage("Campo CPF da mãe está inválido! Deve conter apenas números e 11 dígitos.");
        return;
    }
    updatedData.cpfMae2 = cpfMae2Atualizado;
}
  if (cpfMae3Atualizado !== "") {
    if (!/^\d{11}$/.test(cpfMae3Atualizado)) {
        setErrorMessage("Campo CPF da mãe está inválido! Deve conter apenas números e 11 dígitos.");
        return;
    }
    updatedData.cpfMae3 = cpfMae3Atualizado;
}

      const response = await fetch(
        `http://localhost:8080/contribuintes/${cpf}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.status === 400) {
        setErrorMessage(
          "O campo está com o formato inválido! Por favor, revise a informação."
        );
        return;
      }
      if (!response.ok) {
        throw new Error("Erro ao atualizar dados: " + response.statusText);
      }
      setSuccessMessage("Os dados foram alterados com sucesso.");
      handleSearch(cpf);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  };

  const handleCloseMessage = () => {
    setSuccessMessage("");
    setErrorMessage("");
    setNotFoundMessage("");
  };

  return (
    <div className={styles.container}>
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
              onClick={handleCloseMessage}
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
              onClick={handleCloseMessage}
            >
              <i className="fas fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      )}

      <div className={styles.form}>
        <h1 className={styles.h1}>Atualizar Dados</h1>

        <div className="col-sm-5 col-lg-5 mb-3">
          <div className="br-input large input-button">
            <label htmlFor="input-search-large">CPF:</label>
            <input
              type="text"
              id="cpf"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <button
              className="br-button"
              onClick={() => handleSearch(cpf)}
              aria-label="Buscar"
            >
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {contribuinte ? (
          <>
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
                  value={nomeCivilAtualizado}
                  placeholder="Digite seu nome civil"
                  onChange={(e) => setNomeCivilAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Nome Social:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="nomeSocial"
                  value={nomeSocialAtualizado}
                  placeholder="Digite seu nome social"
                  onChange={(e) => setNomeSocialAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Endereço:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="endereco"
                  value={enderecoAtualizado}
                  placeholder="Digite seu endereço"
                  onChange={(e) => setEnderecoAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Email:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="email"
                  value={emailAtualizado}
                  placeholder="Digite seu email"
                  onChange={(e) => setEmailAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Telefone:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="telefone"
                  value={telefoneAtualizado}
                  placeholder="Digite seu telefone"
                  onChange={(e) => setTelefoneAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Salário:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="salario"
                  value={salarioAtualizado}
                  placeholder="Digite seu salário"
                  onChange={(e) => setSalarioAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Categoria:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="categoria"
                  value={categoriaAtualizado}
                  placeholder="Digite sua categoria"
                  onChange={(e) => setCategoriaAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Início de Contribuição:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="inicioContribuicao"
                  value={inicioContribuicaoAtualizado}
                  placeholder="Digite sua data de início de contribuição"
                  onChange={(e) =>
                    setInicioContribuicaoAtualizado(e.target.value)
                  }
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  CPF do Cônjuge:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfConjuge"
                  value={cpfConjugeAtualizado}
                  placeholder="Digite o CPF do cônjuge"
                  onChange={(e) => setCpfConjugeAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  CPF do Pai:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfPai"
                  value={cpfPaiAtualizado}
                  placeholder="Digite o CPF do pai"
                  onChange={(e) => setCpfPaiAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  CPF da Mãe:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfMae"
                  value={cpfMaeAtualizado}
                  placeholder="Digite o CPF da mãe"
                  onChange={(e) => setCpfMaeAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  CPF do Pai 2:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfPai2"
                  value={cpfPai2Atualizado}
                  placeholder="Digite o CPF do pai 2"
                  onChange={(e) => setCpfPai2Atualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  CPF da Mãe 2:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfMae2"
                  value={cpfMae2Atualizado}
                  placeholder="Digite o CPF da mãe 2"
                  onChange={(e) => setCpfMae2Atualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  CPF do Pai 3:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfPai3"
                  value={cpfPai3Atualizado}
                  placeholder="Digite o CPF do pai 3"
                  onChange={(e) => setCpfPai3Atualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  CPF da Mãe 3:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfMae3"
                  value={cpfMae3Atualizado}
                  placeholder="Digite o CPF da mãe 3"
                  onChange={(e) => setCpfMae3Atualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <button className="br-button primary" onClick={handleUpdate}>
              Atualizar
            </button>
          </>
        ) : (
          <p>Nenhum contribuinte encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default AtualizaCadastro;
