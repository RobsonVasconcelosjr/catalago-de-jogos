const express = require("express");
const jogosRoutes = require("./routes/jogos");

const app = express();

// Receber corpo JSON
app.use(express.json());

// Middleware de log: método e URL
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rotas da API
app.use("/jogos", jogosRoutes);

// Rotas inexistentes (deve ficar depois de todas as rotas)
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada" });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});