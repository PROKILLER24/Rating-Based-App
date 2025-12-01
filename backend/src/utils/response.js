// Common API response helpers

exports.ok = (res, data, message = 'Success') => {
  return res.json({ message, data });
};

exports.error = (res, status = 500, message = 'Error') => {
  return res.status(status).json({ error: message });
};


