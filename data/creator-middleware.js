const User = require('../routes/user-model.js');

module.exports = (req, res, next) => {
  const userId = req.body.user_id;

  User.findById(userId)
    .then(exist => {
      if (exist) {
        if (exist.user_type == 1) {
          next();
        } else {
          res
            .status(400)
            .json({ message: 'You are not authorized to create content' });
        }
      } else {
        res.status(400).json({ message: 'you are not authorized' });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'error with database' });
    });
};
