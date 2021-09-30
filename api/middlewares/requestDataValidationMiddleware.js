module.exports = (schema, targetParams) => {
  return (req, res, next) => {
    const result = schema.validate(req[targetParams]);
    if (result.error) {
      return res.status(400).send({
        message: "input validation fail",
        description: result.error.message,
      });
    }
    return next();
  };
};
