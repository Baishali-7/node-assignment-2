module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Error occured!" });
  };

const validateTaskInput = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      const { name, status } = req.body;
      next();
    };
}    

module.exports = validateTaskInput;