import { useNavigate } from "react-router-dom";
import ButtonLoginR from "../Components/Botoes/ButtonLoginR";
import styles from "../Form/Form.module.css";
import { useState } from "react";
import { useAuth } from "./../Hooks/useAuth";

const EsqueceSenha = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { resetPassword } = useAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email || !confirmEmail || !password || !confirmPassword) {
      setError("Preencha todos os campos");
      return;
    }

    if (email !== confirmEmail) {
      setError("Os e-mails não são iguais");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não são iguais");
      return;
    }

    
    const res = await resetPassword(email, password);

    if (res) {
      setError(res);
      return;
    }

    setSuccessMessage("Senha redefinida com sucesso!");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className={styles.form_login}>
      <form onSubmit={handleResetPassword}>
        <h1 className={styles.h1}>Recupere sua senha</h1>

        {error && (
          <div className="br-message error">
            <div className="icon">
              <i className="fas fa-exclamation-circle fa-lg" aria-hidden="true"></i>
            </div>
            <div className="content" role="alert">
              <span className="message-title">Erro</span>
              <span className="message-body">{error}</span>
            </div>
          </div>
        )}

        <div className={styles.input}>
          <div className="col-sm-20 col-lg-30 mb-2">
            <div className="input-label">
              <label className="text-nowrap" htmlFor="email">
                Email Cadastrado:
              </label>
            </div>
            <div className="br-input input-inline">
              <input
                id="email"
                type="email"
                placeholder="Insira seu email cadastrado"
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
                Confirme seu Email:
              </label>
            </div>
            <div className="br-input input-inline">
              <input
                id="confirmEmail"
                type="email"
                placeholder="Confirme seu email cadastrado"
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
                Nova Senha:
              </label>
            </div>
            <div className="br-input input-inline">
              <input
                id="password"
                type="password"
                placeholder="Digite a nova senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.input}>
          <div className="col-sm-20 col-lg-30 mb-2">
            <div className="input-label">
              <label className="text-nowrap" htmlFor="confirmPassword">
                Confirme a Nova Senha:
              </label>
            </div>
            <div className="br-input input-inline">
              <input
                id="confirmPassword"
                type="password"
                placeholder="Digite novamente a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              aria-label="Sucesso. Sua senha foi redefinida conforme preenchimento do formulário."
              role="alert"
            >
              <span className="message-title">Sucesso!</span>
              <span className="message-body">{successMessage}</span>
            </div>
            
          </div>
        )}
      </form>
    </div>
  );
};

export default EsqueceSenha;
