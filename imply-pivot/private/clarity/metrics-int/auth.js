exports.auth = function(options) {
  var dataSourceManager = options.dataSourceManager;

  return function(req, res, next) {
    req.user = { id: 'vadim', name: 'Vadim Ogievetsky' };
    req.dataSourceManager = dataSourceManager;
    next();
  }
};
