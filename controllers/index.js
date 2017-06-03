module.exports = (app) => {
  require('./auth')(app);
  require('./user')(app);
  require('./todo')(app);
};
