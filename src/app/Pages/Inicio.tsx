import "./styles.css";

export const Inicio = () => {
  return (
    <div>
      <div className="loader-container">
        <h2>Bienvenido!!</h2>
        <div className="loader">
          <span className="loader:before"></span>
        </div>
        <div className="derechos">
          <p>Ingeniería del Software 3 - Licenciatura en Sistemas</p>
          {/* <p>Luis Orescovich - Cayetano Simon Paradiso</p> */}
          {/* <p>Ricardo Rocha - Gonzalo Rolon</p> */}
          {/* <p>Profesores: Horacio Pendeti - Cintia Aguado</p> */}
          <p>@ UNTDF - 2024</p>
        </div>
      </div>
    </div>
  );
};
