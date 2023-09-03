const Joi = require('joi');

const contactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
});

module.exports = {
  validateData: (req, res, next) => {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    next();
  },
};