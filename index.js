const express = require('express'); // Importa o ExpressJS.

const server = express(); // Incorpora a função do Express na variável server.

server.use(express.json()); // Define que o servidor use a estrutura de dados JSON por padrão

const projects = []; // Array de projetos, salvo em memória.

server.post('/projects', (req, res) => {
  const { id, title } = req.body; // Pega variáveis do corpo da requisição.
  const project = {
    id,
    title,
    tasks: [],
  }; // Objeto que guarda informações do projeto.
  projects.push(project); // Adiciona o projeto ao array de projetos.

  return res.json(projects); // Retorna uma resposta JSON com o array de projetos.
}); // Rota que cadastra projetos, recebendo id e title.

server.get('/projects', (req, res) => {
  return res.json(projects);
}); // Rota que lista todos os projetos e suas respectivas tarefas.

server.put('/projects/:id', (req, res) => {
  const { id } = req.params; // Recebe o id nos parâmetros da requisição.
  const { title } = req.body; // Recebe o título do corpo da requisição.

  projects.map(project => {
    if (project.id == id) {
      project.title = title;
    }
  }); // Percorre todos os elementos do array de projetos e modifica o titulo do projeto com mesmo id dos parametros.

  return res.json(projects); // Retorna a lista de projetos.
}); // Rota que altera o título do projeto.

server.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const index = projects.map((project, index) => {
    if (project.id == id) {
      return index;
    }
  });

  if (!index) {
    return res.status(400).json({ error: "Invalid ID" })
  }

  projects.splice(index, 1);

  return res.status(200);
});

server.listen(3000); // Escuta o servidor na porta 3000.
