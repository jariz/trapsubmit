var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'trapsubmit2017'
    },
    port: 3333,
    db: 'mongodb://localhost/trapsubmit2017-development'
  },

  production: {
    root: rootPath,
    app: {
      name: 'trapsubmit2017'
    },
    port: 3333,
    db: 'mongodb://localhost/trapsubmit2017-production'
  }
};

module.exports = config[env];
