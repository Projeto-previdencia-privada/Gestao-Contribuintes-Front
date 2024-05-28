import { useNavigate } from "react-router-dom";
import ButtonLoginR from "../Components/Botoes/ButtonLoginR";
import styles from "../Form/Form.module.css";
import { useState } from "react";
import useAuth from "./../Hooks/useAuth";

const CadastroLogin = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  const handleSignup = () => {
    if (!email | !confirmEmail | !password) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== confirmEmail) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(email, password);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/login");
  };
  return (
    <div className={styles.form_login}>
      <form onSubmit={handleSignup}>
        <h1 className={styles.h1}>Cadastro de Login</h1>

        <div className={styles.input}>
          <div className="col-sm-20 col-lg-30 mb-2">
            <div className="input-label">
              <label className="text-nowrap" htmlFor="email">
                Email Válido:
              </label>
            </div>
            <div className="br-input input-inline">
              <input
                id="email"
                type="email"
                placeholder="Insira um email válido"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.input}>
          <div className="col-sm-20 col-lg-30 mb-2">
            <div className="input-label">
              <label className="text-nowrap" htmlFor="confirmEmail">
                Confirme o Email:
              </label>
            </div>
            <div className="br-input input-inline">
              <input
                id="confirmEmail"
                type="email"
                placeholder="Confirme o seu email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.input}>
          <div className="col-sm-20 col-lg-30 mb-2">
            <div className="input-label">
              <label className="text-nowrap" htmlFor="password">
                Senha:
              </label>
            </div>
            <div className="br-input input-button">
              <input
                id="password"
                type="password"
                placeholder="Crie sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <ButtonLoginR />
        </div>

        {successMessage && (
          <div className="br-message success">
            <div className="icon">
              <i className="fas fa-check-circle fa-lg" aria-hidden="true"></i>
            </div>
            <div
              className="content"
              aria-label="Sucesso. Seus dados foram alterados conforme preenchimento do formulário."
              role="alert"
            >
              <span className="message-title">Sucesso!</span>
              <span className="message-body"> Seu cadastro foi realizado.</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CadastroLogin;
