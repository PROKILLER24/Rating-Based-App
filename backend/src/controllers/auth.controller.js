// Auth controller: connect routes to auth service

exports.login = async (req, res, next) => {
  try {
    return res.json({ message: 'Auth login controller placeholder' });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    return res.json({ message: 'Auth register controller placeholder' });
  } catch (err) {
    next(err);
  }
};


