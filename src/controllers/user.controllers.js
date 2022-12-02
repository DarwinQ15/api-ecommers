const { UserServices } = require('../services')
const transporter  = require("../utils/mailer");

const userRegister = async (req, res, next) => {
  try {
    const newUser = req.body;
    console.log(newUser);
    const result = await UserServices.create(newUser);

    res.status(201).json(result);

    await transporter.sendMail({
      from: "<qdarwin463@gmail.com>",
      to: result.email,
      subject: "thank you for joining this beautiful family",
      text: `Hi ${result.username} enjoy your shopping`,
      html: `<p>Hi<h1>${result.username} </h1>enjoy your shopping</p>`
    });
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "Missing data",
    });
  }
};

const getAllUsers = async (req, res, next) =>{
  try {
    const users = await UserServices.getAll();
    res.json({users})
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
      message: "somenthig is wrong",
    });
    
  }

}
module.exports = {
  userRegister,
  getAllUsers
};
