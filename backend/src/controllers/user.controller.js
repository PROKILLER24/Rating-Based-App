// User controller: connect routes to user service

exports.getProfile = async (req, res, next) => {
  try {
    return res.json({ message: 'User profile controller placeholder' });
  } catch (err) {
    next(err);
  }
};


