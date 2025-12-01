// Rating controller: connect routes to rating service

exports.createRating = async (req, res, next) => {
  try {
    return res.json({ message: 'Create rating controller placeholder' });
  } catch (err) {
    next(err);
  }
};

exports.listRatings = async (req, res, next) => {
  try {
    return res.json({ message: 'List ratings controller placeholder' });
  } catch (err) {
    next(err);
  }
};


