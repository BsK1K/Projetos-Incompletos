import { useState } from "react";

function App() {
  const [relatorios, setRelatorios] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [dia, setDia] = useState(1); // começa em 1
  

  function adicionarRelatorio() {
    if (!titulo) {
      alert("Você precisa inserir um título!");
      return;
    }

    const novaData = new Date().toLocaleDateString(); // pega a data de hoje

    const novoRelatorio = {
      id: Date.now(),
      titulo,
      texto,
      dia,
      data: novaData
    };

    setRelatorios([...relatorios, novoRelatorio]);
    setTitulo("");
    setTexto("");
    setDia(1);
  }

  function editarRelatorio(id, campo, valor) {
    setRelatorios(
      relatorios.map(r =>
        r.id === id ? { ...r, [campo]: valor } : r
      )
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gerenciador de Relatórios</h1>

      {/* Formulário */}
      <div>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Escreva seu relatório"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button onClick={adicionarRelatorio}>OK</button>
      </div>

      <hr />

      {/* Lista de relatórios */}
      {relatorios.map(r => (
        <div key={r.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          {/* Editar título */}
          <input
            type="text"
            value={r.titulo}
            onChange={(e) => editarRelatorio(r.id, "titulo", e.target.value)}
            style={{ fontWeight: "bold", fontSize: "16px" }}
          />

          {/* Data automática */}
          <div><strong>Data:</strong> {r.data}</div>

          {/* Editar dia */}
          <div>
            <strong>Dia:</strong>{" "}
            <input
              type="number"
              value={r.dia}
              onChange={(e) => editarRelatorio(r.id, "dia", e.target.value)}
              style={{ width: "50px" }}
            />
          </div>

          {/* Editar texto */}
          <textarea
            value={r.texto}
            onChange={(e) => editarRelatorio(r.id, "texto", e.target.value)}
            style={{ width: "100%", minHeight: "80px" }}
          />
        </div>
      ))}
    </div>
  );
}

export default App;
