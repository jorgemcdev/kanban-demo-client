/* eslint global-require: 0 */
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./api.prod');
} else {
  module.exports = require('./api.dev');
}

