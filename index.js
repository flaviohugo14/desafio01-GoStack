const express = require('express'); // Importa o ExpressJS.

const server = express(); // Incorpora a função do Express na variável server.

server.use(express.json()); // Define que o servidor use a estrutura de dados JSON por padrão

const projects = []; // Array de projetos, salvo em memória.

function projectExisted(req, res, next){
  const { id } = req.params;

  const project = projects.find(project => project.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Invalid ID'});
  }
  else {
    next();
  }
}

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

server.put('/projects/:id', projectExisted,(req, res) => {
  const { id } = req.params; // Recebe o id nos parâmetros da requisição.
  const { title } = req.body; // Recebe o título do corpo da requisição.

  projects.map(project => {
    if (project.id == id) {
      project.title = title;
    }
  }); // Percorre todos os elementos do array de projetos e modifica o titulo do projeto com mesmo id dos parametros.

  return res.json(projects); // Retorna a lista de projetos.
}); // Rota que altera o título do projeto.

server.delete('/projects/:id', projectExisted, (req, res) => {
  const { id } = req.params; // Recebe o id nos parâmetros da requisição.

  const pIndex = projects.findIndex(project => project.id == id); // Retorna o index que está atrelado ao projeto com id passado nos params.

  projects.splice(pIndex, 1); // remove 1 elemento à partir do index informado.

  return res.send();
}); // Rota que deleta projetos

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params; // Recebe o id nos parâmetros da requisição.
  const { title } = req.body; // Recebe o campo title do corpo da requisição.

  const pIndex = projects.findIndex(project => project.id == id); // Retorna o index que está atrelado ao projeto com id passado nos params.

  projects[pIndex].tasks.push(title); // Adiciona tarefa no array de tarefas, dentro do projeto com id passado pelos params.

  return res.json(projects);
}); // Rota que adiociona tarefas à projetos.

server.listen(3000); // Escuta o servidor na porta 3000.
