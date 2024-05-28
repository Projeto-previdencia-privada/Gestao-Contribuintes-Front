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

  const handleSubmit = async (event) => {
    event.preventDefault();

    
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
      const response = await fetch("http://localhost:8080/contribuintes", {
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
                Cpf:
              </label>
            </div>
          <div className="br-input input-inline">

            <input
              type="text"
              id="cpf"
              value={cpf}
              placeholder="Digite seu cpf"
              onChange={(e) => setCpf(e.target.value)}
            ></input>
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
              placeholder="Digite seu nome completo"
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
              placeholder="Digite seu endereço completo"
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
              placeholder="Digite seu endereço de email"
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
              placeholder="Digite a sua categoria"
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
              onChange={(e) => setCpfConjuge(e.target.value)}
            ></input>
          </div>
        </div>

        <div className="col-sm-20 col-lg-30 mb-2">
            <div className="input-label">
              <label className="text-nowrap" htmlFor="lateral">
                Cpf Pai:
              </label>
            </div>
          <div className="br-input input-inline">
            <input
              type="text"
              id="cpfPai"
              value={cpfPai}
              placeholder="Digite o cpf do pai"
              onChange={(e) => setCpfPai(e.target.value)}
            ></input>
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
              onChange={(e) => setCpfMae(e.target.value)}
            ></input>
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
                    Cpf Pai2:
                  </label>
                </div>
              <div className="br-input input-inline">
                <input
                  type="text"
                  id="cpfPai2"
                  value={cpfPai2}
                  placeholder="Digite o cpf do pai2"
                  onChange={(e) => setCpfPai2(e.target.value)}
                ></input>
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
                  onChange={(e) => setCpfMae2(e.target.value)}
                ></input>
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
                  onChange={(e) => setCpfPai3(e.target.value)}
                ></input>
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
                  onChange={(e) => setCpfMae3(e.target.value)}
                ></input>
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


