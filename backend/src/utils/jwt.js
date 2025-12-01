// JWT helper utilities placeholder

const { JWT_SECRET } = require('../config/env');

exports.signToken = (payload) => {
  console.log('Signing JWT with secret', JWT_SECRET ? '(set)' : '(missing)');
  // TODO: return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  return 'jwt-token-placeholder';
};

exports.verifyToken = (token) => {
  console.log('Verifying JWT token placeholder');
  // TODO: return jwt.verify(token, JWT_SECRET);
  return { token };
};


