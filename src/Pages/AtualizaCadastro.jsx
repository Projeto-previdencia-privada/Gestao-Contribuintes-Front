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
  const [inicioContribuicaoAtualizado, setInicioContribuicaoAtualizado] = useState("");
  const [cpfConjugeAtualizado, setCpfConjugeAtualizado] = useState("");
  const [cpfPaiAtualizado, setCpfPaiAtualizado] = useState("");
  const [cpfMaeAtualizado, setCpfMaeAtualizado] = useState("");
  const [cpfPai2Atualizado, setCpfPai2Atualizado] = useState("");
  const [cpfMae2Atualizado, setCpfMae2Atualizado] = useState("");
  const [cpfPai3Atualizado, setCpfPai3Atualizado] = useState("");
  const [cpfMae3Atualizado, setCpfMae3Atualizado] = useState("");

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
      if (!response.ok) {
        throw new Error("Erro ao atualizar dados: " + response.statusText);
      }
      console.log("Dados atualizados com sucesso");
      handleSearch(cpf);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1 className={styles.h1}>Atualizar Dados</h1>

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
              onClick={() => handleSearch(cpf)}
            >
              <i className="fas fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {contribuinte ? (
          <>
            <div className="br-divider"></div>

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
                  placeholder="Digite seu nome completo"
                  onChange={(e) => setNomeCivilAtualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Nome Social (opcional):
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="nomeSocial"
                  value={nomeSocialAtualizado}
                  placeholder="Digite o nome que se identifica"
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
                  placeholder="Digite seu endereço completo"
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
                  type="email"
                  id="email"
                  value={emailAtualizado}
                  placeholder="Digite seu endereço de email"
                  onChange={(e) => setEmailAtualizado(e.target.value)}
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
                  type="number"
                  id="salario"
                  value={salarioAtualizado}
                  placeholder="Digite o valor do salário"
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
                  placeholder="Digite a categoria"
                  onChange={(e) => setCategoriaAtualizado(e.target.value)}
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
                  Início da Contribuição:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="inicioContribuicao"
                  value={inicioContribuicaoAtualizado}
                  placeholder="dd/mm/aaaa"
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
                  placeholder="Digite o CPF do pai"
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
                  placeholder="Digite o CPF da mãe"
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
                  placeholder="Digite o CPF do pai"
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
                  placeholder="Digite o CPF da mãe"
                  onChange={(e) => setCpfMae3Atualizado(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="col-sm-12 col-lg-3 mt-2 mb-2">
              <button
                className="br-button primary"
                type="button"
                onClick={handleUpdate}
              >
                Atualizar Dados
              </button>
            </div>
          </>
        ) : (
          <p>Nenhum contribuinte encontrado com o CPF fornecido.</p>
        )}
      </div>
    </div>
  );
}

export default AtualizaCadastro;
