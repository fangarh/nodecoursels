const Joi = require("@hapi/joi");

module.exports.loginValidation = (req, resp, session, next) => {
  const schema = Joi.object({
    password: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
  });

  const { email, password } = req.body;
  try {
    const { value, error } = schema.validate({
      email: email,
      password: password,
    });

    if (error) {
      session.myStore.msglogin = error.toString();
      req.body.msglogin = error.toString();
      console.log(error.toString());
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
};
module.exports.userInfoValidation = (req, resp, session, next) => {
  const { age, concerts, cities, years } = req.body;

  const schema = Joi.object({
    age: Joi.number().min(0).max(200).required(),
    concerts: Joi.number().min(0).required(),
    cities: Joi.number().min(0).required(),
    years: Joi.number().min(0).required(),
  });

  session.myStore.msgskill = "";

  try {
    const { value, error } = schema.validate({
      age,
      concerts,
      cities,
      years,
    });

    if (error) {
      session.myStore.msgskill = error.toString();
      req.body.msgskill = error.toString();
      console.log(error.toString());
      return false;
    }
    session.myStore.msgskill = "Сохранено";
  } catch (err) {
    return false;
  }
  return true;
};
module.exports.sendMailValidation = (req, resp, session, next) => {
  const { name, email, message } = req.body;

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required(),
  });

  session.myStore.msgemail = "";
  try {
    const { value, error } = schema.validate({
      name,
      email,
      message,
    });

    if (error) {
      session.myStore.msgemail = error.toString();
      req.body.msgemail = error.toString();
      console.log(error.toString());
      return false;
    }
  } catch (err) {
    return false;
  }
  console.log("!!!all right sending");
  return true;
};

module.exports.addGoodsValidation = (req, resp, session, next) => {
  console.log("addGoodsValidation");
  let { name, price } = req.body;
  console.log(req.body);
  const schemaFile = Joi.object({
    name: Joi.string().min(1).max(300).required(),
    size: Joi.number().integer().min(1).required(),
  });

  const schemaDescr = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().min(1).required(),
  });

  session.myStore.msgfile = "";

  try {
    let { error } = schemaDescr.validate({
      name,
      price,
    });
    console.log(req.files);
    let { size } = req.files.photo;
    console.log(req.files.photo.name);
    name = req.files.photo.name;
    const { errorFile } = schemaFile.validate({
      name,
      size,
    });

    if (errorFile) {
      session.myStore.msgfile = errorFile.toString();
      req.body.msgfile = errorFile.toString();
      console.log(errorFile.toString());
      return false;
    }

    if (error) {
      session.myStore.msgfile = error.toString();
      req.body.msgfile = error.toString();
      console.log(error.toString());
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
};
