const express = require('express'); // Importa o ExpressJS.

const server = express(); // Incorpora a função do Express na variável server.

server.use(express.json()); // Define que o servidor use a estrutura de dados JSON por padrão

const projects = []; // Array de projetos, salvo em memória.

server.post('/projects', (req, res) => {
  const { id, title } = req.params; // Pega variáveis do corpo da requisição.
  const project = {
    id,
    title,
    tasks: [],
  }; // Objeto que guarda informações do projeto.
  projects.push(project); // Adiciona o projeto ao array de projetos.

  return res.json(projects);
}); // Rota que cadastra projetos, recebendo id e title.

server.listen(3000); // Escuta o servidor na porta 3000.
