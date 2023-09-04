const Joi = require('joi');

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

module.exports = {
  validateData: (req, res, next) => {
    const { error } = contactsSchema.validate(req.body);
    if (typeof error !== "undefined") {
      const missingField = error.details[0].path[0];
      return res.status(400).send({ message: `Missing required '${missingField}' field` });
    }
    next();
  },
};
