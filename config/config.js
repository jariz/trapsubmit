var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'trapsubmit'
    },
    port: 3333,
    db: 'mongodb://localhost/trapsubmit-development'
  },

  production: {
    root: rootPath,
    app: {
      name: 'trapsubmit'
    },
    port: 3333,
    db: 'mongodb://localhost/trapsubmit-production'
  }
};

module.exports = config[env];
