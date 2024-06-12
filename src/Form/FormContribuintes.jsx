import React, { useState } from "react";
import { format } from "date-fns";
import styles from "../Form/Form.module.css";

function Form() {
  const [cpf, setCpf] = useState("");
  const [nomeCivil, setNomeCivil] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [endereco, setEndereco] = useState("");
  const [email, setEmail] = useState("");
  const [salario, setSalario] = useState("");
  const [categoria, setCategoria] = useState("");
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

  const backendUrl = import.meta.env.VITE_API_BASE_URL;

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

    const formattedInicioContribuicao = format(
      new Date(inicioContribuicao),
      "dd/MM/yyyy"
    );

    const data = {
      cpf,
      nomeCivil,
      nomeSocial,
      endereco,
      email,
      salario: parseFloat(salario).toFixed(2),
      categoria,
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

      if (!response.ok) {
        throw new Error("Erro na requisição: " + response.statusText);
      }

      const result = await response.json();
      console.log("Sucesso:", result);

      setCpf("");
      setNomeCivil("");
      setNomeSocial("");
      setEndereco("");
      setEmail("");
      setSalario("");
      setCategoria("");
      setTelefone("");
      setInicioContribuicao("");
      setCpfConjuge("");
      setCpfPai("");
      setCpfMae("");
      setCpfPai2("");
      setCpfMae2("");
      setCpfPai3("");
      setCpfMae3("");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.h1}>Cadastro de Contribuinte</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-sm-20 col-lg-30 mb-2">
          <div className="input-label">
            <label className="text-nowrap" htmlFor="lateral">
              CPF:
            </label>
          </div>
          <div className="br-input input-inline">
            <input
              type="text"
              id="cpf"
              value={cpf}
              placeholder="Digite o cpf"
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
              placeholder="Digite o nome completo"
              onChange={(e) => setNomeCivil(e.target.value)}
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
              value={nomeSocial}
              placeholder="Digite o nome que se identifica"
              onChange={(e) => setNomeSocial(e.target.value)}
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
              value={endereco}
              placeholder="Digite o endereço completo"
              onChange={(e) => setEndereco(e.target.value)}
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
              value={email}
              placeholder="Digite o email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="col-sm-20 col-lg-30 mb-2">
          <div className="input-label">
            <label className="text-nowrap" htmlFor="lateral">
              Salario:
            </label>
          </div>
          <div className="br-input input-inline">
            <input
              type="number"
              id="salario"
              value={salario}
              placeholder="Digite o valor do salário atual"
              onChange={(e) => setSalario(e.target.value)}
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
              value={categoria}
              placeholder="Digite a categoria"
              onChange={(e) => setCategoria(e.target.value)}
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
              placeholder="Digite o número de telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="col-sm-20 col-lg-30 mb-2">
          <div className="input-label">
            <label className="text-nowrap" htmlFor="lateral">
              Inicio da Contribuição:
            </label>
          </div>
          <div className="br-input input-inline">
            <input
              type="date"
              id="inicioContribuicao"
              value={inicioContribuicao}
              onChange={(e) => setInicioContribuicao(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="col-sm-20 col-lg-30 mb-2">
          <div className="input-label">
            <label className="text-nowrap" htmlFor="lateral">
              Cpf Conjuge:
            </label>
          </div>
          <div className="br-input input-inline">
            <input
              type="text"
              id="cpfConjuge"
              value={cpfConjuge}
              placeholder="Digite o cpf do conjuge"
              onChange={(e) => {
                const value = e.target.value;
                setCpfConjuge(value);
                if (value.trim() !== "" && !/^\d{11}$/.test(value)) {
                  setCpfConjugeError(
                    "CPF inválido. Deve conter apenas números e 11 dígitos."
                  );
                } else {
                  setCpfConjugeError("");
                }
              }}
            />
            {cpfConjugeError && (
              <div className="mb-3">
                <span className="feedback danger" role="alert">
                  <i className="fas fa-times-circle" aria-hidden="true"></i>
                  {cpfConjugeError}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="col-sm-20 col-lg-30 mb-2">
          <div className="input-label">
            <label className="text-nowrap" htmlFor="cpfPai">
              Cpf Pai:
            </label>
          </div>
          <div className="br-input input-inline">
            <input
              type="text"
              id="cpfPai"
              value={cpfPai}
              placeholder="Digite o cpf do pai"
              onChange={(e) => {
                const value = e.target.value;
                setCpfPai(value);
                if (value.trim() !== "" && !/^\d{11}$/.test(value)) {
                  setCpfPaiError(
                    "CPF inválido. Deve conter apenas números e 11 dígitos."
                  );
                } else {
                  setCpfPaiError("");
                }
              }}
            />
            {cpfPaiError && (
              <div className="mb-3">
                <span className="feedback danger" role="alert">
                  <i className="fas fa-times-circle" aria-hidden="true"></i>
                  {cpfPaiError}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="col-sm-20 col-lg-30 mb-2">
          <div className="input-label">
            <label className="text-nowrap" htmlFor="lateral">
              Cpf Mae:
            </label>
          </div>
          <div className="br-input input-inline">
            <input
              type="text"
              id="cpfMae"
              value={cpfMae}
              placeholder="Digite o cpf da mae"
              onChange={(e) => {
                const value = e.target.value;
                setCpfMae(value);
                if (value.trim() !== "" && !/^\d{11}$/.test(value)) {
                  setCpfMaeError(
                    "CPF inválido. Deve conter apenas números e 11 dígitos."
                  );
                } else {
                  setCpfMaeError("");
                }
              }}
            />
            {cpfMaeError && (
              <div className="mb-3">
                <span className="feedback danger" role="alert">
                  <i className="fas fa-times-circle" aria-hidden="true"></i>
                  {cpfMaeError}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="d-inline-block mr-5">
          <div className="br-checkbox">
            <input
              id="h-checkbox-1"
              name="h-checkbox-1"
              type="checkbox"
              checked={multiParentalidade}
              onChange={(e) => setMultiparentalidade(e.target.checked)}
            />
            <label htmlFor="h-checkbox-1">Multiparentalidade</label>
          </div>
        </div>
        {multiParentalidade && (
          <div>
            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Cpf Pai 2:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfPai2"
                  value={cpfPai2}
                  placeholder="Digite o cpf do pai"
                  onChange={(e) => {
                    const value = e.target.value;
                    setCpfPai2(value);
                    if (value.trim() !== "" && !/^\d{11}$/.test(value)) {
                      setCpfPai2Error(
                        "CPF inválido. Deve conter apenas números e 11 dígitos."
                      );
                    } else {
                      setCpfPai2Error("");
                    }
                  }}
                />
                {cpfPai2Error && (
                  <div className="mb-3">
                    <span className="feedback danger" role="alert">
                      <i className="fas fa-times-circle" aria-hidden="true"></i>
                      {cpfPai2Error}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Cpf Mae2:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfMae2"
                  value={cpfMae2}
                  placeholder="Digite o cpf da mae2"
                  onChange={(e) => {
                    const value = e.target.value;
                    setCpfMae2(value);
                    if (value.trim() !== "" && !/^\d{11}$/.test(value)) {
                      setCpfMae2Error(
                        "CPF inválido. Deve conter apenas números e 11 dígitos."
                      );
                    } else {
                      setCpfMae2Error("");
                    }
                  }}
                />
                {cpfMae2Error && (
                  <div className="mb-3">
                    <span className="feedback danger" role="alert">
                      <i className="fas fa-times-circle" aria-hidden="true"></i>
                      {cpfMae2Error}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Cpf Pai3:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfPai3"
                  value={cpfPai3}
                  placeholder="Digite o cpf do pai3"
                  onChange={(e) => {
                    const value = e.target.value;
                    setCpfPai3(value);
                    if (value.trim() !== "" && !/^\d{11}$/.test(value)) {
                      setCpfPai3Error(
                        "CPF inválido. Deve conter apenas números e 11 dígitos."
                      );
                    } else {
                      setCpfPai3Error("");
                    }
                  }}
                />
                {cpfPai3Error && (
                  <div className="mb-3">
                    <span className="feedback danger" role="alert">
                      <i className="fas fa-times-circle" aria-hidden="true"></i>
                      {cpfPai3Error}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="col-sm-20 col-lg-30 mb-2">
              <div className="input-label">
                <label className="text-nowrap" htmlFor="lateral">
                  Cpf Mae3:
                </label>
              </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfMae3"
                  value={cpfMae3}
                  placeholder="Digite o cpf da mae3"
                  onChange={(e) => {
                    const value = e.target.value;
                    setCpfMae3(value);
                    if (value.trim() !== "" && !/^\d{11}$/.test(value)) {
                      setCpfMae3Error(
                        "CPF inválido. Deve conter apenas números e 11 dígitos."
                      );
                    } else {
                      setCpfMae3Error("");
                    }
                  }}
                />
                {cpfMae3Error && (
                  <div className="mb-3">
                    <span className="feedback danger" role="alert">
                      <i className="fas fa-times-circle" aria-hidden="true"></i>
                      {cpfMae3Error}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Form;
