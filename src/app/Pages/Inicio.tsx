import "./styles.css";

export const Inicio = () => {
  return (
    <div style={{ display: "grid", width: '79vw', height: '90vh'}}>
      <h2 style={{ textAlign: "center" }}>Bienvenido!!</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr ", width: '79vw' }}>
        <div className="loader" style={{ margin: "0 auto" }}>
          <span className="loader:before"></span>
        </div>
      </div>
      <div style={{ fontSize: "0.7rem", color:"gray", textAlign: "center"}}>
        <div>Ingeniería del Software 3 - Licenciatura en Sistemas</div>
        <div>Luis Orescovich - Cayetano Simon Paradiso</div>
        <div>Ricardo Rocha - Gonzalo Rolon</div>
        <div>Profesores: Horacio Pendetti - Cintia Aguado</div>
        <div>@ UNTDF - 2024</div>
      </div>
    </div>
  );
};