import ButtonLogin from "../Components/Botoes/ButtonLogin";
import styles from "../Form/Form.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  
  const { signin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("Preencha todos os campos");
      return;
    }

    const res = signin(email, password);

    if (res) {
      setErrorMessage(res);
      return;
    }

    navigate("/cadastroContribuintes");
  };

  return (
    <div className={styles.form_login}>
      <form onSubmit={handleLogin}>
        <h1 className={styles.h1}>Acesse o Sistema</h1>
        <div className={styles.input}>
          <div className="br-input">
            <div className="input-group">
              <label htmlFor="input-email" className="sr-only">
                Email
              </label>
              <input
                id="input-email"
                type="email"
                placeholder="Insira seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={styles.input}>
          <div className="br-input input-button">
            <label htmlFor="input-password" className="sr-only">
              Senha
            </label>
            <input
              id="input-password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="br-button"
              type="button"
              aria-label="Exibir senha"
              role="switch"
              aria-checked={showPassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`fas fa-eye${showPassword ? "" : "-slash"}`}
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="br-message danger">
            <div className="icon">
              <i className="fas fa-times-circle fa-lg" aria-hidden="true"></i>
            </div>
            <div className="content" aria-label={errorMessage} role="alert">
              <span className="message-title">Erro.</span>
              <span className="message-body">{errorMessage}</span>
            </div>
            <div className="close">
              <button
                className="br-button circle small"
                type="button"
                aria-label="Fechar a mensagem de alerta"
                onClick={() => setErrorMessage("")}
              >
                <i className="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        )}

        <div className={styles.recall_forget}>
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueceu a senha?</a>
        </div>

        <div>
          <ButtonLogin />
        </div>

        <div className="signup-link">
          <p>
            Não tem uma conta? <a href="/cadastroLogin">Registrar</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
