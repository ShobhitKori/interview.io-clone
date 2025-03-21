const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');


router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: 'Invalid Email or Password' });

    const validatePassword = await bcrypt.compare(
      req.body.password, user.password
    );

    if (!validatePassword)
      return res.status(401).send({ message: 'Invalid Email or Password' });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, messsage: "Logged in Successfully" })
  } catch (error) {
    res.status(500).send({ message: "Internal Servere Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    email: Joi.string().required().label('Password')
  });
  return schema.validate(data);
}

module.exports = router;