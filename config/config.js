var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'money2'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/money2-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'money2'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/money2-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'money2'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/money2-production'
  }
};

module.exports = config[env];
