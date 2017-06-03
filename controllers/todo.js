const models = require('../models');
const requireAuth = require('../services/passport').requireAuth;

const addTodo = (req, res) => {
  req.user.todos.push(req.body);
  req.user.save((err, user) => {
    if (err) return res.send(err);
    res.send(user);
  });
};

const removeTodo = (req, res) => {
  req.user.todos = req.user.todos.filter(todo => todo._id.toString() !== req.params.todoId);
  req.user.save((err, user) => {
    if (err) return res.send(err);
    res.send(user);
  });
};

const toggleTodo = (req, res) => {
  req.user.todos.forEach((todo) => {
    if (todo._id.toString() === req.params.todoId) todo.completed = !todo.completed;
  });
  req.user.save((err, user) => {
    if (err) return res.send(err);
    res.send(user);
  });
};

module.exports = (app) => {
  app.post('/todos', requireAuth, addTodo);
  app.put('/todos/:todoId', requireAuth, toggleTodo);
  app.delete('/todos/:todoId', requireAuth, removeTodo);
};
