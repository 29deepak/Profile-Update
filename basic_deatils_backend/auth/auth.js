const JWT = require('jsonwebtoken')
const UserModel = require('../models/register')

const auth = async (req, res, next) => {
    const token = req.header("Authorization").split(" ")[1]
    console.log(token)
    const User = JWT.verify(token, "secretkey")
    req.user = User
    next()

    // UserModel.findByPk(User.userId).then((user) => {
    //     req.user = user
    //     next()
    // })
}
module.exports = auth;
