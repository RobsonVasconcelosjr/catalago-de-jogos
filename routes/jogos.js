const express = require("express");
const router = express.Router();

let jogos = [
  { id: 1, titulo: "The Legend of Zelda: Breath of the Wild", plataforma: "Nintendo Switch", genero: "Aventura", anoLancamento: 2017 },
  { id: 2, titulo: "God of War", plataforma: "PlayStation 4", genero: "Ação", anoLancamento: 2018 }
];
let proximoId = 3;

function camposValidos(body) {
  const { titulo, plataforma, genero, anoLancamento } = body;
  return titulo && plataforma && genero && anoLancamento;
}

// GET /jogos - listar todos
router.get("/", (req, res) => {
  res.status(200).json(jogos);
});

// GET /jogos/:id - consultar por ID
router.get("/:id", (req, res) => {
  const jogo = jogos.find(j => j.id === Number(req.params.id));
  if (!jogo) {
    return res.status(404).json({ erro: "Jogo não encontrado" });
  }
  res.status(200).json(jogo);
});

// POST /jogos - cadastrar
router.post("/", (req, res) => {
  if (!camposValidos(req.body)) {
    return res.status(400).json({

      erro: "Informe titulo, plataforma, genero e anoLancamento"
    });
  }

  const { titulo, plataforma, genero, anoLancamento } = req.body;
  const novoJogo = { id: proximoId++, titulo, plataforma, genero, anoLancamento };
  jogos.push(novoJogo);

  res.status(201).json(novoJogo);
});

// PUT /jogos/:id - atualizar todos os dados
router.put("/:id", (req, res) => {
  const indice = jogos.findIndex(j => j.id === Number(req.params.id));
  if (indice === -1) {
    return res.status(404).json({ erro: "Jogo não encontrado" });
  }

  if (!camposValidos(req.body)) {
    return res.status(400).json({
      erro: "Informe titulo, plataforma, genero e anoLancamento"
    });
  }

  const { titulo, plataforma, genero, anoLancamento } = req.body;
  jogos[indice] = { id: jogos[indice].id, titulo, plataforma, genero, anoLancamento };

  res.status(200).json(jogos[indice]);
});

// DELETE /jogos/:id - remover
router.delete("/:id", (req, res) => {

  const indice = jogos.findIndex(j => j.id === Number(req.params.id));
  if (indice === -1) {
    return res.status(404).json({ erro: "Jogo não encontrado" });
  }

  jogos.splice(indice, 1);
  res.status(204).send();
});

module.exports = router;