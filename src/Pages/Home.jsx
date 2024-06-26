import React from "react";
import styles from "./Home.module.css";


const Home = () => {

  return (
    <div>
      <div className={styles.services}>
        <h1 className={styles.color}>
          Seja bem vindo ao Sistema de Regimes Próprios de Previdência
        </h1>
      </div>

      <div className={styles.container}>
        <h1 className={styles.color}>Serviços</h1>
        <div>
          <a href="http://192.168.37.8:8090/login">
            <h3>Gestão de Contribuintes</h3>
          </a>
          <span className="br-divider my-3"></span>
        </div>
        <div>
          <a href="http://192.168.37.8:3000/">
          <h3>Gestão de Contribuição</h3>
          </a>
          <span className="br-divider my-3"></span>
        </div>
        <div>
          <a href="http://192.168.37.8:5300/">
          <h3>Gestão de Benefícios</h3>
          <span className="br-divider my-3"></span>
          </a>
        </div>
        <div>
          <a href="http://192.168.37.8:8080/">
          <h3>Gestão de Empréstimos</h3>
          <span className="br-divider my-3"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
